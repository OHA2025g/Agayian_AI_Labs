import { DataTable } from "@/components/admin/DataTable";
import { RecordActions } from "@/components/admin/RecordActions";
import { adminCanManageMedia } from "@/lib/admin/rbac";
import { loadCollectionList } from "@/lib/admin/queries";
import { requireAdminUser } from "@/lib/admin/session";
import { MediaUpload } from "./MediaUpload";

export default async function AdminMediaPage() {
  const user = await requireAdminUser();
  const { docs } = await loadCollectionList("media", { sort: "-updatedAt" });
  return (
    <div>
      <h1 className="mb-5 text-2xl font-semibold">Media</h1>
      <MediaUpload />
      <div className="admin-card mt-5">
        <DataTable
          columns={[
            { key: "name", label: "File" },
            { key: "category", label: "Alt" },
            { key: "status", label: "Type" },
            { key: "actions", label: "Actions" },
          ]}
          rows={docs.map((doc) => ({
            id: String(doc.id),
            href: `/admin/media/${doc.id}`,
            name: String(doc.filename ?? doc.id),
            category: String(doc.alt ?? ""),
            status: String(doc.mimeType ?? ""),
            actions: (
              <RecordActions
                href={`/admin/media/${doc.id}`}
                collection="media"
                id={String(doc.id)}
                name={String(doc.filename ?? "file")}
                canDelete={adminCanManageMedia(user)}
              />
            ),
          }))}
          empty="No media uploaded."
        />
      </div>
    </div>
  );
}
