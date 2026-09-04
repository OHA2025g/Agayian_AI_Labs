import { DataTable } from "@/components/admin/DataTable";
import { getRecentAudit } from "@/lib/admin/dashboard";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminActivityPage() {
  await requireAdminUser();
  const rows = await getRecentAudit(50);
  return (
    <div>
      <h1 className="mb-5 text-2xl font-semibold">Activity log</h1>
      <div className="admin-card">
        <DataTable
          columns={[
            { key: "summary", label: "Summary" },
            { key: "collection", label: "Collection" },
            { key: "createdAt", label: "When" },
          ]}
          rows={rows.map((item) => ({
            id: item.id,
            summary: item.summary,
            collection: item.collection,
            createdAt: item.createdAt
              ? new Date(item.createdAt).toLocaleString()
              : "",
          }))}
          empty="No activity yet."
        />
      </div>
    </div>
  );
}
