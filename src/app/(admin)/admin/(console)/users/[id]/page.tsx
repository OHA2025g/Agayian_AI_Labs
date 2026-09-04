import { adminCanManageUsers } from "@/lib/admin/rbac";
import { loadCollectionDoc } from "@/lib/admin/queries";
import { requireAdminUser } from "@/lib/admin/session";
import { UserForm } from "../UserForm";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAdminUser();
  if (!adminCanManageUsers(user)) {
    return <p>Only Administrators can manage users.</p>;
  }
  const { id } = await params;
  const doc = await loadCollectionDoc("users", id);
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Edit user</h1>
      <UserForm
        id={id}
        initial={{
          email: String(doc.email ?? ""),
          name: String(doc.name ?? ""),
          role: String(doc.role ?? "editor"),
          disabled: Boolean(doc.disabled),
        }}
      />
    </div>
  );
}
