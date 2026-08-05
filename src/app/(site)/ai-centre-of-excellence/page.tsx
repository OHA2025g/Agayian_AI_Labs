import { CmsBlocksOrFallback } from "@/components/cms/CmsBlocksOrFallback";
import { Section } from "@/components/layout/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CoeAssembly } from "@/components/sections/CoeAssembly";
import { CTASection } from "@/components/sections/CTASection";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaturityCurve } from "@/components/visualisations/MaturityCurve";
import { ProcessTimeline } from "@/components/visualisations/ProcessTimeline";
import type { TimelineStep } from "@/components/visualisations/ProcessTimeline";
import { FAQSection } from "@/components/sections/FAQSection";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Centre of Excellence",
  description:
    "Design and stand up an AI Centre of Excellence with Agrayian — strategy, governance, use-case portfolio, platform, delivery factory, talent and value realisation in one operating model.",
  path: "/ai-centre-of-excellence",
});

const whyNeed = [
  {
    title: "Fragmented ownership",
    description:
      "AI initiatives sit across IT, analytics, digital and business units with no shared intake, standards or accountability model.",
  },
  {
    title: "Pilot sprawl",
    description:
      "Successful demos rarely convert into production systems because delivery patterns, data access and governance are reinvented each time.",
  },
  {
    title: "Uneven risk control",
    description:
      "Some teams over-engineer controls while others ship ungoverned tools, creating inconsistency that boards and regulators notice.",
  },
  {
    title: "Weak reuse",
    description:
      "Prompts, components, evaluation methods and integrations remain local knowledge instead of becoming enterprise assets.",
  },
];

const deliveryChallenges = [
  "Use cases selected on enthusiasm rather than value, feasibility and risk.",
  "Data access and quality issues discovered too late in build cycles.",
  "No clear path from proof of concept to production ownership.",
  "Model and GenAI evaluation treated as optional rather than gated.",
  "Talent concentrated in a few specialists with limited enablement of business teams.",
  "Benefits claimed in business cases but not measured after go-live.",
];

const operatingModels = {
  centralised: {
    summary:
      "A single CoE owns standards, intake, architecture patterns, common platforms and most delivery capacity.",
    strengths: [
      "Strong consistency in methods, tooling and governance.",
      "Faster establishment of shared platforms and reusable components.",
      "Clear escalation path for high-risk use cases.",
    ],
    watchouts: [
      "Can become a bottleneck if demand outpaces capacity.",
      "Business units may feel distant from delivery ownership.",
      "Requires strong service management and transparent prioritisation.",
    ],
    bestFor:
      "Organisations early in AI maturity, with limited specialist talent or high regulatory sensitivity.",
  },
  federated: {
    summary:
      "Business units deliver AI within a common policy and platform envelope, while the CoE sets standards and assures outcomes.",
    strengths: [
      "Closer alignment to domain context and operational priorities.",
      "Scales throughput across multiple delivery teams.",
      "Encourages product ownership inside the business.",
    ],
    watchouts: [
      "Risk of divergence without strong assurance and platform guardrails.",
      "Harder to maintain consistent evaluation and monitoring discipline.",
      "Needs mature domain teams and clear CoE authority.",
    ],
    bestFor:
      "Larger enterprises with capable domain teams and an established platform and policy baseline.",
  },
  hybrid: {
    summary:
      "The CoE runs shared platforms, governance and high-complexity delivery, while federated teams execute approved patterns for lower-risk work.",
    strengths: [
      "Balances control with scale.",
      "Lets the CoE focus scarce expertise on high-risk and reusable foundations.",
      "Creates a clear progression path as maturity improves.",
    ],
    watchouts: [
      "Boundaries between central and federated work must be explicit.",
      "Funding and prioritisation can become political without a portfolio forum.",
      "Requires disciplined intake and pattern certification.",
    ],
    bestFor:
      "Most mid-to-large organisations seeking durable scale without losing oversight.",
  },
} as const;

