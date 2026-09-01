import {
  ClipboardList,
  Scale,
  GitBranch,
  Eye,
  Equal,
  UserCheck,
  Lock,
  Activity,
  FileSearch,
  Handshake,
  CheckCircle2,
  Compass,
  PenTool,
  Wrench,
  PlayCircle,
  ShieldCheck,
  Lightbulb,
  Search,
  BadgeCheck,
  Hammer,
  TestTube2,
  Rocket,
  Radar,
  Archive,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { GovernanceDashboardLazy } from "@/components/visualisations/GovernanceDashboardLazy";
import { mockupAssets } from "@/config/mockup-assets";
import { OriginalSculpture } from "@/components/visualisations/glass/OriginalSculpture";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "AI Governance",
  description:
    "Implement responsible AI governance with Agrayian — risk classification, model lifecycle control, explainability, human oversight, monitoring, audit and third-party AI risk management.",
  path: "/ai-governance",
});

const lifecycleStages: { label: string; icon: LucideIcon }[] = [
  { label: "Ideate", icon: Lightbulb },
  { label: "Assess", icon: Search },
  { label: "Approve", icon: BadgeCheck },
  { label: "Build", icon: Hammer },
  { label: "Validate", icon: TestTube2 },
  { label: "Deploy", icon: Rocket },
  { label: "Monitor", icon: Radar },
  { label: "Retire", icon: Archive },
];

const pillars: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Use-case inventory",
    description:
      "Centralize AI systems, owners, purposes, data sources and business criticality.",
    icon: ClipboardList,
  },
  {
    title: "Risk classification",
    description:
      "Classify inherent and residual risk across safety, compliance, ethics and operational impact.",
    icon: Scale,
  },
  {
    title: "Lifecycle controls",
    description:
      "Enforce stage-gate approvals, controls and evidence across the AI lifecycle.",
    icon: GitBranch,
  },
  {
    title: "Explainability",
    description:
      "Ensure transparency with model documentation, rationale and traceable decisions.",
    icon: Eye,
  },
  {
    title: "Bias & fairness",
    description:
      "Assess and mitigate bias with testing, fairness metrics and remediation actions.",
    icon: Equal,
  },
  {
    title: "Human oversight",
    description:
      "Define human-in-the-loop points, escalation paths and accountability.",
    icon: UserCheck,
  },
  {
    title: "Privacy & security",
    description:
      "Protect data and models with privacy-by-design and robust security controls.",
    icon: Lock,
  },
  {
    title: "Monitoring & incidents",
    description:
      "Continuously monitor performance shifts and misuse with incident management.",
    icon: Activity,
  },
  {
    title: "AI audit",
    description:
      "Maintain complete, immutable evidence for internal, external and regulatory audits.",
    icon: FileSearch,
  },
  {
    title: "Third-party AI risk",
    description:
      "Evaluate and monitor vendors and third-party models throughout the lifecycle.",
    icon: Handshake,
  },
];

const raciStages = [
  "Ideate",
  "Assess",
  "Approve",
  "Build",
  "Validate",
  "Deploy",
  "Monitor",
  "Retire",
] as const;

const raciRows: {
  role: string;
  cells: string[];
}[] = [
  {
    role: "Policy owners",
    cells: [
      "Set principles",
      "Define tiers",
      "Gate criteria",
      "Control standards",
      "Evidence rules",
      "Release policy",
      "Escalation rules",
      "Retention rules",
    ],
  },
  {
    role: "Use-case sponsors",
    cells: [
      "Propose intent",
      "Accept residual risk",
      "Sign business case",
      "Own outcomes",
      "Confirm fitness",
      "Go-live authority",
      "Review exceptions",
      "Approve retirement",
    ],
  },
  {
    role: "Delivery teams",
    cells: [
      "Scope options",
      "Prepare evidence",
      "Respond to review",
      "Implement controls",
      "Run evaluations",
      "Ship with logs",
      "Fix drift issues",
      "Decommission",
    ],
  },
  {
    role: "Control functions",
    cells: [
      "Advise early",
      "Challenge risk",
      "Independent review",
      "Assure design",
      "Verify testing",
      "Release challenge",
      "Incident oversight",
      "Audit evidence",
    ],
  },
  {
    role: "Operations",
    cells: [
      "Feasibility input",
      "Capacity view",
      "Support readiness",
      "Run tooling",
      "Ops validation",
      "Operate service",
      "Monitor & respond",
      "Exit runbooks",
    ],
  },
];

const engagementSteps: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Assess",
    description:
      "Understand your AI landscape, risk appetite, policies and maturity.",
    icon: Compass,
  },
  {
    title: "Design",
    description:
      "Design governance framework, controls, roles and operating model.",
    icon: PenTool,
  },
  {
    title: "Implement",
    description:
      "Implement tooling, workflows and integrations to operationalize governance.",
    icon: Wrench,
  },
  {
    title: "Operate",
    description:
      "Run governance, monitor performance and drive continuous improvement.",
    icon: PlayCircle,
  },
  {
    title: "Assure",
    description:
      "Assure with audits, reporting and evidence for stakeholders and regulators.",
    icon: ShieldCheck,
  },
];

