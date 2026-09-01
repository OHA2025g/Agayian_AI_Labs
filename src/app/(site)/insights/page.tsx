import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Building2,
  Compass,
  FileSpreadsheet,
  FileText,
  Mail,
  Shield,
  Wrench,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { InsightsExplorer } from "@/components/sections/InsightsExplorer";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { KnowledgeBookHero } from "@/components/visualisations/glass/KnowledgeBookHero";
import { OriginalSculpture } from "@/components/visualisations/glass/OriginalSculpture";
import { mockupAssets } from "@/config/mockup-assets";
import { siteConfig } from "@/config/site";
import { getInsights } from "@/lib/cms/catalog";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights",
  description:
    "Articles, guides and research notes from Agrayian AI Labs on AI strategy, governance, Centres of Excellence, generative and agentic AI.",
  path: "/insights",
  type: "website",
});

const FEATURED_SLUG =
  "agentic-ai-from-demos-to-governed-operating-systems" as const;

const featuredStack = [
  "Value & outcomes",
  "Policy & guardrails",
  "Orchestration layer",
  "Tools & integrations",
  "Data & context",
  "Observability & feedback",
  "Infrastructure & security",
] as const;

const guideMeta: { file: string; icon: typeof FileText }[] = [
  { file: "PDF", icon: FileText },
  { file: "PDF", icon: FileText },
  { file: "XLSX", icon: FileSpreadsheet },
  { file: "PDF", icon: FileText },
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
  const guides = items.filter((item) => item.type === "Guides").slice(0, 4);

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

      <PageHero
        title="Insights"
        subtitle="Practical guidance for AI leaders"
        description="Research notes, frameworks and operating perspectives on strategy, governance, Centres of Excellence, and production AI systems."
        primaryCta={{
          href: "/contact?interest=consultation",
          label: "Book a Consultation",
        }}
        secondaryCta={{
          href: "#insights-library",
          label: "Browse insights",
        }}
        visual={<KnowledgeBookHero className="relative z-10" />}
      />

      {/* Featured article */}
      {featured ? (
        <section className="border-b border-[var(--border-soft)] py-14 md:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <Reveal>
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
            </Reveal>

            <Reveal delay={0.08}>
              <GlassCard variant="glow" className="overflow-hidden p-6 md:p-8">
                <div className="relative flex items-center gap-5 md:gap-7">
                  <div className="w-[42%] shrink-0">
                    <OriginalSculpture
                      src={mockupAssets.originalCapabilityStack}
                      alt=""
                      orientation="portrait"
                    />
                  </div>
                  <ol className="min-w-0 flex-1 space-y-2">
                    {featuredStack.map((label, i) => (
                      <li
                        key={label}
                        className="flex items-center gap-2 text-sm text-navy"
                      >
                        <span className="font-tech text-[0.65rem] text-cyan">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-medium leading-snug">{label}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <p className="mt-5 text-xs text-muted-light">
                  By {featured.author}
                  {featured.publishedAt
                    ? ` · ${new Date(featured.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}`
                    : null}
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Category filters + article grid */}
      <section id="insights-library" className="scroll-mt-28 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <InsightsExplorer items={items} excludeSlug={featured?.slug} />
        </div>
      </section>

      {/* Guides / downloads strip */}
      {guides.length > 0 ? (
        <section className="border-y border-[var(--border-soft)] bg-bg-secondary/50 py-12 md:py-14">
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
            <RevealGroup className="grid flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {guides.map((guide, index) => {
                const meta = guideMeta[index % guideMeta.length];
                const Icon = meta.icon;
                return (
                  <RevealItem key={guide.id}>
                    <Link
                      href={`/insights/${guide.slug}`}
                      className="flex h-full flex-col rounded-xl border border-[var(--border-soft)] bg-white/90 px-4 py-4 shadow-sm transition hover:border-tech-blue/30"
                    >
                      <Icon className="h-5 w-5 text-tech-blue" aria-hidden />
                      <p className="mt-3 text-sm font-semibold leading-snug text-navy">
                        {guide.title}
                      </p>
                      <p className="mt-auto pt-3 font-tech text-[0.65rem] uppercase tracking-wider text-muted-light">
                        {meta.file}
                      </p>
                    </Link>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
          <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="#insights-library"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-tech-blue hover:text-navy"
            >
              Browse all resources
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      ) : null}

      {/* Newsletter */}
      <section className="relative overflow-hidden border-b border-[var(--border-soft)] bg-bg-secondary/40 py-14 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(20,159,230,0.06),transparent_55%)]"
        />
        <div className="relative mx-auto max-w-xl px-4 text-center sm:px-6">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white shadow-sm">
            <Mail className="h-5 w-5 text-tech-blue" aria-hidden />
          </span>
          <h2 className="mt-5 font-heading text-2xl font-semibold text-navy">
            Stay informed on responsible AI
          </h2>
          <p className="mt-2 text-sm text-muted-light">
            Frameworks, guides and practical perspectives — no spam. You can
            also email {siteConfig.contactEmail}.
          </p>
          <div className="mx-auto mt-6 max-w-md text-left">
            <NewsletterForm />
          </div>
        </div>
      </section>

      <section className="on-dark-surface relative overflow-hidden bg-navy-deep py-14 md:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(20,159,230,0.18),transparent_55%)]"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <h2 className="font-heading text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold tracking-tight text-white text-balance">
              Turn insight into impact
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              Partner with Agrayian AI Labs to convert research and operating
              guidance into governed systems your teams can run — strategy,
              governance, CoE design, build and operate.
            </p>
            <div className="mt-7">
              <PrimaryButton href="/contact?interest=consultation">
                Book a consultation
              </PrimaryButton>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {impactPillars.map(({ title, icon: Icon }) => (
              <li
                key={title}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/85"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-tech-blue">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                {title}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
