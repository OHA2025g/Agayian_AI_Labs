import { GlobalModule } from "@/components/admin/GlobalModule";
import { governanceTabs } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminGovernancePage() {
  const user = await requireAdminUser();
  return (
    <GlobalModule
      user={user}
      slug="governance-page"
      title="AI Governance"
      tabs={governanceTabs}
      previewPath="/ai-governance"
    />
  );
}
