import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminUser } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminUser();
  return (
    <AdminShell user={user}>
      <div id="admin-main">{children}</div>
    </AdminShell>
  );
}
