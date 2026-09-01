import {
  Boxes,
  Building2,
  ClipboardList,
  Flag,
  Gauge,
  Layers,
  Rocket,
  Scale,
  Shield,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import { CmsBlocksOrFallback } from "@/components/cms/CmsBlocksOrFallback";
import { FAQSection } from "@/components/sections/FAQSection";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProcessFlow } from "@/components/ui/ProcessFlow";
import {
  CoeHeroPanel,
  CoeLayerTower,
} from "@/components/visualisations/glass/CoeHeroPanel";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "AI Centre of Excellence",
  description:
    "Design and stand up an AI Centre of Excellence with Agrayian — strategy, governance, use-case portfolio, platform, delivery factory, talent and value realisation in one operating model.",
  path: "/ai-centre-of-excellence",
});

const coreOutcomes = [
  "Aligned strategy and priorities",
  "Governed AI by design",
  "Reusable platforms and assets",
  "Faster, safer delivery",
  "Measurable business impact",
] as const;

const whatPillars = [
  {
    title: "Enterprise mandate and resourcing",
    icon: Building2,
  },
  {
    title: "Standards, patterns and guardrails",
    icon: Scale,
  },
  {
    title: "Reusable assets and platforms",
    icon: Boxes,
  },
  {
    title: "Outcome-focused delivery",
    icon: Target,
  },
] as const;

const whyNeed = [
  {
    title: "Fragmented ownership",
    description:
      "Initiatives sit across IT, analytics and business units with no shared intake or accountability.",
    icon: Users,
  },
  {
    title: "Pilot sprawl",
    description:
      "Demos rarely reach production because delivery patterns are reinvented each time.",
    icon: Layers,
  },
  {
    title: "Uneven risk control",
    description:
      "Some teams over-control while others ship ungoverned tools — boards notice the gap.",
    icon: Shield,
  },
  {
    title: "Weak reuse",
    description:
      "Prompts, components and evaluation methods stay local instead of becoming enterprise assets.",
    icon: Workflow,
  },
] as const;

const operatingLayers = [
  {
    id: "business-strategy",
    title: "Business strategy",
    description:
      "Leadership ambition, portfolio priorities and funding rules that set where AI effort concentrates.",
  },
  {
    id: "governance",
    title: "Governance",
    description:
      "Risk tiers, approval gates and assurance evidence that keep innovation aligned with accountability.",
  },
  {
    id: "use-case-portfolio",
    title: "Use-case portfolio",
    description:
      "Structured intake, scoring and prioritisation that protect capacity and force early clarity.",
  },
  {
    id: "data-foundation",
    title: "Data foundation",
    description:
      "Governed data products, access patterns and quality rules that underpin production systems.",
  },
  {
    id: "ai-platform",
    title: "AI platform",
    description:
      "Shared model access, retrieval, evaluation harnesses and component registries.",
  },
  {
    id: "delivery-factory",
    title: "Delivery factory",
    description:
      "Playbooks, squads and release discipline that turn approved demand into production capability.",
  },
  {
    id: "talent-capability",
    title: "Talent & capability",
    description:
      "Clear roles, enablement and federated competence that multiply scarce specialists.",
  },
  {
    id: "operations-monitoring",
    title: "Operations & monitoring",
    description:
      "Production observation for drift, misuse and control failures with defined incident paths.",
  },
  {
    id: "value-realisation",
    title: "Value realisation",
    description:
      "Outcome, adoption and control measures designed per use case — not claimed after go-live.",
  },
] as const;

const ideaToImpact = [
  {
    title: "Capture",
    description: "Collect ideas from across the organisation.",
    icon: ClipboardList,
  },
  {
    title: "Score",
    description: "Assess value, feasibility, risk and readiness.",
    icon: Gauge,
  },
  {
    title: "Triage",
    description: "Prioritise and shape promising opportunities.",
    icon: Workflow,
  },
  {
    title: "Decide",
    description: "Fund, build, defer or retire with confidence.",
    icon: Target,
  },
] as const;

const pillars = [
  {
    title: "Direct",
    description:
      "Set strategy, portfolio and standards. Ensure alignment to business outcomes.",
    icon: Flag,
    accent: "brand" as const,
  },
  {
    title: "Control",
    description:
      "Manage risk, compliance and quality. Enable safe and responsible AI.",
    icon: Shield,
    accent: "blue" as const,
  },
  {
    title: "Deliver",
    description:
      "Accelerate delivery and adoption. Drive measurable business value.",
    icon: Rocket,
    accent: "blue" as const,
  },
] as const;

