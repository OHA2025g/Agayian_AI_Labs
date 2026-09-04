import { GlobalModule } from "@/components/admin/GlobalModule";
import { coeTabs } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminCoePage() {
  const user = await requireAdminUser();
  return (
    <GlobalModule
      user={user}
      slug="coe-page"
      title="AI Centre of Excellence"
      tabs={coeTabs}
      previewPath="/ai-centre-of-excellence"
    />
  );
}
