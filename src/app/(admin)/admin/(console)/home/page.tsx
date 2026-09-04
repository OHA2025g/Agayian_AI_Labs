import { GlobalModule } from "@/components/admin/GlobalModule";
import { homeTabs } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminHomePage() {
  const user = await requireAdminUser();
  return (
    <GlobalModule
      user={user}
      slug="home-page"
      title="Home"
      tabs={homeTabs}
      previewPath="/"
    />
  );
}