const faqs = [
  {
    question: "What is an AI Centre of Excellence?",
    answer:
      "An AI CoE is the organisational system that decides what gets built, how it is governed, which platforms are reused, who owns outcomes and how value is evidenced. It is not a slide deck or a tool catalogue.",
  },
  {
    question: "How is the CoE different from a data or analytics team?",
    answer:
      "Data and analytics teams deliver domain solutions. A CoE sets the shared operating rhythm — intake, standards, platforms, enablement and assurance — so those teams and others can deliver repeatably under common controls.",
  },
  {
    question: "How long does an AI CoE design engagement typically take?",
    answer:
      "Design engagements usually run in focused waves covering assessment, operating-model design and roadmap definition. Duration depends on organisational scale and stakeholder complexity.",
  },
  {
    question: "Can a CoE work in government programme contexts?",
    answer:
      "Yes. We adapt intake, governance evidence and delivery patterns for public-sector accountability, multi-department coordination and programme oversight needs.",
  },
  {
    question: "Do you operate the CoE or only design it?",
    answer:
      "Both are available. Engagements may be advisory only, build-operate-transfer, or managed CoE support depending on internal capacity and readiness.",
  },
  {
    question: "Which operating model should we choose?",
    answer:
      "Centralised, federated and hybrid models each fit different maturity and risk postures. Most mid-to-large organisations land on a hybrid design: shared platforms and governance centrally, with federated delivery on approved patterns.",
  },
];

