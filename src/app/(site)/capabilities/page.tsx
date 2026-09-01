import { CapabilitiesHero } from "@/components/sections/CapabilitiesHero";
import { CapabilityJourney } from "@/components/sections/CapabilityDetail";
import { RelatedProductsRow } from "@/components/sections/RelatedProductsRow";
import { Reveal } from "@/components/motion/Reveal";
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

      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_12.25rem] lg:items-start lg:gap-x-6 xl:grid-cols-[minmax(0,1fr)_12.5rem] xl:gap-x-8">
            <CapabilitiesHero />

            <aside className="relative z-20 row-span-2 mt-12 hidden lg:mt-14 lg:block">
              <OnThisPageNav
                items={onThisPageItems}
                variant="layers"
                className="top-28 flex min-h-[50rem] flex-col"
                footer={
                  <p className="flex gap-2 text-[0.78rem] leading-snug text-muted-light">
                    <span
                      aria-hidden
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand"
                    />
                    Sequence your AI investment into a governed delivery
                    agenda.
                  </p>
                }
              />
            </aside>

            <section className="relative pt-8 pb-14 md:pt-10 md:pb-20">
              <div
                aria-hidden
                className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-[#f5f8fb]"
              />
              <Reveal>
                <CapabilityJourney layers={journeyLayers} />
              </Reveal>
            </section>
          </div>
        </div>
      </div>

      <RelatedProductsRow products={relatedProducts} />
    </>
  );
}
