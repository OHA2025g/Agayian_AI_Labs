import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Crosshair,
  FileCheck,
  Flag,
  Gauge,
  GitBranch,
  Layers,
  Shield,
  Target,
  UserCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { AgrayianMark } from "@/components/layout/AgrayianMark";
import { InsightCard } from "@/components/cards/InsightCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { OnThisPageNav } from "@/components/ui/OnThisPageNav";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ProcessFlow } from "@/components/ui/ProcessFlow";
import { GlassOrb } from "@/components/visualisations/glass/GlassOrb";
import { KnowledgeBookHero } from "@/components/visualisations/glass/KnowledgeBookHero";
import { siteConfig } from "@/config/site";
import type { Insight } from "@/types";
import { cn } from "@/lib/utils";

type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  visual?:
    | "glass-row"
    | "agent-flow"
    | "governance-flow"
    | "ownership-row"
    | "autonomy-quote"
    | "ops-glance";
};

const glassRow: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Clear goals",
    description: "Allowable intents and success criteria before autonomy expands.",
    icon: Target,
  },
  {
    title: "Constrained tools",
    description: "Catalogued actions with permissions and irreversible-action gates.",
    icon: Wrench,
  },
  {
    title: "Verification",
    description: "Checks that separate draft output from consequential action.",
    icon: CheckCircle2,
  },
  {
    title: "Escalation",
    description: "Human paths when confidence, policy or risk thresholds trip.",
    icon: Flag,
  },
  {
    title: "Evidence",
    description: "Logs and artefacts leaders can review after the fact.",
    icon: FileCheck,
  },
];

const ownershipRow: { title: string; description: string; icon: LucideIcon }[] =
  [
    {
      title: "Business owner",
      description: "Outcome accountability for the decision the agent supports.",
      icon: Users,
    },
    {
      title: "System owner",
      description: "Platform, evaluation harness and change control.",
      icon: Layers,
    },
    {
      title: "Policy owner",
      description: "Allowed goals, tool permissions and residual risk.",
      icon: Shield,
    },
    {
      title: "Ops owner",
      description: "Monitoring, exceptions and incident response.",
      icon: Gauge,
    },
    {
      title: "Assurance",
      description: "Independent challenge of evidence quality.",
      icon: UserCheck,
    },
  ];

const autonomyLevels = [
  {
    title: "Human led",
    tone: "border-tech-blue/25 bg-sky/10",
    items: ["Agent prepares", "Human decides", "Full audit trail"],
  },
  {
    title: "Human approved",
    tone: "border-cyan/25 bg-cyan/5",
    items: ["Agent proposes action", "Human confirms", "Bounded retries"],
  },
  {
    title: "Bounded autonomy",
    tone: "border-brand/25 bg-brand/5",
    items: ["Pre-approved tools", "Hard stop rules", "Live exception queue"],
  },
] as const;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function titleFromParagraph(paragraph: string, index: number) {
  const first = paragraph.split(/[.!?]/)[0]?.trim() ?? "";
  if (first.length > 12 && first.length < 90) return first;
  return `Perspective ${index + 1}`;
}

function buildSections(insight: Insight): ArticleSection[] {
  if (insight.slug === "agentic-ai-from-demos-to-governed-operating-systems") {
    const body = insight.body;
    return [
      {
        id: "production-gap",
        title: "The production gap between demos and operating systems",
        paragraphs: body.slice(0, 2),
      },
      {
        id: "clear-goals",
        title: "Design for clear goals and constrained tools",
        paragraphs: body.slice(2, 3),
        visual: "glass-row",
      },
      {
        id: "separate-stages",
        title: "Separate intent, plan, tool use and verification",
        paragraphs: body.slice(3, 4),
        visual: "agent-flow",
      },
      {
        id: "start-narrow",
        title: "Start narrow, instrument everything, then scale",
        paragraphs: body.slice(4, 5),
        visual: "ops-glance",
      },
      {
        id: "privileged-tools",
        title: "Treat every tool call as a privileged action",
        paragraphs: body.slice(5, 6),
        visual: "governance-flow",
      },
      {
        id: "operating-ownership",
        title: "Assign operating ownership before expanding autonomy",
        paragraphs: body.slice(6, 7),
        visual: "ownership-row",
      },
      {
        id: "autonomy-ladder",
        title: "Publish an autonomy ladder",
        paragraphs: body.slice(7, 8),
        visual: "autonomy-quote",
      },
    ];
  }

  return insight.body.map((paragraph, index) => ({
    id: `section-${index + 1}`,
    title: titleFromParagraph(paragraph, index),
    paragraphs: [paragraph],
    visual:
      index === insight.body.length - 1 && insight.body.length >= 4
        ? "ops-glance"
        : undefined,
  }));
}

