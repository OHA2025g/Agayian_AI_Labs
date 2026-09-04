import Link from "next/link";
import { CollectionIndex } from "@/components/admin/CollectionModule";
import { GlobalModule } from "@/components/admin/GlobalModule";
import { companyTabs } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminCompanyPage() {
  const user = await requireAdminUser();
  return (
    <div className="space-y-8">
      <GlobalModule
        user={user}
        slug="company-page"
        title="Company"
        tabs={companyTabs}
        previewPath="/company"
      />
      <div className="flex gap-2">
        <Link href="/company/leadership" className="admin-btn">
          View leadership
        </Link>
        <Link href="/company/careers" className="admin-btn">
          View careers
        </Link>
      </div>
      <CollectionIndex
        collection="team-members"
        title="Leadership"
        description="Publish only verified people. Do not invent biographies."
        createHref="/admin/company/team/new"
        columns={[
          { key: "name", label: "Name" },
          { key: "slug", label: "Slug" },
          { key: "status", label: "Status" },
        ]}
      />
      <CollectionIndex
        collection="careers"
        title="Careers"
        description="Only list roles approved for public posting."
        createHref="/admin/company/careers/new"
        columns={[
          { key: "name", label: "Title" },
          { key: "slug", label: "Slug" },
          { key: "status", label: "Status" },
        ]}
      />
    </div>
  );
}
