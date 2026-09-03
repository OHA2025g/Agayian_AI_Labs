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
import { getInsights, getProducts } from "@/lib/cms/catalog";
import { getHomePageContent } from "@/lib/cms/page-content";
import type { Insight } from "@/types";

export default async function HomePage() {
  const [home, products, insights] = await Promise.all([
    getHomePageContent(),
    getProducts(),
    getInsights(),
  ]);

  const featuredSlugs = home.featuredProductSlugs.length
    ? home.featuredProductSlugs
    : flagshipProducts.map((entry) => entry.slug);

  const labProducts = featuredSlugs
    .map((slug) => {
      const product = products.find((item) => item.slug === slug);
      if (!product) return null;
      const entry = flagshipProducts.find((item) => item.slug === slug);
      return {
        ...product,
        name: entry?.displayName ?? product.name,
        shortDescription: entry?.displayDescription ?? product.shortDescription,
      };
    })
    .filter(Boolean);

  const featuredInsights = home.featuredInsightSlugs
    .map((slug) => insights.find((item) => item.slug === slug))
    .filter((item): item is Insight => Boolean(item));

  return (
    <div className="relative isolate bg-white">
      <HomeHero
        headline={home.hero.headline}
        supporting={home.hero.supporting}
        primaryCta={home.hero.primaryCtaLabel}
        primaryCtaHref={home.hero.primaryCtaHref}
        secondaryCta={home.hero.secondaryCtaLabel}
        secondaryCtaHref={home.hero.secondaryCtaHref}
        trustStatement={home.hero.trustLine}
      />

      <section id="home-what-we-do" className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle align="center" accent="below">
              {home.sections.ambition}
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
              {home.sections.products}
            </SectionTitle>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {labProducts.map((product) =>
              product ? (
                <div key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
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
              {home.sections.industries}
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
            <SectionTitle accent="below">{home.sections.responsible}</SectionTitle>
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
                {home.sections.insights}
              </SectionTitle>
            </Reveal>

            <HomeInsightsRow insights={featuredInsights} />
          </div>
        </section>
      ) : null}

      <LightCtaBar
        title={home.cta.title}
        description={home.cta.description}
      />
    </div>
  );
}
