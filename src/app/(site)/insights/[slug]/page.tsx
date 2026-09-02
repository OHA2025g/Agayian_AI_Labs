import { notFound } from "next/navigation";
import { InsightArticleView } from "@/components/insights/InsightArticleView";
import { siteConfig } from "@/config/site";
import { insights } from "@/data/insights";
import { getInsight, getInsights } from "@/lib/cms/catalog";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return insights.map((insight) => ({
    slug: insight.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) {
    return buildMetadata({
      title: "Insight not found",
      description: siteConfig.description,
      path: `/insights/${slug}`,
    });
  }
  return buildMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${insight.slug}`,
    type: "article",
  });
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();

  const all = await getInsights();
  const related = all
    .filter(
      (item) =>
        item.slug !== insight.slug &&
        (item.category === insight.category || item.type === insight.type),
    )
    .slice(0, 4);

  const relatedFallback =
    related.length >= 2
      ? related
      : all.filter((item) => item.slug !== insight.slug).slice(0, 4);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt,
    datePublished: insight.publishedAt,
    author: { "@type": "Organization", name: insight.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.websiteUrl,
    },
    mainEntityOfPage: `${siteConfig.websiteUrl}/insights/${insight.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights" },
              {
                name: insight.title,
                path: `/insights/${insight.slug}`,
              },
            ]),
          ),
        }}
      />
      <InsightArticleView insight={insight} related={relatedFallback} />
    </>
  );
}
