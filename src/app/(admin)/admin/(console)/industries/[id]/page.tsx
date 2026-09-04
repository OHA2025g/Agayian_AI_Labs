import { CollectionEditor } from "@/components/admin/CollectionModule";
import { industryRecordFields } from "@/lib/admin/fields";
import { loadCollectionDoc } from "@/lib/admin/queries";
import { requireAdminUser } from "@/lib/admin/session";

export default async function EditIndustryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAdminUser();
  const { id } = await params;
  const doc = await loadCollectionDoc("industries", id);
  const slug = typeof doc.slug === "string" ? doc.slug : undefined;
  return (
    <CollectionEditor
      user={user}
      collection="industries"
      id={id}
      title="Edit industry"
      fields={industryRecordFields}
      previewPath={slug ? `/industries/${slug}` : "/industries"}
    />
  );
}
