import { DataTable } from "@/components/admin/DataTable";
import { RecordActions } from "@/components/admin/RecordActions";
import { adminCanManageInbox, adminCanPublish } from "@/lib/admin/rbac";
import { loadCollectionList } from "@/lib/admin/queries";
import { requireAdminUser } from "@/lib/admin/session";
import { NewsletterActions } from "./NewsletterActions";

export default async function AdminNewsletterPage() {
  const user = await requireAdminUser();
  if (!adminCanManageInbox(user)) return <p>You cannot view newsletter subscribers.</p>;
  const { docs } = await loadCollectionList("newsletter-subscribers", {
    sort: "-createdAt",
  });
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Newsletter</h1>
        <a href="/api/admin/newsletter/export" className="admin-btn">
          Export CSV
        </a>
      </div>
      <div className="admin-card">
        <DataTable
          columns={[
            { key: "name", label: "Email" },
            { key: "status", label: "Status" },
            { key: "updatedAt", label: "Joined" },
            { key: "actions", label: "Actions" },
          ]}
          rows={docs.map((doc) => ({
            id: String(doc.id),
            name: String(doc.email ?? ""),
            status: String(doc.status ?? ""),
            updatedAt: doc.createdAt
              ? new Date(String(doc.createdAt)).toLocaleString()
              : "",
            actions: (
              <RecordActions
                collection="newsletter-subscribers"
                id={String(doc.id)}
                name={String(doc.email ?? "subscriber")}
                canDelete={adminCanPublish(user)}
              />
            ),
          }))}
          empty="No subscribers."
        />
      </div>
      <NewsletterActions
        subscribers={docs.map((doc) => ({
          id: String(doc.id),
          email: String(doc.email ?? ""),
          status: String(doc.status ?? "active"),
        }))}
      />
    </div>
  );
}
