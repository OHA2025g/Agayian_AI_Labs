import { CollectionIndex } from "@/components/admin/CollectionModule";
import { GlobalModule } from "@/components/admin/GlobalModule";
import { productsPageTabs } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function AdminProductsPage() {
  const user = await requireAdminUser();
  return (
    <div className="space-y-8">
      <GlobalModule
        user={user}
        slug="products-page"
        title="Products page"
        tabs={productsPageTabs}
        previewPath="/products"
      />
      <CollectionIndex
        collection="products"
        title="Product records"
        createHref="/admin/products/new"
        columns={[
          { key: "name", label: "Name" },
          { key: "slug", label: "Slug" },
          { key: "category", label: "Category" },
          { key: "status", label: "Status" },
        ]}
      />
    </div>
  );
}
