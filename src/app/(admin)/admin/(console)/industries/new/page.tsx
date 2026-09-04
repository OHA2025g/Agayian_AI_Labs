import { CollectionEditor } from "@/components/admin/CollectionModule";
import { industryRecordFields } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function NewIndustryPage() {
  const user = await requireAdminUser();
  return (
    <CollectionEditor
      user={user}
      collection="industries"
      title="New industry"
      fields={industryRecordFields}
      previewPath="/industries"
    />
  );
}
