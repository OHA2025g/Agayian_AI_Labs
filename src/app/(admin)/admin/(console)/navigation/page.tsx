import { GlobalModule } from "@/components/admin/GlobalModule";
import { navigationTabs } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminNavigationPage() {
  const user = await requireAdminUser();
  return (
    <GlobalModule
      user={user}
      slug="navigation"
      title="Header & Footer"
      description="Contact stays the red consultation button. Do not add a Resources page."
      tabs={navigationTabs}
      previewPath="/"
    />
  );
}
