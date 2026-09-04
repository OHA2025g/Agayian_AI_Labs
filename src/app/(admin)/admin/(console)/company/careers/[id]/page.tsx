import { CollectionEditor } from "@/components/admin/CollectionModule";
import { careerRecordFields } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function EditCareerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAdminUser();
  const { id } = await params;
  return (
    <CollectionEditor
      user={user}
      collection="careers"
      id={id}
      title="Edit role"
      fields={careerRecordFields}
      previewPath="/company/careers"
    />
  );
}