function GlassIconRow({
  items,
}: {
  items: { title: string; description: string; icon: LucideIcon }[];
}) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {items.map(({ title, description, icon: Icon }) => (
        <GlassCard key={title} className="px-3 py-4 text-center">
          <GlassOrb icon={Icon} size="md" className="mx-auto" />
          <p className="mt-3 text-sm font-semibold text-navy">{title}</p>
          <p className="mt-1.5 text-[0.7rem] leading-relaxed text-muted-light">
            {description}
          </p>
        </GlassCard>
      ))}
    </div>
  );
}

function GovernanceFlow() {
  const steps = [
    { label: "Agent", icon: Bot },
    { label: "Policy check", icon: Shield },
    { label: "Tool", icon: Wrench },
    { label: "Result", icon: CheckCircle2 },
  ] as const;

  return (
    <GlassCard className="mt-6 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-light">
        Tool-call governance flow
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex items-center gap-2 md:gap-3">
              <div className="rounded-xl border border-white/90 bg-white/80 px-3 py-3 text-center shadow-sm">
                <Icon className="mx-auto h-4 w-4 text-tech-blue" aria-hidden />
                <p className="mt-1.5 text-xs font-semibold text-navy">
                  {step.label}
                </p>
              </div>
              {index < steps.length - 1 ? (
                <span className="font-tech text-tech-blue" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-brand">
        <GitBranch className="h-4 w-4" aria-hidden />
        <span className="font-medium">Block / Escalate</span>
        <span className="text-muted-light">from policy check</span>
      </div>
    </GlassCard>
  );
}

function OpsGlancePreview() {
  const metrics = [
    { label: "Task success rate", value: "92%", tone: "text-emerald-600" },
    { label: "Exceptions", value: "14", tone: "text-brand" },
    { label: "Top blocked", value: "3", tone: "text-amber-600" },
    { label: "Avg. cost / task", value: "$0.28", tone: "text-emerald-600" },
    { label: "P95 latency", value: "2.4s", tone: "text-emerald-600" },
  ] as const;

  return (
    <GlassCard className="mt-6 overflow-hidden p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-heading text-sm font-semibold text-navy">
            Agent operations at a glance
          </p>
          <p className="mt-1 font-tech text-[0.55rem] uppercase tracking-[0.18em] text-muted-light">
            Illustrative preview
          </p>
        </div>
        <Crosshair className="h-4 w-4 text-tech-blue" aria-hidden />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-[var(--border-soft)] bg-white/70 px-3 py-2"
          >
            <p className="text-[0.65rem] text-muted-light">{metric.label}</p>
            <p className={cn("font-heading text-lg font-semibold", metric.tone)}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="mt-4 h-12 rounded-lg bg-gradient-to-r from-sky/20 via-tech-blue/15 to-cyan/10"
        style={{
          maskImage:
            "radial-gradient(ellipse at 20% 60%, black 0%, transparent 55%), radial-gradient(ellipse at 55% 40%, black 0%, transparent 50%), radial-gradient(ellipse at 85% 70%, black 0%, transparent 45%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 20% 60%, black 0%, transparent 55%), radial-gradient(ellipse at 55% 40%, black 0%, transparent 50%), radial-gradient(ellipse at 85% 70%, black 0%, transparent 45%)",
        }}
      />
    </GlassCard>
  );
}

function SectionVisual({ visual }: { visual?: ArticleSection["visual"] }) {
  if (!visual) return null;

  if (visual === "glass-row") {
    return <GlassIconRow items={glassRow} />;
  }

  if (visual === "agent-flow") {
    return (
      <div className="mt-6">
        <ProcessFlow
          steps={[
            {
              title: "Intent",
              description: "Allowed goals only",
              icon: Target,
            },
            {
              title: "Plan",
              description: "Bounded steps",
              icon: Layers,
            },
            {
              title: "Tool",
              description: "Privileged actions",
              icon: Wrench,
            },
            {
              title: "Verify",
              description: "Evidence checks",
              icon: CheckCircle2,
            },
            {
              title: "Escalate",
              description: "Human when needed",
              icon: AlertTriangle,
              accent: "brand",
            },
          ]}
        />
      </div>
    );
  }

  if (visual === "governance-flow") {
    return <GovernanceFlow />;
  }

  if (visual === "ownership-row") {
    return <GlassIconRow items={ownershipRow} />;
  }

  if (visual === "autonomy-quote") {
    return (
      <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-3 sm:grid-cols-3">
          {autonomyLevels.map((level) => (
            <div
              key={level.title}
              className={cn(
                "rounded-2xl border px-4 py-4",
                level.tone,
              )}
            >
              <p className="text-sm font-semibold text-navy">{level.title}</p>
              <ul className="mt-3 space-y-1.5 text-xs text-muted-light">
                {level.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <blockquote className="relative rounded-2xl border border-[var(--border-soft)] bg-white/80 p-6 shadow-sm">
          <span
            aria-hidden
            className="font-heading text-5xl leading-none text-tech-blue/30"
          >
            “
          </span>
          <p className="mt-1 font-heading text-lg font-semibold leading-snug text-navy">
            Governance isn&apos;t a brake on autonomy. It&apos;s the system that
            makes safe autonomy possible.
          </p>
        </blockquote>
      </div>
    );
  }

  if (visual === "ops-glance") {
    return (
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <ProcessFlow
          compact
          steps={[
            { title: "Pick case", description: "High clarity", icon: Target },
            {
              title: "Instrument",
              description: "Measure early",
              icon: Gauge,
            },
            {
              title: "Expand",
              description: "Only with evidence",
              icon: Layers,
            },
            {
              title: "Increase",
              description: "Autonomy with owners",
              icon: Bot,
            },
          ]}
        />
        <OpsGlancePreview />
      </div>
    );
  }

  return null;
}

export function InsightArticleView({
  insight,
  related,
}: {
  insight: Insight;
  related: Insight[];
}) {
  const sections = buildSections(insight);
  const tocItems = sections.map((section) => ({
    id: section.id,
    label: section.title,
    href: `#${section.id}`,
  }));

  return (
    <>
      <div className="border-b border-[var(--border-soft)] bg-white/70">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-light">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/insights" className="hover:text-tech-blue">
                  Insights
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-navy">{insight.category}</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-texture opacity-30"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-12 lg:px-8 lg:py-14">
          <div className="min-w-0">
            <header>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-blue">
                {insight.category}
              </p>
              <h1 className="mt-3 max-w-3xl font-heading text-[clamp(1.85rem,3.6vw,3rem)] font-semibold tracking-tight text-navy text-balance">
                {insight.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-light md:text-lg">
                {insight.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-light">
                <span className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-[var(--border-soft)] bg-white">
                  <AgrayianMark variant="light" className="h-5 w-5" />
                </span>
                <span>Written by {insight.author}</span>
                <span aria-hidden>·</span>
                <span>
                  {insight.readingTime} read · {formatDate(insight.publishedAt)}
                </span>
              </div>

              <div className="relative mt-10 max-w-md lg:hidden">
                <KnowledgeBookHero className="max-w-none" />
              </div>

              <div className="mt-8 lg:hidden">
                <OnThisPageNav items={tocItems} />
              </div>
            </header>

            <article className="mt-12 space-y-12 border-t border-[var(--border-soft)] pt-12 md:mt-14 md:pt-14">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28"
                >
                  <h2 className="font-heading text-xl font-semibold tracking-tight text-navy md:text-2xl text-balance">
                    <span className="mr-2 font-tech text-base text-tech-blue">
                      {index + 1}.
                    </span>
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-light">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                  <SectionVisual visual={section.visual} />
                </section>
              ))}

              <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-white">
                  <AgrayianMark variant="light" className="h-9 w-9" />
                </span>
                <div>
                  <p className="font-heading text-lg font-semibold text-navy">
                    About {siteConfig.name}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-light">
                    {siteConfig.description}
                  </p>
                  <Link
                    href="/company"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-tech-blue hover:text-navy"
                  >
                    Learn more about us
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </GlassCard>
            </article>
          </div>

          <aside className="hidden space-y-6 lg:block">
            <KnowledgeBookHero className="max-w-none" />
            <OnThisPageNav
              items={tocItems}
              className="top-28"
              footer={
                <div>
                  <p className="text-sm font-semibold text-navy">
                    Design agentic systems that can be trusted in production.
                  </p>
                  <p className="mt-1.5 text-xs text-muted-light">
                    Talk through goals, tool permissions and operating ownership
                    with our team.
                  </p>
                  <div className="mt-3">
                    <PrimaryButton
                      href="/contact?interest=consultation"
                      className="h-10 px-4 text-xs"
                    >
                      Book a Consultation
                    </PrimaryButton>
                  </div>
                </div>
              }
            />
          </aside>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-[var(--border-soft)] py-14 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-heading text-2xl font-semibold text-navy">
                Related Insights
              </h2>
              <Link
                href="/insights"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-tech-blue hover:text-navy"
              >
                View all insights
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {related.map((item, index) => (
                <InsightCard key={item.id} insight={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <LightCtaBar title="Design agentic systems that can be trusted in production" />
    </>
  );
}
