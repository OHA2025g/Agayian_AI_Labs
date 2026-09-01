import {
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  CheckCircle2,
  CloudUpload,
  Code2,
  Eye,
  FileSearch,
  GraduationCap,
  Handshake,
  HelpCircle,
  Landmark,
  Layers,
  Lock,
  Shield,
  Target,
  TrendingUp,
  Users,
  UserCog,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { AgrayianMark } from "@/components/layout/AgrayianMark";
import { OriginalSculpture } from "@/components/visualisations/glass/OriginalSculpture";
import { mockupAssets } from "@/config/mockup-assets";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { ProcessFlow } from "@/components/ui/ProcessFlow";
import { companyIntro, companyValues } from "@/data/company";
import { getPublishedGlobal } from "@/lib/cms/published";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Company",
  description:
    "Learn about Agrayian AI Labs — our vision, mission, values and commitment to responsible AI for enterprises and governments.",
  path: "/company",
});

type CompanyGlobal = {
  vision?: string;
  mission?: string;
  introduction?: string;
  whyAgrayian?: { text?: string }[] | string[];
  deliveryPhilosophy?: string[] | string;
  responsibleAiCommitment?: string;
  technologyPhilosophy?: string;
  careersCopy?: string;
  partnerEcosystemCopy?: string;
  values?: { title?: string; description?: string }[];
};

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) =>
    typeof item === "string"
      ? item
      : String((item as { text?: string }).text ?? ""),
  );
}

const principleIcons: LucideIcon[] = [
  UserCog,
  Shield,
  BarChart3,
  Users,
  Lock,
  CheckCircle2,
  GraduationCap,
];

const howWeWork = [
  {
    title: "Understand the challenge",
    description:
      "Clarify the decision, outcome and organisational context before selecting methods.",
    icon: HelpCircle,
  },
  {
    title: "Assess & design",
    description:
      "Map readiness, data, risk and operating constraints into a governed delivery path.",
    icon: FileSearch,
  },
  {
    title: "Build & validate",
    description:
      "Engineer systems with evaluation, evidence and human oversight built in.",
    icon: Code2,
  },
  {
    title: "Deploy & integrate",
    description:
      "Connect into existing workflows, platforms and accountability structures.",
    icon: CloudUpload,
  },
  {
    title: "Operate & improve",
    description:
      "Monitor adoption, decision quality and risk signals — then improve with discipline.",
    icon: TrendingUp,
  },
] as const;

const impactLeft = [
  {
    title: "Public systems",
    description:
      "Stronger service delivery and oversight where public outcomes matter.",
    icon: Landmark,
  },
  {
    title: "Enterprise",
    description:
      "Operational AI that fits auditability, scale and business ownership.",
    icon: Building2,
  },
  {
    title: "Society",
    description:
      "Programmes designed around people, accountability and measurable good.",
    icon: Users,
  },
] as const;

const impactRight = [
  {
    title: "Better decisions",
    description:
      "Evidence-backed choices with clear ownership at the point of action.",
    icon: Target,
  },
  {
    title: "Operational excellence",
    description:
      "Reusable platforms and workflows that move beyond one-off pilots.",
    icon: Layers,
  },
  {
    title: "Trust & transparency",
    description:
      "Explainability, privacy and oversight as defaults — not afterthoughts.",
    icon: Shield,
  },
] as const;

function SectionAccent({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "mb-3 inline-block h-1 w-10 rounded-full bg-gradient-to-r from-tech-blue to-brand",
        className,
      )}
    />
  );
}

function PairConnector() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden w-[min(12%,4.5rem)] -translate-x-1/2 -translate-y-1/2 md:block"
    >
      <div className="relative h-px w-full border-t border-dashed border-tech-blue/40">
        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_0_3px_rgba(255,77,94,0.18)]" />
      </div>
    </div>
  );
}

function CompanyHubVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-[#dce8f2] bg-white lg:max-w-none">
      <OriginalSculpture
        src={mockupAssets.originalCompanyHub}
        alt="Glass hub connecting public systems, enterprise and human impact"
        priority
      />
      <div className="pointer-events-none absolute left-1/2 top-[48%] z-10 h-11 w-[3.75rem] -translate-x-1/2 -translate-y-1/2">
        <AgrayianMark variant="light" />
      </div>
      <span className="absolute left-4 top-6 rounded-lg border border-white/85 bg-white/90 px-2.5 py-1.5 text-[0.65rem] font-semibold text-navy shadow-sm">
        Public systems
      </span>
      <span className="absolute right-4 top-6 rounded-lg border border-white/85 bg-white/90 px-2.5 py-1.5 text-[0.65rem] font-semibold text-navy shadow-sm">
        Human impact
      </span>
      <span className="absolute left-1/2 top-4 -translate-x-1/2 rounded-lg border border-white/85 bg-white/90 px-2.5 py-1.5 text-[0.65rem] font-semibold text-navy shadow-sm">
        Enterprise
      </span>
    </div>
  );
}

function CubeGlyph({ variant }: { variant: "simple" | "platform" | "puzzle" }) {
  const shapes =
    variant === "simple"
      ? [
          "M40 28 L64 40 L40 52 L16 40 Z",
          "M16 40 L40 52 L40 68 L16 56 Z",
          "M40 52 L64 40 L64 56 L40 68 Z",
        ]
      : variant === "platform"
        ? [
            "M28 24 L52 36 L28 48 L4 36 Z",
            "M4 36 L28 48 L28 60 L4 48 Z",
            "M28 48 L52 36 L52 48 L28 60 Z",
            "M48 20 L72 32 L48 44 L24 32 Z",
            "M52 40 L76 28 L76 40 L52 52 Z",
          ]
        : [
            "M32 20 L52 30 L32 40 L12 30 Z",
            "M12 30 L32 40 L32 54 L12 44 Z",
            "M32 40 L52 30 L52 44 L32 54 Z",
            "M52 34 L72 44 L52 54 L32 44 Z",
            "M52 54 L72 44 L72 58 L52 68 Z",
          ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 80 76"
      className="h-16 w-16 shrink-0 text-tech-blue sm:h-[4.5rem] sm:w-[4.5rem]"
    >
      {shapes.map((d, i) => (
        <path
          key={i}
          d={d}
          fill={
            i % 3 === 0
              ? "rgba(59,130,246,0.35)"
              : i % 3 === 1
                ? "rgba(59,130,246,0.18)"
                : "rgba(30,58,95,0.22)"
          }
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

function ImpactHexDiagram() {
  return (
    <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
      <ul className="space-y-5 lg:space-y-8 lg:pr-4 lg:text-right">
        {impactLeft.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title} className="flex gap-3 lg:flex-row-reverse">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-white/85 text-tech-blue shadow-sm">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="font-heading text-base font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-light">
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="relative mx-auto flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="hexGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff4d5e" stopOpacity="0.35" />
              <stop offset="55%" stopColor="#149fe6" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#149fe6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hexStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#ff4d5e" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="92" fill="url(#hexGlow)" />
          {/* Outer hex */}
          <polygon
            points="100,18 168,55 168,145 100,182 32,145 32,55"
            fill="rgba(255,255,255,0.55)"
            stroke="url(#hexStroke)"
            strokeWidth="2"
          />
          {/* Inner hex */}
          <polygon
            points="100,48 145,72 145,128 100,152 55,128 55,72"
            fill="rgba(255,255,255,0.75)"
            stroke="rgba(59,130,246,0.35)"
            strokeWidth="1.5"
          />
          {/* Dashed spokes */}
          <g
            stroke="rgba(59,130,246,0.35)"
            strokeWidth="1.2"
            strokeDasharray="3 4"
            fill="none"
          >
            <line x1="100" y1="100" x2="32" y2="55" />
            <line x1="100" y1="100" x2="32" y2="145" />
            <line x1="100" y1="100" x2="100" y2="18" />
            <line x1="100" y1="100" x2="168" y2="55" />
            <line x1="100" y1="100" x2="168" y2="145" />
            <line x1="100" y1="100" x2="100" y2="182" />
          </g>
          <circle cx="100" cy="100" r="28" fill="rgba(255,77,94,0.12)" />
          <circle
            cx="100"
            cy="100"
            r="22"
            fill="rgba(255,255,255,0.95)"
            stroke="rgba(255,77,94,0.45)"
            strokeWidth="1.5"
          />
        </svg>
        <div className="relative z-10 h-12 w-16 sm:h-14 sm:w-[4.5rem]">
          <AgrayianMark variant="light" />
        </div>
      </div>

      <ul className="space-y-5 lg:space-y-8 lg:pl-4">
        {impactRight.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title} className="flex gap-3">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-white/85 text-tech-blue shadow-sm">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="font-heading text-base font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-light">
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default async function CompanyPage() {
  const doc = await getPublishedGlobal<CompanyGlobal>("company-page");
  const intro = {
    vision: doc?.vision || companyIntro.vision,
    mission: doc?.mission || companyIntro.mission,
    introduction: doc?.introduction || companyIntro.introduction,
    whyAgrayian: doc?.whyAgrayian
      ? asStringList(doc.whyAgrayian)
      : companyIntro.whyAgrayian,
    deliveryPhilosophy: doc?.deliveryPhilosophy
      ? asStringList(
          Array.isArray(doc.deliveryPhilosophy)
            ? doc.deliveryPhilosophy
            : [doc.deliveryPhilosophy],
        )
      : companyIntro.deliveryPhilosophy,
    responsibleAiCommitment:
      doc?.responsibleAiCommitment || companyIntro.responsibleAiCommitment,
    technologyPhilosophy:
      doc?.technologyPhilosophy || companyIntro.technologyPhilosophy,
    careers: doc?.careersCopy || companyIntro.careers,
    partnerEcosystem:
      doc?.partnerEcosystemCopy || companyIntro.partnerEcosystem,
  };
  const values =
    doc?.values?.length && doc.values.every((v) => v.title)
      ? doc.values.map((v) => ({
          title: String(v.title),
          description: String(v.description ?? ""),
        }))
      : companyValues;

  const partnershipDelivery =
    intro.whyAgrayian[0] ||
    "We connect strategy, governance and delivery so programmes move from ambition to production with clear ownership.";

  const deliveryRows = [
    {
      title: "Responsible AI",
      body: intro.responsibleAiCommitment,
      icon: Shield,
      cube: "simple" as const,
    },
    {
      title: "Technology",
      body: intro.technologyPhilosophy,
      icon: Layers,
      cube: "platform" as const,
    },
    {
      title: "Partnership",
      body: partnershipDelivery,
      icon: Handshake,
      cube: "puzzle" as const,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Company", path: "/company" },
            ]),
          ),
        }}
      />

      <PageHero
        title="Company"
        subtitle="Responsible intelligence for stronger organisations and public systems."
        description={intro.introduction}
        primaryCta={{
          href: "/contact?interest=consultation",
          label: "Book a Consultation",
        }}
        secondaryCta={{
          href: "/capabilities",
          label: "Explore what we do",
        }}
        visual={<CompanyHubVisual />}
      />

      {/* 2. Vision / Mission */}
      <section className="relative py-14 md:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative grid gap-5 md:grid-cols-2">
              <PairConnector />
              <GlassCard className="p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 bg-white/85 text-tech-blue shadow-sm">
                    <Eye className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="font-heading text-xl font-semibold text-navy">
                    Vision
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-light md:text-base">
                  {intro.vision}
                </p>
              </GlassCard>
              <GlassCard className="p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 bg-white/85 text-brand shadow-sm">
                    <Target className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="font-heading text-xl font-semibold text-navy">
                    Mission
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-light md:text-base">
                  {intro.mission}
                </p>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Principles */}
      <section className="relative border-t border-[var(--border-soft)] bg-bg-secondary/45 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-tight text-navy">
              Our principles
            </h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 xl:gap-4">
            {values.map((value, index) => {
              const Icon = principleIcons[index % principleIcons.length];
              return (
                <RevealItem key={value.title}>
                  <div className="relative h-full xl:px-1">
                    {index < values.length - 1 ? (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute right-0 top-5 hidden h-px w-full translate-x-1/2 border-t border-dashed border-tech-blue/30 xl:block"
                      >
                        <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand" />
                      </div>
                    ) : null}
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 bg-white/85 text-tech-blue shadow-sm">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-3 font-heading text-sm font-semibold leading-snug text-navy">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-light">
                      {value.description}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* 4. How we work */}
      <section className="relative border-t border-[var(--border-soft)] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionAccent />
            <h2 className="font-heading text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-tight text-navy">
              How we work
            </h2>
          </Reveal>
          <div className="mt-12">
            <ProcessFlow steps={[...howWeWork]} />
          </div>
        </div>
      </section>

      {/* 5. Delivery philosophy */}
      <section className="relative border-t border-[var(--border-soft)] bg-bg-secondary/40 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionAccent />
            <h2 className="font-heading text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-tight text-navy">
              Our delivery philosophy
            </h2>
          </Reveal>

          {intro.deliveryPhilosophy.length > 0 ? (
            <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-2">
              {intro.deliveryPhilosophy.map((item) => (
                <RevealItem key={item}>
                  <GlassCard variant="soft" className="h-full p-4 text-sm text-muted-light">
                    {item}
                  </GlassCard>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : null}

          <RevealGroup className="mt-10 space-y-5">
            {deliveryRows.map((row) => {
              const Icon = row.icon;
              return (
                <RevealItem key={row.title}>
                  <GlassCard className="overflow-hidden p-5 md:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 flex-1 gap-4">
                        <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-white/85 text-tech-blue shadow-sm">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-heading text-lg font-semibold text-navy">
                            {row.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-light">
                            {row.body}
                          </p>
                        </div>
                      </div>
                      <CubeGlyph variant={row.cube} />
                    </div>
                  </GlassCard>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* 6. Impact hex */}
      <section className="relative border-t border-[var(--border-soft)] py-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,77,94,0.05),transparent_55%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center font-heading text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-tight text-navy">
              Where we create impact
            </h2>
          </Reveal>
          <Reveal className="mt-12 md:mt-14">
            <ImpactHexDiagram />
          </Reveal>
        </div>
      </section>

      {/* 7. Careers / partners */}
      <section className="relative border-t border-[var(--border-soft)] bg-bg-secondary/35 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative grid gap-5 md:grid-cols-2">
              <PairConnector />
              <GlassCard className="flex h-full flex-col p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 bg-white/85 text-tech-blue shadow-sm">
                    <Briefcase className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="font-heading text-xl font-semibold text-navy">
                    Careers
                  </h2>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-light">
                  {intro.careers}
                </p>
                <p className="mt-5 inline-flex items-start gap-2 rounded-full border border-[var(--border-soft)] bg-white/70 px-3.5 py-2 text-xs text-muted-light shadow-sm">
                  <Bell className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                  Opportunities appear only when verified openings are available.
                </p>
              </GlassCard>
              <GlassCard className="flex h-full flex-col p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 bg-white/85 text-tech-blue shadow-sm">
                    <Handshake className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="font-heading text-xl font-semibold text-navy">
                    Partners
                  </h2>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-light">
                  {intro.partnerEcosystem}
                </p>
                <p className="mt-5 inline-flex items-start gap-2 rounded-full border border-[var(--border-soft)] bg-white/70 px-3.5 py-2 text-xs text-muted-light shadow-sm">
                  <Bell className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                  Partnerships appear only when verified collaborations are
                  active.
                </p>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. CTA */}
      <LightCtaBar title="Build responsible AI with Agrayian." />
    </>
  );
}
