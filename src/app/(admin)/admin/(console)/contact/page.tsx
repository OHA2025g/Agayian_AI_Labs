import { GlobalModule } from "@/components/admin/GlobalModule";
import { contactTabs } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminContactPage() {
  const user = await requireAdminUser();
  return (
    <GlobalModule
      user={user}
      slug="contact-page"
      title="Contact page"
      tabs={contactTabs}
      previewPath="/contact"
    />
  );
}
