"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type KeyboardEvent,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Bot,
  Boxes,
  Briefcase,
  Building2,
  CheckCircle2,
  Compass,
  Database,
  Factory,
  GraduationCap,
  Headset,
  HeartPulse,
  Landmark,
  Shield,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { MockupCard } from "@/components/ui/MockupCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ProcessFlow } from "@/components/ui/ProcessFlow";
import { IndiaNetworkMap } from "@/components/visualisations/IndiaNetworkMap";
import { ProductGlassArt } from "@/components/visualisations/glass/ProductGlassArt";
import { capabilities as staticCapabilities } from "@/data/capabilities";
import { industries as staticIndustries } from "@/data/industries";
import { products as staticProducts } from "@/data/products";
import type { Capability, Industry, Product } from "@/types";
import { cn } from "@/lib/utils";

const industryIcons: Record<string, LucideIcon> = {
  government: Landmark,
  banking: Building2,
  hr: Users,
  "healthcare-social": HeartPulse,
  education: GraduationCap,
  manufacturing: Factory,
  enterprise: Briefcase,
};

/** Short selector labels only — CMS names stay on the detail panel. */
const selectorLabels: Record<string, readonly [string, string?]> = {
  government: ["Government &", "Public Sector"],
  banking: ["Banking &", "Financial Services"],
  hr: ["Human", "Capital"],
  "healthcare-social": ["Healthcare &", "Social"],
  education: ["Education"],
  manufacturing: ["Manufacturing"],
  enterprise: ["Enterprise", "Functions"],
};

const capabilityIcons: Record<string, LucideIcon> = {
  Compass,
  Building2,
  Shield,
  Sparkles,
  Bot,
  Database,
  Boxes,
  Headset,
};


const workflowIcons = [
  Compass,
  Shield,
  Boxes,
  Sparkles,
  BarChart3,
  Target,
] as const;

function OpportunityMesh({ labels }: { labels: string[] }) {
  return (
    <IndiaNetworkMap
      showLegend={false}
      nodeLabels={labels}
      className="min-h-[17rem] md:min-h-[20rem]"
    />
  );
}

