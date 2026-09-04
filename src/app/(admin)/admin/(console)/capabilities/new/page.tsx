import { CollectionEditor } from "@/components/admin/CollectionModule";
import { capabilityRecordFields } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function NewCapabilityPage() {
  const user = await requireAdminUser();
  return (
    <CollectionEditor
      user={user}
      collection="capabilities"
      title="New capability"
      fields={capabilityRecordFields}
      previewPath="/capabilities"
    />
  );
}
