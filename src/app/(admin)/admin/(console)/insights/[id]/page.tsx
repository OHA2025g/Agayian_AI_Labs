import { CollectionEditor } from "@/components/admin/CollectionModule";
import { insightRecordFields } from "@/lib/admin/fields";
import { loadCollectionDoc } from "@/lib/admin/queries";
import { requireAdminUser } from "@/lib/admin/session";

export default async function EditInsightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAdminUser();
  const { id } = await params;
  const doc = await loadCollectionDoc("insights", id);
  const slug = typeof doc.slug === "string" ? doc.slug : undefined;
  return (
    <CollectionEditor
      user={user}
      collection="insights"
      id={id}
      title="Edit insight"
      fields={insightRecordFields}
      previewPath={slug ? `/insights/${slug}` : "/insights"}
    />
  );
}
