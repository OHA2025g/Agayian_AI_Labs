import { Suspense } from "react";
import { IndustriesExplorer } from "@/components/industries/IndustriesExplorer";
import { IndustriesHero } from "@/components/industries/IndustriesHero";
import { LoadingState } from "@/components/states/LoadingState";
import {
  getCapabilities,
  getIndustries,
  getProducts,
} from "@/lib/cms/catalog";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Industries",
  description:
    "Explore how Agrayian AI Labs applies responsible AI across government, banking, HR, healthcare and social development, education, manufacturing and enterprise functions.",
  path: "/industries",
});

export default async function IndustriesPage() {
  const [items, capabilities, products] = await Promise.all([
    getIndustries(),
    getCapabilities(),
    getProducts(),
  ]);

  return (
    <div className="industries-page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Industries", path: "/industries" },
            ]),
          ),
        }}
      />

      <IndustriesHero />

      <Suspense
        fallback={
          <div className="industries-main py-16">
            <LoadingState label="Loading industries…" />
          </div>
        }
      >
        <IndustriesExplorer
          items={items}
          capabilities={capabilities}
          products={products}
        />
      </Suspense>
    </div>
  );
}
