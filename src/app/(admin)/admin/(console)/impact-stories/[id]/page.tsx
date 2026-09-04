import { CollectionEditor } from "@/components/admin/CollectionModule";
import { impactRecordFields } from "@/lib/admin/fields";
import { loadCollectionDoc } from "@/lib/admin/queries";
import { requireAdminUser } from "@/lib/admin/session";

export default async function EditImpactStoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAdminUser();
  const { id } = await params;
  const doc = await loadCollectionDoc("impact-stories", id);
  const slug = typeof doc.slug === "string" ? doc.slug : undefined;
  return (
    <CollectionEditor
      user={user}
      collection="impact-stories"
      id={id}
      title="Edit impact story"
      fields={impactRecordFields}
      previewPath={slug ? `/impact-stories/${slug}` : "/impact-stories"}
    />
  );
}
