import { Suspense } from "react";
import { ProductsArchitecture } from "@/components/products/ProductsArchitecture";
import { ProductsLaboratory } from "@/components/sections/ProductsLaboratory";
import { LoadingState } from "@/components/states/LoadingState";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { getProducts } from "@/lib/cms/catalog";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export function generateMetadata() {
  return buildMetadata({
    title: "Products",
    description:
      "Explore Agrayian AI Labs' enterprise platforms, government solutions, governance systems and AI-powered decision tools.",
    path: "/products",
  });
}

export default async function ProductsPage() {
  const items = await getProducts();

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
          <ProductsLaboratory items={items} />
        </Suspense>

        <div className="products-main">
          <ProductsArchitecture />
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
