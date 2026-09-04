import { CollectionIndex } from "@/components/admin/CollectionModule";
import { GlobalModule } from "@/components/admin/GlobalModule";
import { settingsTabs } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminSeoPage() {
  const user = await requireAdminUser();
  const seoOnly = settingsTabs.filter((tab) => tab.id === "seo");
  return (
    <div className="space-y-8">
      <GlobalModule
        user={user}
        slug="site-settings"
        title="SEO defaults"
        tabs={seoOnly}
        previewPath="/"
      />
      <CollectionIndex
        collection="redirects"
        title="Redirects"
        createHref="/admin/seo/redirects/new"
        columns={[
          { key: "name", label: "From" },
          { key: "slug", label: "To" },
          { key: "status", label: "Type" },
        ]}
      />
    </div>
  );
}
