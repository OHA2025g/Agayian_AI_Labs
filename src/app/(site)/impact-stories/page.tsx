import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { ImpactStoriesCinematic } from "@/components/sections/ImpactStoriesCinematic";
import {
  getCapabilities,
  getImpactStories,
  getIndustries,
  getProducts,
} from "@/lib/cms/catalog";
import { buildMetadata } from "@/lib/seo";

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
      <Section
        eyebrow="Impact stories"
        title="Transformation patterns, told without confidential claims"
        description="These stories use anonymised organisational labels. Numerical outcomes are shared only when validated with clients."
        className="pt-10 md:pt-16"
      >
        <ImpactStoriesCinematic
          stories={stories}
          industries={industries}
          capabilities={capabilities}
          products={products}
        />
      </Section>
      <CTASection />
    </>
  );
}
