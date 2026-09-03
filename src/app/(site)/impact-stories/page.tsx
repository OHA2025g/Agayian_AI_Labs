import { ImpactStoriesCinematic } from "@/components/sections/ImpactStoriesCinematic";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { ImpactPrismHero } from "@/components/visualisations/impact/ImpactPrismHero";
import {
  getCapabilities,
  getImpactStories,
  getIndustries,
  getProducts,
} from "@/lib/cms/catalog";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Impact Stories",
  description:
    "Explore anonymised sector-level impact stories showing how Agrayian approaches AI transformation, governance and product delivery.",
  path: "/impact-stories",
});

export default async function ImpactStoriesPage() {
  const [stories, industries, capabilities, products] = await Promise.all([
    getImpactStories(),
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
              { name: "Impact Stories", path: "/impact-stories" },
            ]),
          ),
        }}
      />

      <section className="scene-hero relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-texture opacity-40"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)] lg:gap-8 lg:px-8 lg:py-16">
          <div className="max-w-xl">
            <h1 className="font-heading text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold leading-[1.05] tracking-tight text-navy text-balance">
              Impact Stories
            </h1>
            <p className="mt-3 text-lg font-semibold text-navy md:text-xl">
              Transformation patterns, told with evidence
            </p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-light md:text-lg">
              Anonymised engagement stories showing the challenge, design
              response, governance approach and outcome pathway.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="/contact?interest=consultation">
                Book a Consultation
              </PrimaryButton>
              <SecondaryButton href="/capabilities">
                Explore Capabilities
              </SecondaryButton>
            </div>
          </div>
          <ImpactPrismHero />
        </div>
      </section>

      <ImpactStoriesCinematic
        stories={stories}
        industries={industries}
        capabilities={capabilities}
        products={products}
      />

      <LightCtaBar
        title="Turn AI ambition into governed, measurable impact."
        description="Numerical outcomes are shared only when validated with clients."
      />
    </>
  );
}
