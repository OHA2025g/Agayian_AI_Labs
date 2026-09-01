"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, type KeyboardEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
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

  const paramSlug = searchParams.get("industry") ?? "";
  const active =
    items.find((item) => item.slug === paramSlug)?.slug ?? items[0]?.slug ?? "";

  const selected =
    items.find((industry) => industry.slug === active) ?? items[0];

  const selectIndustry = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("industry", slug);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
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
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (items.length === 0) return;
      let nextIndex = index;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          nextIndex = (index + 1) % items.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          nextIndex = (index - 1 + items.length) % items.length;
          break;
        case "Home":
          event.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          event.preventDefault();
          nextIndex = items.length - 1;
          break;
        default:
          return;
      }
      const next = items[nextIndex];
      if (next) focusTab(next.slug);
    },
    [focusTab, items],
  );

  const scrollSelector = (direction: -1 | 1) => {
    scrollerRef.current?.scrollBy({
      left: direction * 240,
      behavior: "smooth",
    });
  };

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
      <section className="border-b border-[var(--border-soft)] bg-bg-secondary/30 py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="font-tech text-[0.65rem] uppercase tracking-[0.2em] text-cyan">
                Select industry
              </p>
              <h2 className="mt-2 font-heading text-xl font-semibold text-navy md:text-2xl">
                Sector expertise
              </h2>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                aria-label="Previous industries"
                onClick={() => scrollSelector(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-light)] bg-white text-navy transition hover:border-tech-blue/40"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next industries"
                onClick={() => scrollSelector(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-light)] bg-white text-navy transition hover:border-tech-blue/40"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            role="tablist"
            aria-label="Industries"
            aria-orientation="horizontal"
            className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]"
          >
            {items.map((industry, index) => {
              const isActive = industry.slug === active;
              const Icon = industryIcons[industry.slug] ?? Landmark;
              return (
                <button
                  key={industry.id}
                  type="button"
                  role="tab"
                  id={`industry-tab-${industry.slug}`}
                  aria-controls={`industry-panel-${industry.slug}`}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectIndustry(industry.slug)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={cn(
                    "relative min-w-[11.5rem] shrink-0 rounded-2xl border px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tech-blue",
                    isActive
                      ? "border-tech-blue/35 bg-white shadow-[0_14px_36px_rgba(20,159,230,0.12)]"
                      : "border-white/80 bg-white/75 hover:border-tech-blue/25",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border",
                      isActive
                        ? "border-tech-blue/25 bg-sky/20 text-tech-blue"
                        : "border-[var(--border-soft)] bg-white text-tech-blue/80",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="mt-3 block font-heading text-sm font-semibold leading-snug text-navy">
                    {industry.name}
                  </span>
                  {isActive ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-tech-blue"
                    />
                  ) : null}
                </button>
              );
            })}
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
