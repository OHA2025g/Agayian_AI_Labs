import {
  Bot,
  Building2,
  Check,
  Clock,
  Compass,
  Database,
  FileText,
  LayoutDashboard,
  Lock,
  Mail,
  MessageSquare,
  Shield,
  Sparkles,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { OriginalSculpture } from "@/components/visualisations/glass/OriginalSculpture";
import { mockupAssets } from "@/config/mockup-assets";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { FAQSection } from "@/components/sections/FAQSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProcessFlow } from "@/components/ui/ProcessFlow";
import { DarkCtaBand } from "@/components/ui/DarkCtaBand";
import { siteConfig } from "@/config/site";
import { consultationFlow } from "@/lib/contact-schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Book a consultation with Agrayian AI Labs for AI strategy, CoE design, governance, products and enterprise or government programmes.",
  path: "/contact",
});

const whyContact = [
  "Exploring AI strategy and investment sequencing",
  "Building or maturing an AI Centre of Excellence",
  "Strengthening AI governance and assurance",
  "Requesting a product demonstration",
  "Discussing an enterprise or government engagement",
  "Exploring partnership opportunities",
] as const;

const themes: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "AI Strategy",
    body: "Roadmaps, prioritisation and investment sequencing.",
    icon: Compass,
  },
  {
    title: "AI CoE",
    body: "Operating models that make AI repeatable.",
    icon: Building2,
  },
  {
    title: "AI Governance",
    body: "Risk, lifecycle and assurance made operational.",
    icon: Shield,
  },
  {
    title: "Product Demonstration",
    body: "See platforms applied to your decision context.",
    icon: LayoutDashboard,
  },
  {
    title: "Generative AI",
    body: "Assistive systems with proportionate controls.",
    icon: Sparkles,
  },
  {
    title: "Agentic AI",
    body: "Bounded agents with human accountability.",
    icon: Bot,
  },
  {
    title: "Data & Analytics",
    body: "Trusted foundations for decision intelligence.",
    icon: Database,
  },
];

const flowIcons = [MessageSquare, Shield, Wrench, FileText] as const;

const faqs = [
  {
    question: "What happens after I submit an enquiry?",
    answer:
      "We review the requirement, confirm fit and propose a discovery discussion. You will hear from us using your preferred contact method.",
  },
  {
    question: "How quickly will you respond?",
    answer:
      "We typically respond within one business day. Complex or multi-stakeholder requests may take slightly longer while we align the right specialists.",
  },
  {
    question: "Can I request a product demonstration?",
    answer:
      "Yes. Select Product Demonstration as the area of interest, or open a product page and use Request a demo. Share the decision context so we can prepare a relevant walkthrough.",
  },
  {
    question: "Do you work under NDA?",
    answer:
      "Yes. We can discuss sensitive programmes under a mutual NDA before detailed discovery. Mention confidentiality needs in your enquiry summary.",
  },
  {
    question: "Is there a cost for an initial consultation?",
    answer:
      "Introductory discovery discussions are typically complimentary when used to assess fit. Any paid engagement is scoped and agreed before work begins.",
  },
  {
    question: "How is my information protected?",
    answer:
      "Enquiry details are treated as confidential and handled according to our Privacy Policy. We use them only to respond to your request and route it to the right team.",
  },
];

