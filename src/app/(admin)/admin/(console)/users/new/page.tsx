import { adminCanManageUsers } from "@/lib/admin/rbac";
import { requireAdminUser } from "@/lib/admin/session";
import { UserForm } from "../UserForm";

export default async function NewUserPage() {
  const user = await requireAdminUser();
  if (!adminCanManageUsers(user)) {
    return <p>Only Administrators can create users.</p>;
  }
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">New user</h1>
      <UserForm actorRole={user.role} />
    </div>
  );
}
