import Link from "next/link";
import { notFound } from "next/navigation";
import { ExpectedOutcomes } from "@/components/industries/ExpectedOutcomes";
import { GovernanceConsiderations } from "@/components/industries/GovernanceConsiderations";
import { IndustryCta } from "@/components/industries/IndustryCta";
import { OpportunityMap } from "@/components/industries/OpportunityMap";
import { PriorityChallenges } from "@/components/industries/PriorityChallenges";
import { RelatedProducts } from "@/components/industries/RelatedProducts";
import { RelevantCapabilities } from "@/components/industries/RelevantCapabilities";
import { TypicalWorkflows } from "@/components/industries/TypicalWorkflows";
import { PageHero } from "@/components/layout/PageHero";
import {
  getCapabilities,
  getIndustries,
  getIndustry,
  getProducts,
} from "@/lib/cms/catalog";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import type { Capability, IndustryCapabilityIcon, IndustryCapabilityItem } from "@/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const fallbackCapabilityIcons: IndustryCapabilityIcon[] = [
  "unification",
  "automation",
  "insight",
  "document",
  "geospatial",
  "language",
  "fraud",
  "monitoring",
  "interop",
];

export async function generateStaticParams() {
  const items = await getIndustries();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) {
    return buildMetadata({
      title: "Industry not found",
      description: "This industry page is not published.",
      path: `/industries/${slug}`,
    });
  }
  return buildMetadata({
    title: industry.name,
    description: industry.summary,
    path: `/industries/${industry.slug}`,
  });
}

function relevantFor(
  industry: NonNullable<Awaited<ReturnType<typeof getIndustry>>>,
  capabilities: Capability[],
): IndustryCapabilityItem[] {
  if (industry.relevantCapabilities?.length) return industry.relevantCapabilities;
  return industry.capabilities
    .map((slug) => capabilities.find((item) => item.slug === slug))
    .filter((item): item is Capability => Boolean(item))
    .slice(0, 9)
    .map((item, index) => ({
      title: item.name,
      icon: fallbackCapabilityIcons[index] ?? "unification",
    }));
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [industry, capabilities, products] = await Promise.all([
    getIndustry(slug),
    getCapabilities(),
    getProducts(),
  ]);
  if (!industry) notFound();

  const relatedProducts = industry.products
    .map((productSlug) => products.find((item) => item.slug === productSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="industries-page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Industries", path: "/industries" },
              { name: industry.name, path: `/industries/${industry.slug}` },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Industries"
        title={industry.name}
        description={industry.summary}
        primaryCta={{
          href: "/contact?interest=consultation",
          label: "Book a Consultation",
        }}
        secondaryCta={{
          href: `/industries?industry=${industry.slug}`,
          label: "Open in explorer",
        }}
      />

      <p className="industries-main pt-6 text-sm">
        <Link href="/industries" className="font-semibold text-tech-blue hover:text-navy">
          All industries
        </Link>
      </p>

      <section className="industries-overview industries-main">
        <PriorityChallenges items={industry.challenges} />
        <OpportunityMap items={industry.opportunities} />
      </section>

      <TypicalWorkflows steps={industry.workflows} />

      <section className="industries-cap-prod industries-main">
        <RelevantCapabilities items={relevantFor(industry, capabilities)} />
        <RelatedProducts items={relatedProducts} cards={industry.productCards} />
      </section>

      <section className="industries-gov-out industries-main">
        <GovernanceConsiderations items={industry.governance} />
        <ExpectedOutcomes items={industry.outcomes} />
      </section>

      <IndustryCta />
    </div>
  );
}
