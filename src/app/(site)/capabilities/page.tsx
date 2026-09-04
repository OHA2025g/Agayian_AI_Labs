import { CapabilitiesHero } from "@/components/sections/CapabilitiesHero";
import { CapabilityJourney } from "@/components/sections/CapabilityDetail";
import { RelatedProductsRow } from "@/components/sections/RelatedProductsRow";
import { OnThisPageNav } from "@/components/ui/OnThisPageNav";
import { flagshipProducts } from "@/config/flagship-products";
import { getCapabilities, getProducts } from "@/lib/cms/catalog";
import { getCapabilitiesPageContent } from "@/lib/cms/page-content";
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

export async function generateMetadata() {
  const page = await getCapabilitiesPageContent();
  return buildMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: "/capabilities",
  });
}

export default async function CapabilitiesPage() {
  const [capabilities, products, page] = await Promise.all([
    getCapabilities(),
    getProducts(),
    getCapabilitiesPageContent(),
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

  const onThisPageItems = journeyLayers.map((capability) => {
    const cmsLabel = page.journeyLabels.find(
      (item) => item.href === `#${capability.slug}` || item.href.endsWith(capability.slug),
    );
    return {
      id: capability.slug,
      label:
        cmsLabel?.label ??
        navLabels[capability.slug as (typeof journeyOrder)[number]] ??
        capability.name,
      href: `#${capability.slug}`,
    };
  });

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
              <CapabilitiesHero
                title={page.hero.title}
                subheadLine1={page.hero.subheadLine1}
                subheadLine2={page.hero.subheadLine2}
                body={page.hero.body}
                primaryCtaLabel={page.hero.primaryCtaLabel}
                primaryCtaHref={page.hero.primaryCtaHref}
                secondaryCtaLabel={page.hero.secondaryCtaLabel}
                secondaryCtaHref={page.hero.secondaryCtaHref}
                stackLabels={page.stackActivities}
              />
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