export default async function AICentreOfExcellencePage() {
  const leftLayers = operatingLayers.slice(0, 5);
  const rightLayers = operatingLayers.slice(5);

  return (
    <CmsBlocksOrFallback slug="coe-page">
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbSchema([
                { name: "Home", path: "/" },
                {
                  name: "AI Centre of Excellence",
                  path: "/ai-centre-of-excellence",
                },
              ]),
            ),
          }}
        />

        <PageHero
          eyebrow="AI Centre of Excellence"
          title="AI Centre of Excellence"
          subtitle="An operating model that makes AI repeatable"
          description="Connect strategy, governance, platforms, talent and delivery so every use case stops restarting from zero."
          primaryCta={{
            href: "/contact?interest=consultation",
            label: "Book a Consultation",
          }}
          secondaryCta={{
            href: "#operating-model",
            label: "Explore the Operating Model",
          }}
          visual={<CoeHeroPanel outcomes={coreOutcomes} />}
        />

        <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 md:space-y-24 md:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <section id="what" className="scroll-mt-28">
                <SectionTitle>What an AI CoE is</SectionTitle>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-light">
                  An AI Centre of Excellence is a cross-functional capability
                  with mandate, standards, reusable platforms and
                  outcome-focused delivery — not a reporting line or a tool
                  catalogue alone.
                </p>
                <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2">
                  {whatPillars.map((item) => {
                    const Icon = item.icon;
                    return (
                      <RevealItem key={item.title}>
                        <GlassCard
                          variant="soft"
                          className="flex h-full flex-col items-start gap-3 p-5"
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 bg-white/80 text-tech-blue shadow-sm">
                            <Icon className="h-5 w-5" aria-hidden />
                          </span>
                          <p className="text-sm font-medium leading-snug text-navy">
                            {item.title}
                          </p>
                        </GlassCard>
                      </RevealItem>
                    );
                  })}
                </RevealGroup>
              </section>
            </Reveal>

            <Reveal>
              <section id="why" className="scroll-mt-28">
                <SectionTitle>Why organisations need an AI CoE</SectionTitle>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-light">
                  Without a CoE, AI investment fragments into inconsistent,
                  costly experiments. With one, leadership gains a governed
                  pathway from ambition to production outcomes.
                </p>
                <div className="mt-8">
                  <ProcessFlow steps={[...whyNeed]} />
                </div>
              </section>
            </Reveal>
          </div>

          <Reveal>
            <section id="operating-model" className="scroll-mt-28">
              <SectionTitle>The AI CoE operating model</SectionTitle>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-light">
                Nine integrated layers that turn strategy into measurable
                value.
              </p>

              <GlassCard
                variant="glow"
                className="relative mt-8 overflow-hidden p-6 md:p-8"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(20,159,230,0.1),transparent_55%)]"
                />
                <div className="relative grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                  <ol className="space-y-3">
                    {leftLayers.map((layer) => {
                      const index = operatingLayers.findIndex(
                        (item) => item.id === layer.id,
                      );
                      return (
                        <li key={layer.id}>
                          <article className="rounded-2xl border border-[var(--border-light)] bg-white/80 p-4">
                            <div className="flex gap-3">
                              <span className="font-tech text-[0.7rem] font-semibold text-cyan">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <div>
                                <h3 className="font-heading text-sm font-semibold text-navy">
                                  {layer.title}
                                </h3>
                                <p className="mt-1 text-xs leading-relaxed text-muted-light">
                                  {layer.description}
                                </p>
                              </div>
                            </div>
                          </article>
                        </li>
                      );
                    })}
                  </ol>

                  <div className="flex flex-col items-center gap-4">
                    <CoeLayerTower />
                    <GlassCard className="max-w-[14rem] p-4 text-center">
                      <p className="font-heading text-sm font-semibold text-navy">
                        One model. End-to-end impact.
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-light">
                        Each layer only works when the others are present —
                        strategy without delivery, or platforms without
                        governance, stall.
                      </p>
                    </GlassCard>
                  </div>

                  <ol className="space-y-3">
                    {rightLayers.map((layer) => {
                      const index = operatingLayers.findIndex(
                        (item) => item.id === layer.id,
                      );
                      return (
                        <li key={layer.id}>
                          <article className="rounded-2xl border border-[var(--border-light)] bg-white/80 p-4">
                            <div className="flex gap-3">
                              <span className="font-tech text-[0.7rem] font-semibold text-cyan">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <div>
                                <h3 className="font-heading text-sm font-semibold text-navy">
                                  {layer.title}
                                </h3>
                                <p className="mt-1 text-xs leading-relaxed text-muted-light">
                                  {layer.description}
                                </p>
                              </div>
                            </div>
                          </article>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </GlassCard>
            </section>
          </Reveal>

          <Reveal>
            <section id="idea-to-impact" className="scroll-mt-28">
              <SectionTitle>From idea to impact</SectionTitle>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-light">
                A disciplined intake process protects scarce capacity and
                forces early clarity on value, feasibility and risk.
              </p>
              <div className="mt-8">
                <ProcessFlow steps={[...ideaToImpact]} />
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section id="pillars" className="scroll-mt-28">
              <SectionTitle>The CoE works on three pillars</SectionTitle>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-light">
                Direct, Control and Deliver — how the nine layers steer
                investment, assure outcomes and industrialise delivery.
              </p>
              <RevealGroup className="mt-8 grid gap-4 md:grid-cols-3">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <RevealItem key={pillar.title}>
                      <GlassCard hover className="flex h-full flex-col gap-4 p-6">
                        <span
                          className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 bg-white/90 shadow-sm",
                            pillar.accent === "brand"
                              ? "text-brand"
                              : "text-tech-blue",
                          )}
                        >
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <h3 className="font-heading text-xl font-semibold text-navy">
                          {pillar.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-light">
                          {pillar.description}
                        </p>
                      </GlassCard>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </section>
          </Reveal>

          <Reveal>
            <section
              id="faq"
              className="scroll-mt-28 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
            >
              <div>
                <SectionTitle>Frequently asked questions</SectionTitle>
                <div className="relative mt-10 hidden h-40 lg:block" aria-hidden>
                  <svg
                    viewBox="0 0 280 140"
                    className="h-full w-full text-tech-blue/50"
                  >
                    <path
                      d="M8 90 C60 20, 120 130, 180 50 S250 20, 272 70"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="4 7"
                      strokeWidth="1.5"
                    />
                    <circle cx="8" cy="90" r="4" fill="#ff4d5e" />
                    <circle cx="180" cy="50" r="4" fill="#149fe6" />
                  </svg>
                  <span className="absolute right-6 top-2 flex h-16 w-16 items-center justify-center rounded-full border border-sky/40 bg-sky/20 font-heading text-3xl font-semibold text-tech-blue">
                    ?
                  </span>
                </div>
              </div>
              <FAQSection items={faqs} title="" />
            </section>
          </Reveal>
        </div>

        <LightCtaBar
          title="Build an AI CoE that delivers governed, measurable outcomes."
          description="Align strategy, platforms, talent and assurance so every use case travels a repeatable path from intake to impact."
        />
      </>
    </CmsBlocksOrFallback>
  );
}