const governanceStructure = [
  {
    title: "Executive AI steering",
    description:
      "Sets ambition, funding rules, risk appetite and portfolio priorities. Reviews value realisation and material escalations.",
  },
  {
    title: "AI CoE leadership",
    description:
      "Owns operating model, standards, platform roadmap, enablement and delivery factory performance.",
  },
  {
    title: "AI governance board",
    description:
      "Assesses risk-tiered use cases, approves high-impact systems, and oversees policy exceptions and incident themes.",
  },
  {
    title: "Domain product owners",
    description:
      "Sponsor use cases, define outcomes, accept releases and retain accountability for business decisions supported by AI.",
  },
  {
    title: "Control partners",
    description:
      "Risk, compliance, legal, security, privacy and audit embed proportionate controls into intake, build and monitoring.",
  },
];

const intakeSteps = [
  {
    title: "Capture",
    detail:
      "Structured intake covering problem statement, users, data sources, decision impact and proposed outcome measures.",
  },
  {
    title: "Score",
    detail:
      "Evaluate value, feasibility, data readiness, strategic fit and risk tier using a shared scoring model.",
  },
  {
    title: "Triage",
    detail:
      "Route quick wins, platform-dependent work and high-risk cases to the right delivery path and assurance depth.",
  },
  {
    title: "Decide",
    detail:
      "Portfolio forum approves, defers or declines with clear rationale, dependencies and success criteria.",
  },
];

const factoryPractices = [
  "Reusable discovery and design playbooks for analytics, GenAI and agentic workflows.",
  "Standard engineering templates for evaluation, logging, access control and human oversight.",
  "Cross-functional delivery squads that keep product, data, ML and controls connected.",
  "Definition of done that includes monitoring, documentation and handover ownership.",
  "Release readiness reviews before production promotion.",
];

const platformComponents = [
  {
    title: "Shared AI services",
    items: [
      "Model and LLM access patterns",
      "Retrieval and grounding services",
      "Evaluation harnesses",
      "Prompt and component registries",
    ],
  },
  {
    title: "Data and integration",
    items: [
      "Governed data products",
      "Feature and embedding stores where justified",
      "Secure connector patterns",
      "Lineage and access controls",
    ],
  },
  {
    title: "Delivery accelerators",
    items: [
      "Reference architectures",
      "UI and workflow patterns",
      "Observability baselines",
      "Security and privacy controls-as-code",
    ],
  },
];

const talentModel = [
  {
    role: "AI product and portfolio leads",
    focus: "Outcome ownership, sequencing and stakeholder alignment.",
  },
  {
    role: "Applied AI / ML engineers",
    focus: "Model development, evaluation, grounding and system integration.",
  },
  {
    role: "Data and platform engineers",
    focus: "Reliable pipelines, access patterns and production foundations.",
  },
  {
    role: "AI risk and governance specialists",
    focus: "Risk classification, policy controls, assurance evidence and audits.",
  },
  {
    role: "Domain translators",
    focus: "Bridge business process reality with technical design choices.",
  },
  {
    role: "Enablement coaches",
    focus: "Upskill federated teams on approved patterns and tools.",
  },
];

const valueMeasures = [
  {
    title: "Outcome metrics",
    description:
      "Decision quality, cycle time, exception closure, service coverage or cost-to-serve — defined per use case before build.",
  },
  {
    title: "Adoption metrics",
    description:
      "Active users, workflow completion rates and human override patterns that reveal whether the system is trusted in practice.",
  },
  {
    title: "Control metrics",
    description:
      "Assessment completion, monitoring coverage, incident closure and audit-evidence readiness across the portfolio.",
  },
  {
    title: "Reuse metrics",
    description:
      "Shared components consumed, patterns certified and time saved versus greenfield delivery.",
  },
];

const roadmapSteps: TimelineStep[] = [
  {
    title: "Assess",
    objective: "Understand maturity, demand and constraints.",
    activities: [
      "Stakeholder and landscape review",
      "Maturity diagnosis",
      "Priority friction mapping",
    ],
    deliverable: "CoE readiness assessment",
  },
  {
    title: "Design",
    objective: "Define the target operating model.",
    activities: [
      "Governance and intake design",
      "Platform and talent blueprint",
      "Funding and ownership model",
    ],
    deliverable: "CoE target design pack",
  },
  {
    title: "Mobilise",
    objective: "Stand up the first operating rhythm.",
    activities: [
      "Steering and governance forums",
      "Pilot portfolio selection",
      "Playbook and tooling baseline",
    ],
    deliverable: "Working CoE cadence",
  },
  {
    title: "Industrialise",
    objective: "Make delivery and reuse repeatable.",
    activities: [
      "Delivery factory hardening",
      "Platform component packaging",
      "Enablement of domain teams",
    ],
    deliverable: "Reusable delivery system",
  },
  {
    title: "Scale",
    objective: "Expand portfolio impact with control.",
    activities: [
      "Federated pattern rollout",
      "Value tracking across use cases",
      "Continuous assurance improvement",
    ],
    deliverable: "Scaled CoE operating model",
  },
];

