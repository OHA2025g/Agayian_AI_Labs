"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ExpectedOutcomes } from "@/components/industries/ExpectedOutcomes";
import { GovernanceConsiderations } from "@/components/industries/GovernanceConsiderations";
import { IndustryCta } from "@/components/industries/IndustryCta";
import { IndustrySelector } from "@/components/industries/IndustrySelector";
import { OpportunityMap } from "@/components/industries/OpportunityMap";
import { PriorityChallenges } from "@/components/industries/PriorityChallenges";
import { RelatedProducts } from "@/components/industries/RelatedProducts";
import { RelevantCapabilities } from "@/components/industries/RelevantCapabilities";
import { TypicalWorkflows } from "@/components/industries/TypicalWorkflows";
import { capabilities as staticCapabilities } from "@/data/capabilities";
import { industries as staticIndustries } from "@/data/industries";
import { products as staticProducts } from "@/data/products";
import type {
  Capability,
  Industry,
  IndustryCapabilityIcon,
  IndustryCapabilityItem,
  Product,
} from "@/types";

const industryIcons: Record<string, LucideIcon> = {
  government: Landmark,
  banking: Building2,
  hr: Users,
  "healthcare-social": HeartPulse,
  education: GraduationCap,
  manufacturing: Factory,
  enterprise: Briefcase,
};

const fallbackCapabilityIcons: IndustryCapabilityIcon[] = [
  "unification",
  "automation",
  "insight",
  "document",
  "geospatial",
  "language",
  "fraud",
  "monitoring",
  "interop",
];

const selectorLabels: Record<string, readonly [string, string?]> = {
  government: ["Government &", "Public Sector"],
  banking: ["Banking &", "Financial Services"],
  hr: ["Human", "Capital"],
  "healthcare-social": ["Social", "Development"],
  education: ["Education"],
  manufacturing: ["Manufacturing"],
  enterprise: ["Enterprise", "Functions"],
};

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

  const selected = useMemo(() => {
    const live =
      orderedItems.find((industry) => industry.slug === active) ??
      orderedItems[0];
    if (!live) return live;
    const catalog = staticIndustries.find((industry) => industry.slug === live.slug);
    return catalog ? { ...live, ...catalog } : live;
  }, [active, orderedItems]);

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
    const item = node.querySelector(".industries-selector-item");
    const step = item instanceof HTMLElement ? item.offsetWidth : Math.round(node.clientWidth / 5);
    node.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  useEffect(() => {
    document
      .getElementById(`industry-tab-${active}`)
      ?.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
  }, [active]);

  const relevantCapabilities = useMemo((): IndustryCapabilityItem[] => {
    if (!selected) return [];
    if (selected.relevantCapabilities?.length) {
      return selected.relevantCapabilities;
    }
    return selected.capabilities
      .map((slug) => capabilities.find((item) => item.slug === slug))
      .filter((item): item is Capability => Boolean(item))
      .slice(0, 9)
      .map((item, index) => ({
        title: item.name,
        icon: fallbackCapabilityIcons[index] ?? "unification",
      }));
  }, [selected, capabilities]);

  const relatedProducts = useMemo(() => {
    if (!selected) return [];
    return selected.products
      .map((slug) => products.find((item) => item.slug === slug))
      .filter((item): item is Product => Boolean(item));
  }, [selected, products]);

  if (!selected) return null;

  const selectorItems = orderedItems.map((industry) => ({
    slug: industry.slug,
    name: industry.name,
    lines: selectorLabels[industry.slug] ?? [industry.name],
    icon: industryIcons[industry.slug] ?? Landmark,
  }));

  return (
    <div>
      <IndustrySelector
        items={selectorItems}
        active={active}
        hrefFor={industryHref}
        onPrev={() => scrollSelector(-1)}
        onNext={() => scrollSelector(1)}
        scrollerRef={scrollerRef}
        onKeyDown={onTabKeyDown}
      />

      <p className="industries-main pt-4 text-sm">
        <Link
          href={`/industries/${selected.slug}`}
          className="font-semibold text-tech-blue hover:text-navy"
        >
          Open {selected.name} page
        </Link>
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.slug}
          id={`industry-panel-${selected.slug}`}
          role="tabpanel"
          aria-labelledby={`industry-tab-${selected.slug}`}
          tabIndex={0}
          initial={false}
          animate={{ y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <section className="industries-overview industries-main">
            <PriorityChallenges items={selected.challenges} />
            <OpportunityMap items={selected.opportunities} />
          </section>

          <TypicalWorkflows steps={selected.workflows} />

          <section className="industries-cap-prod industries-main">
            <RelevantCapabilities items={relevantCapabilities} />
            <RelatedProducts
              items={relatedProducts}
              cards={
                selected.productCards?.length
                  ? selected.productCards
                  : staticIndustries.find((item) => item.slug === selected.slug)
                      ?.productCards
              }
            />
          </section>

          <section className="industries-gov-out industries-main">
            <GovernanceConsiderations items={selected.governance} />
            <ExpectedOutcomes items={selected.outcomes} />
          </section>
        </motion.div>
      </AnimatePresence>

      <IndustryCta />
    </div>
  );
}
