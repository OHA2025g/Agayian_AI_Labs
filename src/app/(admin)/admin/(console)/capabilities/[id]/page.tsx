import { CollectionEditor } from "@/components/admin/CollectionModule";
import { capabilityRecordFields } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function EditCapabilityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAdminUser();
  const { id } = await params;
  return (
    <CollectionEditor
      user={user}
      collection="capabilities"
      id={id}
      title="Edit capability"
      fields={capabilityRecordFields}
      previewPath="/capabilities"
    />
  );
}