const engagementOptions = [
  {
    title: "CoE diagnostic",
    description:
      "A focused assessment of maturity, operating gaps, portfolio readiness and recommended sequencing.",
  },
  {
    title: "CoE design and stand-up",
    description:
      "Operating-model design, governance forums, intake process, playbooks and mobilisation support.",
  },
  {
    title: "Delivery factory enablement",
    description:
      "Build the methods, squads, evaluation practices and release controls that turn approved use cases into production systems.",
  },
  {
    title: "Platform and governance partnership",
    description:
      "Ongoing support for reusable platform components, assurance evidence and portfolio performance.",
  },
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm text-muted-dark">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function AICentreOfExcellencePage() {
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

      <Section
        eyebrow="AI Centre of Excellence"
        title="An operating model that makes AI repeatable"
        description="Agrayian helps organisations design and stand up AI Centres of Excellence that connect strategy, governance, platforms, talent and delivery — so use cases stop restarting from zero."
        className="pt-10 md:pt-16"
        cta={
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href="/contact">Book a Consultation</PrimaryButton>
            <SecondaryButton href="/ai-governance">
              Explore AI Governance
            </SecondaryButton>
          </div>
        }
      >
        <CoeAssembly />
      </Section>

      <Section
        tone="elevated"
        eyebrow="Definition"
        title="What an AI Centre of Excellence is"
        description="An AI CoE is not a slide deck or a tool catalogue. It is the organisational system that decides what gets built, how it is governed, which platforms are reused, who owns outcomes and how value is evidenced."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {[
            "A shared operating rhythm for intake, prioritisation and delivery.",
            "A control framework that scales with risk rather than blocking progress.",
            "A reuse engine for data products, components, methods and skills.",
          ].map((item) => (
            <RevealItem key={item}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-primary/50 p-5 text-sm leading-relaxed text-muted-dark">
                {item}
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        eyebrow="Why it matters"
        title="Why organisations need an AI CoE"
        description="Without a CoE, AI investment fragments into disconnected experiments. With one, leadership gains a governed pathway from ambition to production outcomes."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-2">
          {whyNeed.map((item) => (
            <RevealItem key={item.title}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-elevated/40 p-6">
                <h3 className="font-heading text-lg font-semibold text-text-on-dark">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-dark">
                  {item.description}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        tone="elevated"
        eyebrow="Delivery friction"
        title="Common AI delivery challenges"
        description="Most AI programmes stall for operational reasons, not model novelty. The CoE exists to remove these recurring failure modes."
      >
        <Reveal>
          <ul className="grid gap-3 md:grid-cols-2">
            {deliveryChallenges.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 bg-bg-primary/50 px-4 py-3 text-sm text-muted-dark"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section
        eyebrow="Framework"
        title="Direct, control and deliver"
        description="Nine interconnected pillars grouped by how they steer investment, assure outcomes and industrialise delivery."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Direct",
              text: "Business strategy, portfolio priorities and value realisation set where AI effort should concentrate.",
            },
            {
              title: "Control",
              text: "AI governance, data foundations and monitoring ensure systems remain safe, auditable and operable.",
            },
            {
              title: "Deliver",
              text: "Platform, delivery factory and talent systems turn approved demand into reusable production capability.",
            },
          ].map((item) => (
            <RevealItem key={item.title}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-elevated/40 p-5">
                <Badge variant="cyan">{item.title}</Badge>
                <p className="mt-3 text-sm leading-relaxed text-muted-dark">
                  {item.text}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        tone="elevated"
        eyebrow="Operating models"
        title="CoE operating models"
        description="There is no single correct structure. Agrayian helps you choose and operationalise the model that matches maturity, risk posture and delivery capacity."
      >
        <Tabs defaultValue="hybrid">
          <TabsList>
            <TabsTrigger value="centralised">Centralised</TabsTrigger>
            <TabsTrigger value="federated">Federated</TabsTrigger>
            <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
          </TabsList>
          {(
            Object.entries(operatingModels) as [
              keyof typeof operatingModels,
              (typeof operatingModels)[keyof typeof operatingModels],
            ][]
          ).map(([key, model]) => (
            <TabsContent key={key} value={key}>
              <div className="rounded-xl border border-white/10 bg-bg-primary/50 p-6">
                <p className="text-base leading-relaxed text-muted-dark">
                  {model.summary}
                </p>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <div>
                    <h3 className="font-heading text-base font-semibold">
                      Strengths
                    </h3>
                    <BulletList items={[...model.strengths]} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold">
                      Watch-outs
                    </h3>
                    <BulletList items={[...model.watchouts]} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold">
                      Best for
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-dark">
                      {model.bestFor}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Section>

      <Section
        eyebrow="Accountability"
        title="Governance structure"
        description="Clear forums and roles prevent AI from becoming either unowned experimentation or process theatre."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {governanceStructure.map((item) => (
            <RevealItem key={item.title}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-elevated/40 p-5">
                <h3 className="font-heading text-lg font-semibold text-text-on-dark">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-dark">
                  {item.description}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        tone="elevated"
        eyebrow="Portfolio"
        title="Use-case intake and prioritisation"
        description="A disciplined intake process protects scarce capacity and forces early clarity on value, feasibility and risk."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {intakeSteps.map((step, index) => (
            <RevealItem key={step.title}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-primary/50 p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand-hover">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-dark">
                  {step.detail}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        eyebrow="Delivery"
        title="AI delivery factory"
        description="The delivery factory turns approved demand into production systems through shared methods, squads and release discipline."
      >
        <Reveal>
          <ul className="grid gap-3 md:grid-cols-2">
            {factoryPractices.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 bg-bg-elevated/40 px-4 py-3 text-sm text-muted-dark"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section
        tone="elevated"
        eyebrow="Foundations"
        title="Platform and reusable components"
        description="Reusable services and patterns reduce one-off engineering and keep governance controls consistent across use cases."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {platformComponents.map((group) => (
            <RevealItem key={group.title}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-primary/50 p-5">
                <h3 className="font-heading text-lg font-semibold">
                  {group.title}
                </h3>
                <BulletList items={group.items} />
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        eyebrow="People"
        title="Talent and capability model"
        description="An AI CoE succeeds when scarce specialists are multiplied through clear roles, enablement and federated competence."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {talentModel.map((item) => (
            <RevealItem key={item.role}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-elevated/40 p-5">
                <h3 className="font-heading text-base font-semibold text-text-on-dark">
                  {item.role}
                </h3>
                <p className="mt-2 text-sm text-muted-dark">{item.focus}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        tone="elevated"
        eyebrow="Measurement"
        title="Value measurement"
        description="Value is designed into the portfolio, not claimed after the fact. Each use case needs outcome, adoption and control measures before build begins."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-2">
          {valueMeasures.map((item) => (
            <RevealItem key={item.title}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-primary/50 p-6">
                <h3 className="font-heading text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-dark">
                  {item.description}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        eyebrow="Maturity"
        title="AI maturity model"
        description="Agrayian uses a five-stage maturity curve to locate current capability and sequence the next practical leap — without forcing premature scale."
      >
        <MaturityCurve />
      </Section>

      <Section
        tone="elevated"
        eyebrow="Roadmap"
        title="Implementation roadmap"
        description="A practical sequence from diagnosis to a scaled operating model, adapted to your current maturity and constraints."
      >
        <ProcessTimeline steps={roadmapSteps} />
      </Section>

      <Section
        eyebrow="Engage"
        title="Engagement options"
        description="Start with diagnosis, design a durable CoE, or partner through factory and platform build-out."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-2">
          {engagementOptions.map((option) => (
            <RevealItem key={option.title}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-elevated/40 p-6">
                <h3 className="font-heading text-lg font-semibold text-text-on-dark">
                  {option.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-dark">
                  {option.description}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-8">
          <PrimaryButton href="/contact">Discuss CoE Engagement</PrimaryButton>
        </div>
      </Section>

      <Section tone="elevated">
        <FAQSection
          items={[
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
          ]}
        />
      </Section>

      <CTASection
        title="Build an AI CoE that delivers governed, measurable outcomes"
        secondaryHref="/ai-governance"
        secondaryLabel="Explore AI Governance"
      />
    </>
    </CmsBlocksOrFallback>
  );
}
