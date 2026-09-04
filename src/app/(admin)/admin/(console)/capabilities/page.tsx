import { GlobalModule } from "@/components/admin/GlobalModule";
import { capabilitiesPageTabs } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminCapabilitiesPage() {
  const user = await requireAdminUser();
  return (
    <GlobalModule
      user={user}
      slug="capabilities-page"
      title="Capabilities"
      description="Change the heading and buttons. The page layout stays the same."
      tabs={capabilitiesPageTabs}
      previewPath="/capabilities"
    />
  );
}
