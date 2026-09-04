import { CollectionEditor } from "@/components/admin/CollectionModule";
import { careerRecordFields } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function NewCareerPage() {
  const user = await requireAdminUser();
  return (
    <CollectionEditor
      user={user}
      collection="careers"
      title="New role"
      fields={careerRecordFields}
      previewPath="/company/careers"
    />
  );
}
