import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { InsightsExplorer } from "@/components/sections/InsightsExplorer";
import { siteConfig } from "@/config/site";
import { getInsights } from "@/lib/cms/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights",
  description:
    "Articles, guides and research notes from Agrayian AI Labs on AI strategy, governance, Centres of Excellence, generative and agentic AI.",
  path: "/insights",
  type: "website",
});

export default async function InsightsPage() {
  const items = await getInsights();
  const featured = items.find((item) => item.featured) ?? items[0];

  return (
    <>
      {featured && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: featured.title,
              description: featured.excerpt,
              datePublished: featured.publishedAt,
              author: { "@type": "Organization", name: featured.author },
              publisher: {
                "@type": "Organization",
                name: siteConfig.name,
                url: siteConfig.websiteUrl,
              },
            }),
          }}
        />
      )}
      <Section
        eyebrow="Insights"
        title="Practical guidance for AI leaders"
        description="Guides, research notes and perspectives on strategy, governance, CoE design and agentic systems."
        className="pt-10 md:pt-16"
      >
        <InsightsExplorer items={items} />
      </Section>
      <CTASection />
    </>
  );
}
