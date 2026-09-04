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
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { CompanyGlowSculpture } from "@/components/visualisations/company/CompanyGlowSculpture";
import { companySculptures } from "@/config/company-sculptures";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { ProcessFlow } from "@/components/ui/ProcessFlow";
import { getCareers, getTeamMembers } from "@/lib/cms/catalog";
import { getCompanyPageContent } from "@/lib/cms/page-content";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export async function generateMetadata() {
  const company = await getCompanyPageContent();
  return buildMetadata({
    title: company.seo.title,
    description: company.seo.description,
    path: "/company",
  });
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
    <div className="relative mx-auto w-full max-w-lg bg-transparent lg:max-w-none">
      <CompanyGlowSculpture
        asset={companySculptures.heroHub}
        priority
        sizes="(max-width: 1024px) 90vw, 48vw"
      />
      <span className="absolute left-[6%] top-[8%] rounded-lg border border-[var(--border-soft)] bg-bg-primary/85 px-2.5 py-1.5 text-[0.65rem] font-semibold text-navy">
        Public systems
      </span>
      <span className="absolute left-1/2 top-[2%] -translate-x-1/2 rounded-lg border border-[var(--border-soft)] bg-bg-primary/85 px-2.5 py-1.5 text-[0.65rem] font-semibold text-navy">
        Enterprise
      </span>
      <span className="absolute right-[6%] top-[8%] rounded-lg border border-[var(--border-soft)] bg-bg-primary/85 px-2.5 py-1.5 text-[0.65rem] font-semibold text-navy">
        Human impact
      </span>
    </div>
  );
}

function ImpactHexDiagram() {
  return (
    <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_minmax(16rem,28rem)_1fr] lg:gap-2">
      <ul className="space-y-5 lg:space-y-8 lg:pr-2 lg:text-right">
        {impactLeft.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title} className="flex gap-3 lg:flex-row-reverse">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-soft)] bg-white/80 text-tech-blue">
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

      <div className="relative mx-auto w-full max-w-md bg-transparent">
        <CompanyGlowSculpture
          asset={companySculptures.impact}
          sizes="(max-width: 1024px) 80vw, 28rem"
        />
      </div>

      <ul className="space-y-5 lg:space-y-8 lg:pl-2">
        {impactRight.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title} className="flex gap-3">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-soft)] bg-white/80 text-tech-blue">
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
  const [company, roles, people] = await Promise.all([
    getCompanyPageContent(),
    getCareers(),
    getTeamMembers(),
  ]);
  const intro = {
    vision: company.vision,
    mission: company.mission,
    introduction: company.introduction,
    whyAgrayian: company.whyAgrayian,
    deliveryPhilosophy: company.deliveryPhilosophy,
    responsibleAiCommitment: company.responsibleAiCommitment,
    technologyPhilosophy: company.technologyPhilosophy,
    careers: company.careersCopy,
    partnerEcosystem: company.partnerEcosystemCopy,
  };
  const values = company.values;

  const partnershipDelivery =
    intro.whyAgrayian[0] ||
    "We connect strategy, governance and delivery so programmes move from ambition to production with clear ownership.";

  const deliveryRows = [
    {
      title: "Responsible AI",
      body: intro.responsibleAiCommitment,
      icon: Shield,
      sculpture: companySculptures.responsible,
    },
    {
      title: "Technology",
      body: intro.technologyPhilosophy,
      icon: Layers,
      sculpture: companySculptures.technology,
    },
    {
      title: "Partnership",
      body: partnershipDelivery,
      icon: Handshake,
      sculpture: companySculptures.partnership,
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
        eyebrow="Company"
        title="Agrayian AI Labs"
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

          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
            {deliveryRows.map((row) => {
              const Icon = row.icon;
              return (
                <RevealItem key={row.title}>
                  <GlassCard className="flex h-full flex-col overflow-hidden p-5 md:p-6">
                    <div className="mx-auto w-full max-w-[13rem] bg-transparent">
                      <CompanyGlowSculpture
                        asset={row.sculpture}
                        sizes="(max-width: 768px) 60vw, 13rem"
                      />
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-soft)] bg-white/80 text-tech-blue">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 className="font-heading text-lg font-semibold text-navy">
                        {row.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-light">
                      {row.body}
                    </p>
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
                {roles.length ? (
                  <Link
                    href="/company/careers"
                    className="mt-4 text-sm font-semibold text-tech-blue hover:text-navy"
                  >
                    View open roles
                  </Link>
                ) : null}
                {people.length ? (
                  <Link
                    href="/company/leadership"
                    className="mt-2 text-sm font-semibold text-tech-blue hover:text-navy"
                  >
                    Leadership
                  </Link>
                ) : null}
                <p className="mt-5 flex items-start gap-2 rounded-xl bg-[#f3f6f9] px-4 py-3 text-xs leading-relaxed text-muted-light">
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
                <p className="mt-5 flex items-start gap-2 rounded-xl bg-[#f3f6f9] px-4 py-3 text-xs leading-relaxed text-muted-light">
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
