import { CollectionIndex } from "@/components/admin/CollectionModule";
import { GlobalModule } from "@/components/admin/GlobalModule";
import { capabilitiesPageTabs } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminCapabilitiesPage() {
  const user = await requireAdminUser();
  return (
    <div className="space-y-8">
      <GlobalModule
        user={user}
        slug="capabilities-page"
        title="Capabilities page"
        description="Hero copy, stack activities, and on-this-page labels. Restore original if a publish went wrong."
        tabs={capabilitiesPageTabs}
        previewPath="/capabilities"
      />
      <CollectionIndex
        collection="capabilities"
        title="Capability records"
        createHref="/admin/capabilities/new"
        columns={[
          { key: "name", label: "Name" },
          { key: "slug", label: "Slug" },
          { key: "status", label: "Status" },
        ]}
      />
    </div>
  );
}