function ContactNetworkHero() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
      <OriginalSculpture
        src={mockupAssets.originalContactNetwork}
        alt="Glass network connecting enquiry nodes"
        priority
      />
    </div>
  );
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{
    interest?: string;
    product?: string;
    capability?: string;
  }>;
}) {
  const params = await searchParams;
  const mailto = siteConfig.contactEmail
    ? `mailto:${siteConfig.contactEmail}`
    : "/contact";

  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Book a consultation"
        description="Tell us about your AI ambition, governance needs or product interest. We will review the requirement and propose a suitable discovery discussion."
        visual={<ContactNetworkHero />}
      />

      <section className="relative py-12 md:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(59,130,246,0.05),transparent_45%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <Reveal>
              <GlassCard variant="strong" className="p-6 md:p-8">
                <ContactForm
                  defaultInterest={params.interest}
                  defaultProduct={params.product}
                  defaultCapability={params.capability}
                />
              </GlassCard>
            </Reveal>

            <RevealGroup className="space-y-5">
              <RevealItem>
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 bg-white/80 text-tech-blue shadow-sm">
                      <Mail className="h-5 w-5" aria-hidden />
                    </span>
                    <h2 className="font-heading text-lg font-semibold text-navy">
                      Direct email
                    </h2>
                  </div>
                  {siteConfig.contactEmail ? (
                    <a
                      className="mt-4 block text-tech-blue hover:underline"
                      href={mailto}
                    >
                      {siteConfig.contactEmail}
                    </a>
                  ) : (
                    <p className="mt-4 text-sm text-muted-light">
                      Email will appear here once configured.
                    </p>
                  )}
                  <p className="mt-2 text-sm text-muted-light">
                    We typically respond within 1 business day.
                  </p>
                </GlassCard>
              </RevealItem>

              <RevealItem>
                <GlassCard className="p-6">
                  <h2 className="font-heading text-lg font-semibold text-navy">
                    Why organisations contact us
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {whyContact.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm text-muted-light"
                      >
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </RevealItem>

              <RevealItem>
                <GlassCard className="p-6">
                  <h2 className="font-heading text-lg font-semibold text-navy">
                    Our commitment to you
                  </h2>
                  <ul className="mt-4 space-y-4">
                    <li className="flex gap-3 text-sm text-muted-light">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-tech-blue" />
                      Human response, always
                    </li>
                    <li className="flex gap-3 text-sm text-muted-light">
                      <Lock className="mt-0.5 h-4 w-4 shrink-0 text-tech-blue" />
                      Your information is confidential
                    </li>
                    <li className="flex gap-3 text-sm text-muted-light">
                      <Users className="mt-0.5 h-4 w-4 shrink-0 text-tech-blue" />
                      We&apos;ll connect you with the right expert
                    </li>
                  </ul>
                </GlassCard>
              </RevealItem>
            </RevealGroup>
          </div>

          <Reveal className="mt-16 md:mt-20">
            <h2 className="font-heading text-2xl font-semibold text-navy md:text-3xl">
              How your enquiry is handled
            </h2>
            <div className="mt-8">
              <ProcessFlow
                steps={consultationFlow.map((step, index) => ({
                  title: step.title,
                  description: step.description,
                  icon: flowIcons[index],
                }))}
              />
            </div>
          </Reveal>

          <Reveal className="mt-16 md:mt-20">
            <h2 className="font-heading text-2xl font-semibold text-navy md:text-3xl">
              Common enquiry themes
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {themes.map((theme) => {
                const Icon = theme.icon;
                return (
                  <GlassCard key={theme.title} variant="soft" className="p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 bg-white/80 text-tech-blue shadow-sm">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-3 font-heading text-base font-semibold text-navy">
                      {theme.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-light">{theme.body}</p>
                  </GlassCard>
                );
              })}
            </div>
          </Reveal>

          <Reveal className="mt-16 md:mt-20">
            <FAQSection items={faqs} columns={2} />
          </Reveal>

          <GlassCard
            variant="glow"
            className="relative mt-12 overflow-hidden p-6 md:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(255,77,94,0.08),transparent_35%),radial-gradient(circle_at_85%_60%,rgba(20,159,230,0.1),transparent_40%)]"
            />
            <div className="relative flex items-start gap-4 md:items-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-white/90 text-tech-blue shadow-sm">
                <Lock className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2 className="font-heading text-lg font-semibold text-navy">
                  Your privacy matters
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-light">
                  We treat enquiry details as confidential and apply enterprise
                  security standards to contact data. See our{" "}
                  <a
                    href="/privacy-policy"
                    className="font-medium text-tech-blue hover:underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  for how information is collected, used and retained.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <DarkCtaBand
        title="Prefer a direct conversation?"
        description={
          siteConfig.contactEmail
            ? `Email ${siteConfig.contactEmail} and we will route your request to the right specialists.`
            : "Email our team and we will route your request to the right specialists."
        }
        primaryHref={mailto}
        primaryLabel="Email us"
      />
    </>
  );
}
