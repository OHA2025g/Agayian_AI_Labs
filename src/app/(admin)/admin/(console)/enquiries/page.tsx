import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import { RecordActions } from "@/components/admin/RecordActions";
import { adminCanManageInbox } from "@/lib/admin/rbac";
import { loadCollectionList } from "@/lib/admin/queries";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const user = await requireAdminUser();
  if (!adminCanManageInbox(user)) {
    return <p>You cannot view the inbox.</p>;
  }
  const params = await searchParams;
  const status = params.status || "new";
  const { docs } = await loadCollectionList("enquiries", {
    sort: "-createdAt",
    where:
      status === "archived"
        ? { archived: { equals: true } }
        : status === "all"
          ? { archived: { not_equals: true } }
          : {
              and: [
                { archived: { not_equals: true } },
                { status: { equals: status } },
              ],
            },
  });

  const filters = [
    "new",
    "in_progress",
    "replied",
    "waiting",
    "closed",
    "spam",
    "archived",
    "all",
  ];

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Contact submissions</h1>
        <a href="/api/admin/enquiries/export" className="admin-btn">
          Export CSV
        </a>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((item) => (
          <Link
            key={item}
            href={`/admin/enquiries?status=${item}`}
            className="admin-btn"
            aria-current={item === status ? "page" : undefined}
          >
            {item.replace("_", " ")}
          </Link>
        ))}
      </div>
      <div className="admin-card">
        <DataTable
          columns={[
            { key: "name", label: "Name" },
            { key: "category", label: "Email" },
            { key: "status", label: "Status" },
            { key: "updatedAt", label: "Received" },
            { key: "actions", label: "Actions" },
          ]}
          rows={docs.map((doc) => ({
            id: String(doc.id),
            href: `/admin/enquiries/${doc.id}`,
            name: String(doc.fullName ?? ""),
            category: String(doc.workEmail ?? ""),
            status: String(doc.status ?? ""),
            updatedAt: doc.createdAt
              ? new Date(String(doc.createdAt)).toLocaleString()
              : "",
            actions: (
              <RecordActions
                href={`/admin/enquiries/${doc.id}`}
                collection="enquiries"
                id={String(doc.id)}
                name={String(doc.fullName ?? "enquiry")}
                canDelete
                viewLabel="Open"
              />
            ),
          }))}
          empty="No submissions in this view."
        />
      </div>
    </div>
  );
}
