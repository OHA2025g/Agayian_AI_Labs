import { CollectionEditor } from "@/components/admin/CollectionModule";
import { productRecordFields } from "@/lib/admin/fields";
import { loadCollectionDoc } from "@/lib/admin/queries";
import { requireAdminUser } from "@/lib/admin/session";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAdminUser();
  const { id } = await params;
  const doc = await loadCollectionDoc("products", id);
  const slug = typeof doc.slug === "string" ? doc.slug : undefined;
  return (
    <CollectionEditor
      user={user}
      collection="products"
      id={id}
      title="Edit product"
      fields={productRecordFields}
      previewPath={slug ? `/products/${slug}` : "/products"}
    />
  );
}
