import { Suspense } from "react";
import Link from "next/link";
import {
  Boxes,
  Building2,
  Compass,
  FileSpreadsheet,
  FileText,
  Mail,
  Shield,
  Wrench,
} from "lucide-react";
import { InsightsHeroSearch } from "@/components/insights/InsightsHeroSearch";
import { InsightsExplorer } from "@/components/sections/InsightsExplorer";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { InsightsFeaturedVisual } from "@/components/visualisations/glass/InsightsFeaturedVisual";
import { InsightsGlowSculpture } from "@/components/visualisations/insights/InsightsGlowSculpture";
import { insightSculptures } from "@/config/insight-sculptures";
import { siteConfig } from "@/config/site";
import { getInsights } from "@/lib/cms/catalog";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights",
  description:
    "Research, frameworks and perspectives on AI strategy, governance, CoE design and agentic systems.",
  path: "/insights",
  type: "website",
});

const FEATURED_SLUG =
  "agentic-ai-from-demos-to-governed-operating-systems" as const;

const guideMeta: { file: string; icon: typeof FileText }[] = [
  { file: "PDF", icon: FileText },
  { file: "PDF", icon: FileText },
  { file: "PDF", icon: FileText },
  { file: "XLSX", icon: FileSpreadsheet },
];

const impactPillars = [
  { title: "Strategy & roadmapping", icon: Compass },
  { title: "Governance & risk", icon: Shield },
  { title: "CoE design & scale", icon: Building2 },
  { title: "Build & integrate", icon: Boxes },
  { title: "Operate & optimize", icon: Wrench },
] as const;

export default async function InsightsPage() {
  const items = await getInsights();
  const featured =
    items.find((item) => item.slug === FEATURED_SLUG) ??
    items.find((item) => item.featured) ??
    items[0];
  const guideCards = items
    .filter((item) => item.type === "Guides")
    .slice(0, 4)
    .map((guide, index) => ({
      id: guide.id,
      href: `/insights/${guide.slug}`,
      title: guide.title,
      file: guideMeta[index % guideMeta.length]?.file ?? "PDF",
    }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights" },
            ]),
          ),
        }}
      />
      {featured ? (
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
      ) : null}

      <section className="scene-hero relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-texture opacity-40"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:gap-10 lg:px-8 lg:py-16">
          <div className="max-w-xl">
            <h1 className="font-heading text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold leading-[1.05] tracking-tight text-navy text-balance">
              Insights
            </h1>
            <p className="mt-3 text-lg font-semibold text-navy md:text-xl">
              Practical guidance for AI leaders
            </p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-light md:text-lg">
              Research, frameworks and perspectives on AI strategy, governance,
              CoE design and agentic systems.
            </p>
            <Suspense fallback={null}>
              <InsightsHeroSearch />
            </Suspense>
          </div>
          <InsightsGlowSculpture
            asset={insightSculptures.heroBook}
            priority
            sizes="(max-width: 1024px) 92vw, 48vw"
          />
        </div>
      </section>

      {featured ? (
        <section className="py-14 md:py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)] lg:gap-12 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-blue">
                Featured article
              </p>
              <h2 className="mt-3 font-heading text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-tight text-navy text-balance">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-light">
                {featured.excerpt}
              </p>
              <div className="mt-7">
                <PrimaryButton href={`/insights/${featured.slug}`}>
                  Read the article
                </PrimaryButton>
              </div>
            </div>
            <InsightsFeaturedVisual />
          </div>
        </section>
      ) : null}

      <section id="insights-library" className="scroll-mt-28 py-6 md:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={null}>
            <InsightsExplorer items={items} excludeSlug={featured?.slug} />
          </Suspense>
        </div>
      </section>

      {guideCards.length > 0 ? (
        <section className="py-12 md:py-14">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="max-w-sm shrink-0">
              <h2 className="font-heading text-xl font-semibold text-navy md:text-2xl">
                Practical guides &amp; frameworks
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-light">
                Operating playbooks and concise guides you can take into
                portfolio, risk and delivery conversations.
              </p>
            </div>
            <div className="grid flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {guideCards.map((guide) => {
                const Icon =
                  guide.file === "XLSX" ? FileSpreadsheet : FileText;
                return (
                  <Link
                    key={guide.id}
                    href={guide.href}
                    className="flex h-full flex-col rounded-xl border border-[var(--border-soft)] bg-white px-4 py-4 transition hover:border-tech-blue/30"
                  >
                    <Icon className="h-5 w-5 text-tech-blue" aria-hidden />
                    <p className="mt-3 text-sm font-semibold leading-snug text-navy">
                      {guide.title}
                    </p>
                    <p className="mt-auto pt-3 font-tech text-[0.65rem] uppercase tracking-wider text-muted-light">
                      {guide.file}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 rounded-2xl border border-[var(--border-soft)] bg-[#f6f8fb] px-5 py-5 sm:flex-row sm:items-center sm:px-7">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-tech-blue">
            <Mail className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-heading text-lg font-semibold text-navy">
              Stay informed on responsible AI
            </h2>
            <p className="mt-1 text-sm text-muted-light">
              Frameworks, guides and practical perspectives — no spam.
            </p>
          </div>
          <div className="w-full sm:max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </section>

      <section className="bg-bg-primary px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="on-dark-surface relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-navy-deep px-6 py-12 sm:px-10 md:px-12 md:py-14">
          <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)_minmax(0,0.85fr)] lg:gap-8">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/55">
                For enterprise leaders
              </p>
              <h2 className="mt-3 font-heading text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold tracking-tight text-white text-balance">
                Turn insight into impact
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                Convert research and operating guidance into governed systems
                your teams can run — strategy, governance, CoE design, build and
                operate.
              </p>
              <div className="mt-7">
                <PrimaryButton
                  href="/contact?interest=consultation"
                  className="bg-white text-navy shadow-none hover:bg-white/90"
                >
                  Book a consultation
                </PrimaryButton>
              </div>
            </div>
            <InsightsGlowSculpture
              asset={insightSculptures.ctaShield}
              sizes="(max-width: 1024px) 90vw, 34vw"
              className="mix-blend-screen opacity-100 saturate-100"
            />
            <ul className="space-y-3">
              {impactPillars.map(({ title, icon: Icon }) => (
                <li
                  key={title}
                  className="flex items-center gap-3 text-sm text-white/90"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-tech-blue">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
