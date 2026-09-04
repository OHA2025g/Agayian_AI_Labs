import { AdminShell } from "@/components/admin/AdminShell";
import { adminCanOpenCms } from "@/lib/admin/rbac";
import { requireAdminUser } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminUser();
  return (
    <AdminShell user={user} cmsHref={adminCanOpenCms(user) ? "/cms" : null}>
      <div id="admin-main">{children}</div>
    </AdminShell>
  );
}
