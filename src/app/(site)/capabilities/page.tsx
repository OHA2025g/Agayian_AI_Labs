import Link from "next/link";
import {
  Bot,
  Boxes,
  Building2,
  Compass,
  Database,
  Headset,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { Badge } from "@/components/ui/badge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { getCapabilities, getProducts } from "@/lib/cms/catalog";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Capability } from "@/types";

const icons: Record<string, LucideIcon> = {
  Compass,
  Building2,
  Shield,
  Sparkles,
  Bot,
  Database,
  Boxes,
  Headset,
};

const journeyOrder = [
  "strategy",
  "data",
  "generative-ai",
  "agentic-ai",
  "governance",
  "product-engineering",
  "managed-services",
] as const;

const journeyNav = [
  { label: "Strategy", href: "#strategy" },
  { label: "Data", href: "#data" },
  { label: "Generative AI", href: "#generative-ai" },
  { label: "Agentic AI", href: "#agentic-ai" },
  { label: "Governance", href: "#governance" },
  { label: "Product Engineering", href: "#product-engineering" },
  { label: "Managed Services", href: "#managed-services" },
];

export function generateMetadata() {
  return buildMetadata({
    title: "Capabilities",
    description:
      "Explore Agrayian AI Labs capabilities spanning AI strategy, Centres of Excellence, governance, generative and agentic AI, data and analytics, product engineering and managed services.",
    path: "/capabilities",
  });
}

export default async function CapabilitiesPage() {
  const [capabilities, products] = await Promise.all([
    getCapabilities(),
    getProducts(),
  ]);

  const getCapability = (slug: string) =>
    capabilities.find((item) => item.slug === slug);

  const journeyLayers = journeyOrder
    .map((slug) => getCapability(slug))
    .filter((item): item is Capability => Boolean(item));

  const coeCapability = getCapability("ai-coe");

  const getProductBySlug = (slug: string) =>
    products.find((item) => item.slug === slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Capabilities", path: "/capabilities" },
            ]),
          ),
        }}
      />

      <Section
        eyebrow="Architecture journey"
        title="From strategy to governed production systems"
        description="Seven integrated capability layers that connect ambition, data foundations, AI modalities, governance, engineering and managed operations — sequenced as an architecture journey."
        cta={
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href="/contact?interest=consultation">
              Book a Consultation
            </PrimaryButton>
            <SecondaryButton href="/products">Explore Products</SecondaryButton>
          </div>
        }
        className="pt-10 md:pt-16"
      >
        <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {journeyLayers.map((capability, index) => (
            <RevealItem key={capability.id}>
              <a
                href={`#${capability.slug}`}
                className="block rounded-lg border border-white/10 bg-bg-elevated/40 px-4 py-3 transition hover:border-cyan/35"
              >
                <span className="font-tech text-xs text-cyan">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 font-heading text-sm font-semibold text-text-on-dark">
                  {capability.shortName}
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-dark">
                  {capability.summary}
                </p>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <nav
        aria-label="Architecture layers"
        className="sticky top-16 z-30 border-y border-white/10 bg-bg-primary/90 backdrop-blur-xl lg:top-[4.25rem]"
      >
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {journeyNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-muted-dark transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="relative">
        {journeyLayers.map((capability, index) => {
          const Icon = icons[capability.icon] ?? Compass;
          const tone = index % 2 === 0 ? "elevated" : "dark";
          const relatedProducts = capability.relatedProducts
            .map((slug) => getProductBySlug(slug))
            .filter((product): product is NonNullable<typeof product> =>
              Boolean(product),
            );
          const showCoeCallout =
            capability.slug === "strategy" && coeCapability != null;

          return (
            <div key={capability.id} className="relative">
              {index > 0 && (
                <ArchitectureConnector layerIndex={index} />
              )}

              <Section
                id={capability.slug}
                tone={tone}
                className="scroll-mt-36 lg:scroll-mt-40"
                eyebrow={`Layer ${String(index + 1).padStart(2, "0")}`}
                title={capability.name}
                description={capability.summary}
              >
                <Reveal className="mb-10 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="max-w-3xl text-base leading-relaxed text-muted-dark md:text-lg">
                    {capability.description}
                  </p>
                </Reveal>

                {showCoeCallout && (
                  <Reveal className="mb-10">
                    <aside className="rounded-xl border border-cyan/25 bg-gradient-to-br from-cyan/10 to-bg-primary/60 p-6 md:p-8">
                      <div className="flex flex-wrap items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/10 text-cyan">
                          <Building2 className="h-5 w-5" aria-hidden />
                        </div>
                        <div className="min-w-0 flex-1">
                          <Badge variant="cyan">Operating model</Badge>
                          <h3 className="mt-3 font-heading text-xl font-semibold text-text-on-dark">
                            {coeCapability.name}
                          </h3>
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-dark md:text-base">
                            {coeCapability.summary}
                          </p>
                          <Link
                            href="/ai-centre-of-excellence"
                            className="mt-4 inline-flex text-sm font-semibold text-cyan hover:text-white"
                          >
                            Explore the AI Centre of Excellence →
                          </Link>
                        </div>
                      </div>
                    </aside>
                  </Reveal>
                )}

                <div className="grid gap-8 lg:grid-cols-2">
                  <Reveal>
                    <CapabilityBlock
                      title="Business challenge"
                      body={capability.businessChallenge}
                    />
                  </Reveal>
                  <Reveal delay={0.05}>
                    <CapabilityList
                      title="What Agrayian delivers"
                      items={capability.deliverables}
                    />
                  </Reveal>
                  <Reveal>
                    <CapabilityList
                      title="Engagement activities"
                      items={capability.engagementActivities}
                    />
                  </Reveal>
                  <Reveal delay={0.05}>
                    <CapabilityList
                      title="Typical deliverables"
                      items={capability.typicalDeliverables}
                    />
                  </Reveal>
                  <Reveal>
                    <CapabilityList title="Use cases" items={capability.useCases} />
                  </Reveal>
                  <Reveal delay={0.05}>
                    <CapabilityList title="Outcomes" items={capability.outcomes} />
                  </Reveal>
                </div>

                {relatedProducts.length > 0 && (
                  <Reveal className="mt-10">
                    <h3 className="font-heading text-lg font-semibold text-text-on-dark">
                      Related products
                    </h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {relatedProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products?product=${product.slug}`}
                          className="rounded-xl border border-white/10 bg-bg-primary/40 p-4 transition hover:border-cyan/35"
                        >
                          <Badge variant="cyan">{product.category}</Badge>
                          <p className="mt-3 font-heading text-base font-semibold text-text-on-dark">
                            {product.name}
                          </p>
                          <p className="mt-2 text-sm text-muted-dark">
                            {product.shortDescription}
                          </p>
                          <span className="mt-3 inline-block text-sm font-medium text-cyan">
                            View product →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </Reveal>
                )}

                <Reveal className="mt-10 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="min-w-0 flex-1">
                    <p className="font-heading text-base font-semibold text-text-on-dark">
                      Discuss this capability with our team
                    </p>
                    <p className="mt-1 text-sm text-muted-dark">
                      Book a consultation to explore how {capability.shortName}{" "}
                      applies to your organisation&apos;s priorities and readiness.
                    </p>
                  </div>
                  <PrimaryButton
                    href={`/contact?interest=consultation&capability=${capability.slug}`}
                  >
                    Book a Consultation
                  </PrimaryButton>
                </Reveal>
              </Section>
            </div>
          );
        })}
      </div>

      <CTASection
        title="Ready to sequence AI investment into a governed delivery agenda?"
        secondaryHref="/products"
        secondaryLabel="Explore Our Products"
      />
    </>
  );
}

function ArchitectureConnector({ layerIndex }: { layerIndex: number }) {
  return (
    <div
      className="pointer-events-none absolute -top-8 left-1/2 z-10 hidden h-16 w-px -translate-x-1/2 md:block"
      aria-hidden
    >
      <svg
        className="h-full w-8 -translate-x-1/2 overflow-visible"
        viewBox="0 0 32 64"
        fill="none"
      >
        <path
          d="M16 0 V48 M8 40 L16 52 L24 40"
          stroke="rgba(25, 195, 211, 0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
          style={{ animationDelay: `${layerIndex * 120}ms` }}
        />
      </svg>
    </div>
  );
}

function CapabilityBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="h-full rounded-xl border border-white/10 bg-bg-primary/40 p-6">
      <h3 className="font-heading text-lg font-semibold text-text-on-dark">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-dark md:text-base">
        {body}
      </p>
    </div>
  );
}

function CapabilityList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="h-full rounded-xl border border-white/10 bg-bg-primary/40 p-6">
      <h3 className="font-heading text-lg font-semibold text-text-on-dark">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className={cn("flex gap-2.5 text-sm leading-relaxed text-muted-dark")}
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
