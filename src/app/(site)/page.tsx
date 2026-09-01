import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeAmbitionFlow } from "@/components/sections/HomeAmbitionFlow";
import { HomeIndustryCards } from "@/components/sections/HomeIndustryCards";
import { HomeInsightsRow } from "@/components/sections/HomeInsightsRow";
import { HomeResponsibleRow } from "@/components/sections/HomeResponsibleRow";
import { Reveal } from "@/components/motion/Reveal";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { MockupCard } from "@/components/ui/MockupCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductGlassArt } from "@/components/visualisations/glass/ProductGlassArt";
import { flagshipProducts } from "@/config/flagship-products";
import { insights as staticInsights } from "@/data/insights";
import { getProducts, getInsights } from "@/lib/cms/catalog";
import type { Insight } from "@/types";

const homeInsightSlugs = [
  "operationalizing-responsible-ai-in-the-enterprise",
  "from-data-to-decisions-the-enterprise-ai-playbook",
  "agentic-ai-building-systems-that-act-with-accountability",
  "governance-frameworks-for-the-age-of-ai",
] as const;

function resolveHomeInsight(
  slug: string,
  published: Insight[],
): Insight | undefined {
  return (
    published.find((item) => item.slug === slug) ??
    staticInsights.find((item) => item.slug === slug)
  );
}

export default async function HomePage() {
  const [products, insights] = await Promise.all([
    getProducts(),
    getInsights(),
  ]);

  const labProducts = flagshipProducts
    .map((entry) => {
      const product = products.find((item) => item.slug === entry.slug);
      if (!product) return null;
      return {
        ...product,
        name: entry.displayName,
        shortDescription: entry.displayDescription,
      };
    })
    .filter(Boolean);

  const featuredInsights = homeInsightSlugs
    .map((slug) => resolveHomeInsight(slug, insights))
    .filter((item): item is Insight => Boolean(item));

  return (
    <div className="relative isolate bg-white">
      <HomeHero />

      <section id="home-what-we-do" className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle align="center" accent="below">
              From ambition to accountable intelligence
            </SectionTitle>
          </Reveal>
          <div className="mt-10 md:mt-12">
            <HomeAmbitionFlow />
          </div>
        </div>
      </section>

      <section
        id="home-products"
        className="border-t border-[#eef2f7] bg-white py-14 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              action={
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-tech-blue hover:text-navy"
                >
                  Explore all products
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              }
            >
              Flagship products
            </SectionTitle>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {labProducts.map((product) =>
              product ? (
                <div key={product.id}>
                  <Link
                    href={`/products?product=${product.slug}`}
                    className="block h-full"
                  >
                    <MockupCard className="flex h-full flex-col p-5 hover:translate-y-0">
                      <ProductGlassArt
                        slug={product.slug}
                        alt={`${product.name} glass illustration`}
                        variant="home"
                      />
                      <h3 className="mt-5 font-heading text-base font-semibold text-navy md:text-lg">
                        {product.name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-light">
                        {product.shortDescription}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-tech-blue">
                        Learn more
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current">
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </span>
                    </MockupCard>
                  </Link>
                </div>
              ) : null,
            )}
          </div>
        </div>
      </section>

      <section
        id="home-industries"
        className="border-t border-[#eef2f7] bg-[#f5f8fb] py-14 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              accent="below"
              className="sm:items-start"
              action={
                <Link
                  href="/industries"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-tech-blue hover:text-navy"
                >
                  Explore industries
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              }
            >
              Industries we empower
            </SectionTitle>
          </Reveal>

          <HomeIndustryCards />
        </div>
      </section>

      <section
        id="home-responsible"
        className="relative border-t border-[#eef2f7] bg-white py-14 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle accent="below">Responsible AI by design</SectionTitle>
          </Reveal>
          <div className="mt-10 md:mt-12">
            <HomeResponsibleRow />
          </div>
        </div>
      </section>

      {featuredInsights.length > 0 ? (
        <section
          id="home-insights"
          className="border-t border-[#eef2f7] bg-white py-14 md:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionTitle
                accent="below"
                className="sm:items-start"
                action={
                  <Link
                    href="/insights"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-tech-blue hover:text-navy"
                  >
                    View all insights
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                }
              >
                Insights that inspire
              </SectionTitle>
            </Reveal>

            <HomeInsightsRow insights={featuredInsights} />
          </div>
        </section>
      ) : null}

      <LightCtaBar
        title="Ready to build governed intelligence?"
        description="Strategy to scale. Governance by design. Human accountability throughout."
      />
    </div>
  );
}