function shortOpportunityLabel(text: string): string {
  const cleaned = text.replace(/\.$/, "");
  if (cleaned.length <= 42) return cleaned;
  const cut = cleaned.slice(0, 42);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 20 ? lastSpace : 42)}…`;
}

export function IndustriesExplorer({
  items = staticIndustries,
  capabilities = staticCapabilities,
  products = staticProducts,
}: {
  items?: Industry[];
  capabilities?: Capability[];
  products?: Product[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const orderedItems = useMemo(() => {
    const rank = new Map(
      staticIndustries.map((industry, index) => [industry.slug, index]),
    );
    return [...items].sort(
      (a, b) => (rank.get(a.slug) ?? 99) - (rank.get(b.slug) ?? 99),
    );
  }, [items]);

  const paramSlug = searchParams.get("industry") ?? "";
  const active =
    orderedItems.find((item) => item.slug === paramSlug)?.slug ??
    orderedItems[0]?.slug ??
    "";

  const selected =
    orderedItems.find((industry) => industry.slug === active) ??
    orderedItems[0];

  const industryHref = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("industry", slug);
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams],
  );

  const selectIndustry = useCallback(
    (slug: string) => {
      router.replace(industryHref(slug), { scroll: false });
    },
    [industryHref, router],
  );

  const focusTab = useCallback(
    (slug: string) => {
      selectIndustry(slug);
      requestAnimationFrame(() => {
        document.getElementById(`industry-tab-${slug}`)?.focus();
      });
    },
    [selectIndustry],
  );

  const onTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
      if (orderedItems.length === 0) return;
      let nextIndex = index;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          nextIndex = (index + 1) % orderedItems.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          nextIndex = (index - 1 + orderedItems.length) % orderedItems.length;
          break;
        case "Home":
          event.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          event.preventDefault();
          nextIndex = orderedItems.length - 1;
          break;
        default:
          return;
      }
      const next = orderedItems[nextIndex];
      if (next) focusTab(next.slug);
    },
    [focusTab, orderedItems],
  );

  const scrollSelector = (direction: -1 | 1) => {
    const node = scrollerRef.current;
    if (!node) return;
    const step = Math.min(280, Math.round(node.clientWidth * 0.55));
    node.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  useEffect(() => {
    document
      .getElementById(`industry-tab-${active}`)
      ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const relatedCapabilities = useMemo(() => {
    if (!selected) return [];
    return selected.capabilities
      .map((slug) => capabilities.find((item) => item.slug === slug))
      .filter((item): item is Capability => Boolean(item));
  }, [selected, capabilities]);

  const relatedProducts = useMemo(() => {
    if (!selected) return [];
    return selected.products
      .map((slug) => products.find((item) => item.slug === slug))
      .filter((item): item is Product => Boolean(item));
  }, [selected, products]);

  if (!selected) return null;

  const opportunityLabels = selected.opportunities.map(shortOpportunityLabel);

  return (
    <div className="relative">
      <section className="relative z-10 -mt-2 pb-6 md:-mt-4 md:pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 rounded-[28px] border border-[#e4edf4] bg-white px-2 py-3 shadow-[0_16px_40px_rgba(20,45,75,0.06)] sm:gap-2 sm:px-3 sm:py-4">
            <button
              type="button"
              aria-label="Previous industries"
              onClick={() => scrollSelector(-1)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dce6ef] bg-white text-[#071b40] transition hover:border-tech-blue/40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div
              ref={scrollerRef}
              role="tablist"
              aria-label="Select industry"
              aria-orientation="horizontal"
              className="flex min-w-0 flex-1 items-stretch gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {orderedItems.map((industry, index) => {
                const isActive = industry.slug === active;
                const Icon = industryIcons[industry.slug] ?? Landmark;
                const lines = selectorLabels[industry.slug] ?? [industry.name];
                return (
                  <Link
                    key={industry.id}
                    href={industryHref(industry.slug)}
                    replace
                    scroll={false}
                    role="tab"
                    id={`industry-tab-${industry.slug}`}
                    aria-controls={`industry-panel-${industry.slug}`}
                    aria-selected={isActive}
                    aria-label={industry.name}
                    tabIndex={isActive ? 0 : -1}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    className={cn(
                      "relative flex min-h-[6.75rem] min-w-[9.75rem] shrink-0 flex-col items-center justify-center rounded-xl px-2.5 py-3 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tech-blue lg:min-w-0 lg:flex-1",
                      isActive
                        ? "border border-[#27b9ec]/55 bg-[#f4fbfe] text-[#0b6aa8]"
                        : "border border-transparent text-[#071b40] hover:bg-[#f7fafc]",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-7 w-7 shrink-0",
                        isActive ? "text-[#149fe6]" : "text-[#166bb5]",
                      )}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span className="mt-2.5 font-heading text-[0.8rem] font-semibold leading-[1.25] sm:text-[0.84rem]">
                      {lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                    {isActive ? (
                      <span
                        aria-hidden
                        className="absolute bottom-1.5 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-[#27b9ec]"
                      />
                    ) : null}
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Next industries"
              onClick={() => scrollSelector(1)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dce6ef] bg-white text-[#071b40] transition hover:border-tech-blue/40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.slug}
          id={`industry-panel-${selected.slug}`}
          role="tabpanel"
          aria-labelledby={`industry-tab-${selected.slug}`}
          tabIndex={0}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.28 }}
        >
          <section className="border-b border-[var(--border-soft)] py-14 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 max-w-3xl">
                <p className="font-tech text-[0.65rem] uppercase tracking-[0.2em] text-cyan">
                  Industry focus
                </p>
                <h2 className="mt-2 font-heading text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight text-navy text-balance">
                  {selected.name}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-light md:text-lg">
                  {selected.summary}
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
                <Reveal>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-navy">
                      Priority challenges
                    </h3>
                    <ul className="mt-5 space-y-4">
                      {selected.challenges.map((challenge) => (
                        <li key={challenge} className="flex gap-3">
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-tech-blue/20 bg-sky/15 text-tech-blue">
                            <AlertTriangle className="h-4 w-4" aria-hidden />
                          </span>
                          <p className="text-sm leading-relaxed text-muted-light md:text-[0.95rem]">
                            {challenge}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-heading text-lg font-semibold text-navy">
                        Opportunity map
                      </h3>
                      <div className="flex items-center gap-3 text-[0.65rem] text-muted-light">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-brand" />
                          High impact
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-tech-blue" />
                          Moderate
                        </span>
                      </div>
                    </div>
                    <OpportunityMesh labels={opportunityLabels} />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section className="border-b border-[var(--border-soft)] bg-bg-secondary/25 py-14 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <h3 className="font-heading text-xl font-semibold text-navy md:text-2xl">
                  Typical workflows
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-muted-light md:text-base">
                  Engagement patterns we use to move from operating context to
                  governed delivery for {selected.name}.
                </p>
              </Reveal>
              <Reveal className="mt-8">
                <ProcessFlow
                  steps={selected.workflows.map((workflow, index) => ({
                    title: workflow.title,
                    description: workflow.description,
                    icon: workflowIcons[index % workflowIcons.length],
                  }))}
                />
              </Reveal>
            </div>
          </section>

          <section className="border-b border-[var(--border-soft)] py-14 md:py-16">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8">
              <Reveal>
                <h3 className="font-heading text-xl font-semibold text-navy md:text-2xl">
                  Relevant capabilities
                </h3>
                <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {relatedCapabilities.map((capability) => {
                    const Icon = capabilityIcons[capability.icon] ?? Compass;
                    return (
                      <RevealItem key={capability.id}>
                        <Link href={`/capabilities#${capability.slug}`}>
                          <GlassCard
                            hover
                            className="flex h-full items-start gap-3 p-4"
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-tech-blue/20 bg-sky/15 text-tech-blue">
                              <Icon className="h-4 w-4" aria-hidden />
                            </span>
                            <span className="font-heading text-sm font-semibold leading-snug text-navy">
                              {capability.name}
                            </span>
                          </GlassCard>
                        </Link>
                      </RevealItem>
                    );
                  })}
                </RevealGroup>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="flex items-end justify-between gap-3">
                  <h3 className="font-heading text-xl font-semibold text-navy md:text-2xl">
                    Related products
                  </h3>
                  <Link
                    href="/products"
                    className="shrink-0 text-sm font-semibold text-tech-blue transition hover:text-navy"
                  >
                    Explore all products →
                  </Link>
                </div>
                <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2">
                  {relatedProducts.map((product) => {
                    return (
                      <RevealItem key={product.id}>
                        <Link href={`/products?product=${product.slug}`}>
                          <MockupCard className="flex h-full flex-col p-4">
                            <ProductGlassArt
                              slug={product.slug}
                              variant="products"
                              className="h-24"
                              alt=""
                            />
                            <h4 className="mt-3 font-heading text-sm font-semibold text-navy">
                              {product.name}
                            </h4>
                            <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-light line-clamp-3">
                              {product.shortDescription}
                            </p>
                            <span className="mt-3 text-sm font-semibold text-tech-blue">
                              Learn more →
                            </span>
                          </MockupCard>
                        </Link>
                      </RevealItem>
                    );
                  })}
                </RevealGroup>
              </Reveal>
            </div>
          </section>

          <section className="py-14 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <RevealGroup className="grid gap-8 lg:grid-cols-[1fr_1fr_0.85fr] lg:gap-10">
                <RevealItem>
                  <GlassCard className="h-full p-6 md:p-7">
                    <h3 className="font-heading text-lg font-semibold text-navy">
                      Governance considerations
                    </h3>
                    <ul className="mt-5 space-y-3.5">
                      {selected.governance.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-tech-blue/20 bg-sky/15 text-tech-blue">
                            <Shield className="h-3.5 w-3.5" aria-hidden />
                          </span>
                          <p className="text-sm leading-relaxed text-muted-light">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </RevealItem>

                <RevealItem>
                  <GlassCard className="h-full p-6 md:p-7">
                    <h3 className="font-heading text-lg font-semibold text-navy">
                      Expected outcomes
                    </h3>
                    <ul className="mt-5 space-y-3.5">
                      {selected.outcomes.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-tech-blue/20 bg-sky/15 text-tech-blue">
                            <CheckCircle2
                              className="h-3.5 w-3.5"
                              aria-hidden
                            />
                          </span>
                          <p className="text-sm leading-relaxed text-muted-light">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </RevealItem>

                <RevealItem>
                  <GlassCard
                    variant="glow"
                    className="relative flex h-full min-h-[16rem] flex-col overflow-hidden p-6 md:p-7"
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(20,159,230,0.22),transparent_70%)]"
                    />
                    <div
                      aria-hidden
                      className="relative mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full border border-white/90 bg-gradient-to-br from-sky/25 via-white to-tech-blue/10 shadow-[0_16px_40px_rgba(20,159,230,0.18)]"
                    >
                      <BarChart3 className="h-10 w-10 text-tech-blue" />
                    </div>
                    <p className="relative font-heading text-base font-semibold text-navy">
                      Discuss {selected.name}
                    </p>
                    <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-light">
                      Share your operating context, priority use cases and
                      governance constraints. We will help shape a practical,
                      industry-aware engagement.
                    </p>
                    <div className="relative mt-5">
                      <PrimaryButton
                        href={`/contact?interest=consultation&industry=${selected.slug}`}
                        className="h-10 px-4 text-xs"
                        showArrow={false}
                      >
                        Book a Consultation
                      </PrimaryButton>
                    </div>
                  </GlassCard>
                </RevealItem>
              </RevealGroup>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
