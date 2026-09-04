import { CollectionEditor } from "@/components/admin/CollectionModule";
import { insightRecordFields } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function NewInsightPage() {
  const user = await requireAdminUser();
  return (
    <CollectionEditor
      user={user}
      collection="insights"
      title="New insight"
      fields={insightRecordFields}
      previewPath="/insights"
    />
  );
}
