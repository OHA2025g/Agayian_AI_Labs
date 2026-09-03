import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Eye,
  FileCheck,
  Lock,
  Scale,
  Shield,
  Siren,
  UserCheck,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { LightCtaBar } from "@/components/ui/DarkCtaBand";
import { GlassCard } from "@/components/ui/GlassCard";
import { getResolvedNav } from "@/lib/cms/site";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Trust & Legal Centre",
  description:
    "How Agrayian AI Labs approaches accountability, transparency, privacy, fairness and continuous oversight for responsible AI systems.",
  path: "/trust",
});

const principles: {
  title: string;
  body: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Human accountability",
    body: "Clear ownership where autonomy meets consequence. People remain accountable for decisions that affect stakeholders.",
    icon: UserCheck,
  },
  {
    title: "Purpose and proportionality",
    body: "Use cases are scoped to legitimate aims with controls matched to impact—not maximum capability by default.",
    icon: Scale,
  },
  {
    title: "Transparency",
    body: "Stakeholders can understand when AI is used, what it influences, and how to escalate concerns.",
    icon: Eye,
  },
  {
    title: "Security and privacy",
    body: "Data minimisation, access control and protection aligned to sensitivity and jurisdiction.",
    icon: Lock,
  },
  {
    title: "Fairness and inclusion",
    body: "Design and evaluation practices that surface bias risks and support equitable outcomes.",
    icon: Shield,
  },
  {
    title: "Continuous monitoring",
    body: "Detect drift, incidents and value gaps early—then route them to accountable owners.",
    icon: Activity,
  },
  {
    title: "Risk-aware design",
    body: "Proportionate risk classification drives approval pathways, testing depth and oversight intensity.",
    icon: AlertTriangle,
  },
  {
    title: "Evaluation and assurance",
    body: "Evidence that leadership and assurance teams can review—before and after go-live.",
    icon: FileCheck,
  },
  {
    title: "Incident readiness",
    body: "Defined response paths for failure modes, misuse and unexpected behaviour—including retirement.",
    icon: Siren,
  },
];

export default async function TrustCentrePage() {
  const nav = await getResolvedNav();
  const legalLinks = nav.footerLegal;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Trust & Legal Centre", path: "/trust" },
            ]),
          ),
        }}
      />

      <section className="relative overflow-hidden border-b border-[var(--border-light)] bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-texture opacity-40"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <p className="font-tech text-[0.65rem] uppercase tracking-[0.2em] text-tech-blue">
            Trust & Legal Centre
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-[clamp(2.2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-navy text-balance">
            Responsible AI you can explain and defend
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-light md:text-lg">
            This centre summarises how we approach accountability, transparency,
            privacy, fairness and continuous oversight. It links to our
            Responsible AI statement and legal documents. We do not claim
            certifications unless independently verifiable evidence is published
            here.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="/responsible-ai">
              Responsible AI statement
            </PrimaryButton>
            <Link
              href="/contact?interest=governance"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-[var(--border-light)] bg-white px-5 text-sm font-semibold text-navy transition hover:border-tech-blue/40"
            >
              Discuss governance
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f8fc]/50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle>Operating principles</SectionTitle>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <RevealItem key={item.title}>
                  <GlassCard className="flex h-full flex-col p-5">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full text-navy"
                      style={{
                        border: "1.5px solid rgba(20,159,230,0.4)",
                        boxShadow: "0 0 0 4px rgba(20,159,230,0.08)",
                      }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.55} />
                    </span>
                    <h2 className="mt-4 font-heading text-base font-semibold text-navy">
                      {item.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-light">
                      {item.body}
                    </p>
                  </GlassCard>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section className="border-t border-[var(--border-light)] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle>Legal documents</SectionTitle>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {legalLinks
              .filter((item) => item.href.startsWith("/"))
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between rounded-2xl border border-[var(--border-light)] bg-white px-5 py-4 text-sm font-semibold text-navy transition hover:border-tech-blue/35 hover:shadow-[0_12px_32px_rgba(7,26,61,0.06)]"
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-tech-blue" />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <LightCtaBar title="Questions about responsible AI or governance?" />
    </>
  );
}
