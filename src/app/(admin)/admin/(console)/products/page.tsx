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
        description="Change the heading and search text. The page layout stays the same."
        tabs={productsPageTabs}
        previewPath="/products"
      />
      <CollectionIndex
        collection="products"
        title="Products"
        description="Open a product to change its name, categories, and short description."
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
