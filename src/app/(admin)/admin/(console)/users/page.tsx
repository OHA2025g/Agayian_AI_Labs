import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import { RecordActions } from "@/components/admin/RecordActions";
import { adminCanManageUsers } from "@/lib/admin/rbac";
import { loadCollectionList } from "@/lib/admin/queries";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminUsersPage() {
  const user = await requireAdminUser();
  if (!adminCanManageUsers(user)) {
    return (
      <div className="admin-card">
        <h1 className="text-xl font-semibold">Users & Roles</h1>
        <p className="mt-2 text-sm text-[var(--admin-muted)]">
          Only Administrators can manage users.
        </p>
      </div>
    );
  }

  const { docs } = await loadCollectionList("users");
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users & Roles</h1>
        <Link href="/admin/users/new" className="admin-btn admin-btn-primary">
          New user
        </Link>
      </div>
      <div className="admin-card">
        <DataTable
          columns={[
            { key: "name", label: "Email" },
            { key: "category", label: "Role" },
            { key: "disabled", label: "Disabled" },
            { key: "actions", label: "Actions" },
          ]}
          rows={docs.map((doc) => ({
            id: String(doc.id),
            href: `/admin/users/${doc.id}`,
            name: String(doc.email ?? ""),
            category: String(doc.role ?? ""),
            disabled: doc.disabled ? "Yes" : "No",
            actions: (
              <RecordActions
                href={`/admin/users/${doc.id}`}
                collection="users"
                id={String(doc.id)}
                name={String(doc.email ?? "")}
                canDelete={String(doc.id) !== user.id}
              />
            ),
          }))}
          empty="No users."
        />
      </div>
    </div>
  );
}
