import { CapabilitiesHero } from "@/components/sections/CapabilitiesHero";
import { CapabilityJourney } from "@/components/sections/CapabilityDetail";
import { RelatedProductsRow } from "@/components/sections/RelatedProductsRow";
import { OnThisPageNav } from "@/components/ui/OnThisPageNav";
import { flagshipProducts } from "@/config/flagship-products";
import { getCapabilities, getProducts } from "@/lib/cms/catalog";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import type { Capability } from "@/types";

const journeyOrder = [
  "strategy",
  "data",
  "generative-ai",
  "agentic-ai",
  "governance",
  "product-engineering",
  "managed-services",
] as const;

const navLabels: Record<(typeof journeyOrder)[number], string> = {
  strategy: "AI Strategy & Consulting",
  data: "Data & Analytics",
  "generative-ai": "Generative AI",
  "agentic-ai": "Agentic AI",
  governance: "AI Governance",
  "product-engineering": "AI Product Engineering",
  "managed-services": "AI Managed Services",
};

export function generateMetadata() {
  return buildMetadata({
    title: "Capabilities",
    description:
      "Explore Agrayian AI Labs capabilities spanning AI strategy, Centres of Excellence, governance, generative and agentic AI, data and analytics, product engineering and managed services.",
    path: "/capabilities",
  });
}

export default async function CapabilitiesPage() {
  const [capabilities, products] = await Promise.all([
    getCapabilities(),
    getProducts(),
  ]);

  const journeyLayers = journeyOrder
    .map((slug) => capabilities.find((item) => item.slug === slug))
    .filter((item): item is Capability => Boolean(item));

  const relatedProducts = flagshipProducts
    .map((entry) => {
      const product = products.find((item) => item.slug === entry.slug);
      if (!product) return null;
      return {
        id: product.id,
        slug: product.slug,
        name: entry.displayName,
        shortDescription: entry.displayDescription,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const onThisPageItems = journeyLayers.map((capability) => ({
    id: capability.slug,
    label:
      navLabels[capability.slug as (typeof journeyOrder)[number]] ??
      capability.name,
    href: `#${capability.slug}`,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Capabilities", path: "/capabilities" },
            ]),
          ),
        }}
      />

      <div className="capabilities-page-shell">
        <div className="capabilities-main">
          <div className="capabilities-stage">
            <div>
              <CapabilitiesHero />
              <CapabilityJourney layers={journeyLayers} />
            </div>

            <aside className="relative z-20 hidden min-[1200px]:block">
              <OnThisPageNav
                items={onThisPageItems}
                variant="capabilities"
                className="capabilities-toc sticky top-[118px]"
                footer={
                  <p className="flex gap-2 text-[12px] leading-[1.45] text-[#5d7394]">
                    <span
                      aria-hidden
                      className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff4f5e]"
                    />
                    Sequence your AI investment into a governed delivery
                    agenda.
                  </p>
                }
              />
            </aside>
          </div>
        </div>

        <RelatedProductsRow products={relatedProducts} />
      </div>
    </>
  );
}
