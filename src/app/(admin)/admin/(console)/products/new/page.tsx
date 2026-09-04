import { CollectionEditor } from "@/components/admin/CollectionModule";
import { productRecordFields } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function NewProductPage() {
  const user = await requireAdminUser();
  return (
    <CollectionEditor
      user={user}
      collection="products"
      title="New product"
      fields={productRecordFields}
    />
  );
}
