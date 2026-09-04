import { GlobalModule } from "@/components/admin/GlobalModule";
import { ImportSiteContent } from "@/components/admin/ImportSiteContent";
import { settingsTabs } from "@/lib/admin/fields";
import { adminCanPublish } from "@/lib/admin/rbac";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminSettingsPage() {
  const user = await requireAdminUser();
  return (
    <div className="space-y-6">
      {adminCanPublish(user) ? (
        <section className="admin-card">
          <p className="admin-kicker">Catalog</p>
          <h2 className="admin-card-title">Original site content</h2>
          <p className="admin-lede">
            Import products, capabilities, industries, insights and page copy
            into this Mongo database. Existing slugs are updated, users are not
            deleted.
          </p>
          <div className="mt-4">
            <ImportSiteContent />
          </div>
        </section>
      ) : null}
      <GlobalModule
        user={user}
        slug="site-settings"
        title="Settings"
        description="Site name, public URL, contact routing, announcement, cookies and measurement IDs. Secrets stay in environment variables."
        tabs={settingsTabs}
        previewPath="/"
      />
    </div>
  );
}
