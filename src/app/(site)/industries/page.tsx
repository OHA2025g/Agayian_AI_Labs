import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { IndustriesExplorer } from "@/components/sections/IndustriesExplorer";
import { LoadingState } from "@/components/states/LoadingState";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { IndiaNetworkMap } from "@/components/visualisations/IndiaNetworkMap";
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
    <>
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

      <PageHero
        eyebrow="Industries"
        title="Domain-aware AI for complex operating environments"
        description="Explore the challenges, workflows, governance considerations and outcomes that shape each engagement."
        primaryCta={{
          href: "/contact?interest=consultation",
          label: "Book a Consultation",
        }}
        secondaryCta={{
          href: "/capabilities",
          label: "Explore Capabilities",
        }}
        visual={<IndiaNetworkMap className="aspect-[4/3] min-h-0" />}
      />

      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
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

      <LightCtaBar title="Shape an industry-ready AI programme with Agrayian." />
    </>
  );
}
