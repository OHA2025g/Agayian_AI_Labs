import { GlobalModule } from "@/components/admin/GlobalModule";
import { settingsTabs } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminSettingsPage() {
  const user = await requireAdminUser();
  return (
    <GlobalModule
      user={user}
      slug="site-settings"
      title="Settings"
      description="Site name, public URL, contact routing, announcement, cookies and measurement IDs. Secrets stay in environment variables."
      tabs={settingsTabs}
      previewPath="/"
    />
  );
}
