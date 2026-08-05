import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { siteConfig } from "@/config/site";
import { insights } from "@/data/insights";
import { getInsight, getInsights } from "@/lib/cms/catalog";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const list = await getInsights();
  return (list.length ? list : insights).map((insight) => ({
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
      <Section className="pt-10 md:pt-16" tone="dark">
        <Link
          href="/insights"
          className="text-sm font-medium text-cyan hover:text-white"
        >
          ← Back to insights
        </Link>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="cyan">{insight.type}</Badge>
          <Badge variant="violet">{insight.category}</Badge>
          {insight.featured && <Badge>Featured</Badge>}
        </div>
        <h1 className="mt-4 max-w-4xl font-heading text-[clamp(1.8rem,3.5vw,3rem)] font-semibold text-balance">
          {insight.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-dark">{insight.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-dark">
          <span>{insight.author}</span>
          <span>{insight.readingTime}</span>
          <span>{insight.publishedAt}</span>
        </div>
        <article className="mt-10 max-w-3xl space-y-5 text-base leading-relaxed text-muted-dark">
          {insight.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </article>
        <div className="mt-10">
          <PrimaryButton href="/contact?interest=consultation">
            Discuss this topic with us
          </PrimaryButton>
        </div>
      </Section>
    </>
  );
}
