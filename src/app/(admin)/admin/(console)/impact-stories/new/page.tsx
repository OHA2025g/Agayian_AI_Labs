import { CollectionEditor } from "@/components/admin/CollectionModule";
import { impactRecordFields } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function NewImpactStoryPage() {
  const user = await requireAdminUser();
  return (
    <CollectionEditor
      user={user}
      collection="impact-stories"
      title="New impact story"
      fields={impactRecordFields}
      previewPath="/impact-stories"
    />
  );
}
