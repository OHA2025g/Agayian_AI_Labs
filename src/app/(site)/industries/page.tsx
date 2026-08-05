import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { IndustriesExplorer } from "@/components/sections/IndustriesExplorer";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
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

      <Section
        tone="light"
        eyebrow="Industries"
        title="Domain-aware AI for complex operating environments"
        description="Select an industry to explore the challenges, opportunities, capabilities, products, workflows, governance considerations and outcomes that shape Agrayian engagements."
        className="scene-light on-light-surface pt-10 md:pt-16"
        cta={
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href="/contact">Book a Consultation</PrimaryButton>
            <SecondaryButton href="/ai-centre-of-excellence">
              Explore AI CoE
            </SecondaryButton>
          </div>
        }
      >
        <IndustriesExplorer
          items={items}
          capabilities={capabilities}
          products={products}
        />
      </Section>

      <CTASection
        title="Shape an industry-ready AI programme with Agrayian"
        secondaryHref="/capabilities"
        secondaryLabel="Explore Capabilities"
      />
    </>
  );
}
