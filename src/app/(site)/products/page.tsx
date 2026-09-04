import { Suspense } from "react";
import { ProductsArchitecture } from "@/components/products/ProductsArchitecture";
import { ProductsLaboratory } from "@/components/sections/ProductsLaboratory";
import { LoadingState } from "@/components/states/LoadingState";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { getProducts } from "@/lib/cms/catalog";
import { getProductsPageContent } from "@/lib/cms/page-content";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const page = await getProductsPageContent();
  return buildMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: "/products",
  });
}

export default async function ProductsPage() {
  const [items, page] = await Promise.all([
    getProducts(),
    getProductsPageContent(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
            ]),
          ),
        }}
      />

      <div className="products-page-shell">
        <Suspense
          fallback={
            <div className="products-main">
              <LoadingState label="Loading products…" />
            </div>
          }
        >
          <ProductsLaboratory
            items={items}
            eyebrow={page.hero.eyebrow}
            title={page.hero.title}
            description={page.hero.description}
            searchPlaceholder={page.hero.searchPlaceholder}
          />
        </Suspense>

        <div className="products-main">
          <ProductsArchitecture
            title={page.architecture.title}
            coreTitle={page.architecture.coreTitle}
            coreSubtitle={page.architecture.coreSubtitle}
          />
        </div>

        <LightCtaBar
          title="Ready to see the right product in action for your organisation?"
          href="/contact?interest=demo"
          label="Request a Product Demonstration"
        />
      </div>
    </>
  );
}
