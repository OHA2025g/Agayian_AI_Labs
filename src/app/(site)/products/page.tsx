import { Suspense } from "react";
import { Section } from "@/components/layout/Section";
import { ProductsLaboratory } from "@/components/sections/ProductsLaboratory";
import { LoadingState } from "@/components/states/LoadingState";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { getProducts } from "@/lib/cms/catalog";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export function generateMetadata() {
  return buildMetadata({
    title: "Products",
    description:
      "Explore Agrayian AI Labs' enterprise platforms, government solutions, governance systems and AI-powered decision tools in one interactive laboratory.",
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
      <Section
        eyebrow="Products"
        title="AI Products and Solutions Built for Real-World Decisions"
        description="Search, filter and inspect modules, technologies and governance context without leaving this page."
        className="pt-10 md:pt-16"
        cta={
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href="/contact?interest=demo">
              Request a Demo
            </PrimaryButton>
            <SecondaryButton href="/capabilities">
              Explore Capabilities
            </SecondaryButton>
          </div>
        }
      >
        <Suspense fallback={<LoadingState label="Loading products…" />}>
          <ProductsLaboratory items={items} />
        </Suspense>
      </Section>
    </>
  );
}