function SectionHeading({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-3xl md:mb-12", className)}>
      <h2 className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-navy text-balance">
        {title}
      </h2>
      <span
        aria-hidden
        className="mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-brand to-tech-blue"
      />
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-light md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function LifecycleInfinityHero() {
  return (
    <GlassCard variant="glow" className="relative overflow-hidden p-4 md:p-6">
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#eef5fc] via-white to-[#e8f0fa] sm:aspect-[4/3]">
        <OriginalSculpture
          src={mockupAssets.originalGovernanceLoop}
          alt=""
          priority
          className="absolute inset-0 h-full w-full object-contain p-4 opacity-95 sm:p-6"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,transparent_40%,rgba(255,255,255,0.55)_100%)]"
        />

        <div className="absolute inset-x-3 top-3 grid grid-cols-4 gap-1.5 sm:inset-x-4 sm:top-4 sm:gap-2">
          {lifecycleStages.slice(0, 4).map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 rounded-lg border border-white/80 bg-white/85 px-2 py-1.5 shadow-sm backdrop-blur-md"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-tech-blue" aria-hidden />
              <span className="truncate text-[0.65rem] font-semibold text-navy sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute inset-x-3 bottom-3 grid grid-cols-4 gap-1.5 sm:inset-x-4 sm:bottom-4 sm:gap-2">
          {lifecycleStages.slice(4).map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 rounded-lg border border-white/80 bg-white/85 px-2 py-1.5 shadow-sm backdrop-blur-md"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-tech-blue" aria-hidden />
              <span className="truncate text-[0.65rem] font-semibold text-navy sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 px-1 text-[0.65rem] text-muted-light sm:text-xs">
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-brand" aria-hidden />
          Approval points
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden
            className="h-px w-5 border-t border-dashed border-tech-blue/60"
          />
          Telemetry &amp; feedback
        </span>
      </div>
    </GlassCard>
  );
}

export default async function AIGovernancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "AI Governance", path: "/ai-governance" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="AI Governance"
        title="AI Governance"
        subtitle="Responsible AI, made operational"
        description="Inventory AI systems, classify risk, enforce lifecycle controls and preserve evidence for leadership and audit."
        primaryCta={{
          href: "/contact?interest=consultation",
          label: "Book a Consultation",
        }}
        secondaryCta={{
          href: "#pillars",
          label: "Explore Governance",
        }}
        visual={<LifecycleInfinityHero />}
      />

      {/* 10 pillars */}
      <section
        id="pillars"
        className="scroll-mt-28 border-b border-[var(--border-soft)] py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Governance framework pillars" />
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <RevealItem key={pillar.title}>
                  <article className="h-full">
                    <GlassCard
                      variant="soft"
                      hover
                      className="flex h-full flex-col p-5"
                    >
                      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 bg-white/80 text-tech-blue shadow-sm">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 className="font-heading text-base font-semibold text-navy">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-light">
                        {pillar.description}
                      </p>
                    </GlassCard>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* RACI */}
      <section className="bg-bg-secondary/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Operating model: Who does what"
            description="Clear ownership across the AI lifecycle — from ideation through retirement — so policy, delivery and control functions stay aligned."
          />
          <Reveal>
            <GlassCard className="overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[64rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-soft)] bg-white/50">
                      <th className="sticky left-0 z-10 bg-white/90 px-4 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-muted-light backdrop-blur">
                        Role
                      </th>
                      {raciStages.map((stage) => (
                        <th
                          key={stage}
                          className="px-3 py-3 text-center font-heading text-xs font-semibold text-navy"
                        >
                          {stage}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {raciRows.map((row, rowIndex) => (
                      <tr
                        key={row.role}
                        className={cn(
                          "border-b border-[var(--border-soft)] last:border-0",
                          rowIndex % 2 === 0 ? "bg-white/30" : "bg-transparent",
                        )}
                      >
                        <th className="sticky left-0 z-10 bg-[inherit] px-4 py-3 text-left font-heading text-sm font-semibold text-navy backdrop-blur-sm">
                          <span className="relative inline-flex items-center gap-2">
                            <span
                              aria-hidden
                              className="h-1.5 w-1.5 rounded-full bg-tech-blue"
                            />
                            {row.role}
                          </span>
                        </th>
                        {row.cells.map((cell, cellIndex) => (
                          <td
                            key={`${row.role}-${raciStages[cellIndex]}`}
                            className="relative px-3 py-3 text-center text-xs leading-snug text-muted-light"
                          >
                            <span
                              aria-hidden
                              className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-tech-blue/10"
                            />
                            <span className="relative inline-block rounded-md border border-white/70 bg-white/70 px-2 py-1.5 shadow-sm backdrop-blur-sm">
                              {cell}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* Command centre */}
      <section className="border-y border-[var(--border-soft)] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="AI Governance command centre"
            description="A shared operating surface for inventory, risk posture, assessments and incidents."
          />
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-light)] bg-white/80 px-3 py-1 font-tech text-[0.6rem] uppercase tracking-[0.16em] text-muted-light">
            Illustrative preview · sample data only
          </p>
          <div className="on-dark-surface">
            <GovernanceDashboardLazy />
          </div>
        </div>
      </section>

      {/* Engagement model */}
      <section className="bg-bg-secondary/40 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Engagement model"
            description="Whether you need a diagnostic, a full framework or an operating command centre, Agrayian structures governance work as a practical delivery programme."
          />
          <RevealGroup className="grid gap-4 md:grid-cols-5">
            {engagementSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <RevealItem key={step.title}>
                  <div className="relative h-full">
                    {index < engagementSteps.length - 1 ? (
                      <span
                        aria-hidden
                        className="absolute -right-2 top-8 hidden h-px w-4 border-t border-dashed border-tech-blue/40 md:block"
                      />
                    ) : null}
                    <GlassCard variant="soft" className="h-full p-5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 bg-white/90 text-tech-blue shadow-sm">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-light">
                        {step.description}
                      </p>
                    </GlassCard>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <LightCtaBar
        title="Make responsible AI measurable, reviewable and operable."
        description="Strengthen trust, reduce risk and scale AI with confidence."
      />
    </>
  );
}
