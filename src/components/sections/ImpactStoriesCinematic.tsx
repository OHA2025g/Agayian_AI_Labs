"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  FileCheck2,
  Layers3,
  LayoutGrid,
  MapPinned,
  Route,
  Shield,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";
import { EmptyState } from "@/components/states/EmptyState";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { ImpactStorySculpture } from "@/components/visualisations/impact/ImpactStorySculpture";
import { capabilities as staticCapabilities } from "@/data/capabilities";
import { impactStories as staticStories } from "@/data/impactStories";
import { industries as staticIndustries } from "@/data/industries";
import { products as staticProducts } from "@/data/products";
import type { Capability, ImpactStory, Industry, Product } from "@/types";
import { cn } from "@/lib/utils";

type FilterId = "all" | "talent" | "government" | "audit" | "governance";

const filterPills: {
  id: FilterId;
  label: string;
  icon: LucideIcon;
  match: (story: ImpactStory) => boolean;
}[] = [
  {
    id: "all",
    label: "All",
    icon: LayoutGrid,
    match: () => true,
  },
  {
    id: "talent",
    label: "Talent",
    icon: Users,
    match: (s) =>
      s.industry === "hr" ||
      s.outcomeCategory.toLowerCase().includes("talent") ||
      s.slug.includes("talent"),
  },
  {
    id: "government",
    label: "Government",
    icon: Building2,
    match: (s) =>
      s.industry === "government" || s.solutionType.includes("Government"),
  },
  {
    id: "audit",
    label: "Audit",
    icon: FileCheck2,
    match: (s) =>
      s.slug.includes("audit") ||
      s.outcomeCategory.toLowerCase().includes("audit"),
  },
  {
    id: "governance",
    label: "Governance",
    icon: Shield,
    match: (s) =>
      s.solutionType === "Governance" ||
      s.slug.includes("governance") ||
      s.industry === "banking",
  },
];

function storyIcon(story: ImpactStory): LucideIcon {
  if (story.slug.includes("talent") || story.industry === "hr") return Users;
  if (story.industry === "government") return Building2;
  if (story.slug.includes("audit")) return FileCheck2;
  return Shield;
}

function firstSentence(text: string) {
  const match = text.match(/^[^.!?]+[.!?]/);
  const sentence = match ? match[0].trim() : text;
  if (sentence.length <= 96) return sentence;
  return `${sentence.slice(0, 94).replace(/\s+\S*$/, "")}.`;
}

function listingCopy(story: ImpactStory): {
  summary: string;
  details: { label: string; body: string; icon: LucideIcon }[];
} {
  if (story.slug.includes("talent") || story.industry === "hr") {
    return {
      summary:
        "Designing a privacy-first talent intelligence layer that personalises journeys and improves match quality across the lifecycle.",
      details: [
        {
          label: "Context",
          body: "Talent programs faced high drop-offs, skill gaps and low visibility.",
          icon: Users,
        },
        {
          label: "Challenge",
          body: "Fragmented data and manual processes limited speed and personalisation.",
          icon: FileCheck2,
        },
        {
          label: "Approach",
          body: "AI-driven matching, pathway orchestration and continuous skilling nudges.",
          icon: MapPinned,
        },
        {
          label: "Architecture",
          body: "Event streams, feature layer, models, APIs and journey orchestration.",
          icon: Layers3,
        },
        {
          label: "Responsible AI controls",
          body: "Fairness, consent, explainability and data minimisation.",
          icon: Shield,
        },
        {
          label: "Outcome pathway",
          body: "Better discovery, stronger matches, continuous skill growth.",
          icon: Route,
        },
      ],
    };
  }

  return {
    summary: firstSentence(story.approach),
    details: [
      { label: "Context", body: firstSentence(story.context), icon: Building2 },
      {
        label: "Challenge",
        body: firstSentence(story.challenge),
        icon: ShieldAlert,
      },
      { label: "Approach", body: firstSentence(story.approach), icon: MapPinned },
      {
        label: "Architecture",
        body: firstSentence(story.architecture),
        icon: Layers3,
      },
      {
        label: "Responsible AI controls",
        body: firstSentence(story.governance),
        icon: Shield,
      },
      {
        label: "Outcome pathway",
        body: firstSentence(story.outcomes[0] ?? ""),
        icon: Route,
      },
    ],
  };
}

function listingRank(story: ImpactStory): number {
  if (story.slug.includes("talent") || story.industry === "hr") return 0;
  if (story.industry === "government") return 1;
  if (story.slug.includes("audit")) return 2;
  return 3;
}

function DetailList({
  items,
}: {
  items: { label: string; body: string; icon: LucideIcon }[];
}) {
  return (
    <ul className="relative flex flex-col gap-2">
      <span
        aria-hidden
        className="absolute bottom-2 left-[3px] top-2 w-px bg-[#d4e6f2]"
      />
      {items.map(({ label, body, icon: Icon }) => (
        <li key={label} className="relative flex gap-2.5">
          <span
            aria-hidden
            className="relative z-10 mt-1.5 h-2 w-2 shrink-0 rounded-full bg-tech-blue"
          />
          <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tech-blue" />
          <div className="min-w-0">
            <p className="text-[0.8rem] font-semibold leading-tight text-navy">
              {label}
            </p>
            <p className="mt-0.5 text-[0.72rem] leading-snug text-muted-light">
              {body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ImpactStoriesCinematic({
  stories = staticStories,
  industries = staticIndustries,
  capabilities = staticCapabilities,
  products = staticProducts,
}: {
  stories?: ImpactStory[];
  industries?: Industry[];
  capabilities?: Capability[];
  products?: Product[];
}) {
  const industryLabel = (slug: string) =>
    industries.find((item) => item.slug === slug)?.name ?? slug;
  const capabilityLabel = (slug: string) =>
    capabilities.find((item) => item.slug === slug)?.shortName ??
    capabilities.find((item) => item.slug === slug)?.name ??
    slug;
  const productLabel = (slug: string) =>
    products.find((item) => item.slug === slug)?.name ?? slug;

  const [filter, setFilter] = useState<FilterId>("all");

  const activeFilter = filterPills.find((f) => f.id === filter) ?? filterPills[0];

  const orderedStories = useMemo(
    () => [...stories].sort((a, b) => listingRank(a) - listingRank(b)),
    [stories],
  );

  const filtered = useMemo(
    () => orderedStories.filter((story) => activeFilter.match(story)),
    [orderedStories, activeFilter],
  );

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          role="tablist"
          aria-label="Filter impact stories"
          className="flex flex-wrap gap-2"
        >
          {filterPills.map(({ id, label, icon: Icon }) => {
            const active = filter === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "border-brand bg-brand text-white shadow-sm"
                    : "border-[var(--border-light)] bg-white/70 text-navy hover:border-tech-blue/40",
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {label}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              className="border-[var(--border-soft)] bg-white/60 text-navy [&_h3]:text-navy [&_p]:text-muted-light"
              title="No stories match this filter"
              description="Choose another category to browse anonymised sector patterns. No invented numerical outcomes."
              action={
                <SecondaryButton type="button" onClick={() => setFilter("all")}>
                  Show all stories
                </SecondaryButton>
              }
            />
          </div>
        ) : (
          <div className="mt-10 space-y-8 md:space-y-9">
            {filtered.map((story) => {
              const Icon = storyIcon(story);
              const number = String(
                orderedStories.findIndex((s) => s.id === story.id) + 1,
              ).padStart(2, "0");
              const { summary, details } = listingCopy(story);

              return (
                <article
                  key={story.id}
                  id={story.slug}
                  className="scroll-mt-36 rounded-[1.5rem] bg-[#f6f8fb] px-5 py-5 lg:scroll-mt-40 sm:px-6 sm:py-5"
                >
                  <div className="grid gap-5 lg:grid-cols-[minmax(14rem,0.78fr)_minmax(0,1.55fr)_minmax(15rem,0.88fr)] lg:items-stretch lg:gap-5">
                    <div className="flex min-h-0 flex-col">
                      <span className="font-tech text-[3.25rem] leading-none text-[#8ec8e8]">
                        {number}
                      </span>
                      <span className="mt-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#cfe6f5] bg-[#f6f8fb] text-tech-blue">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <h2 className="mt-3.5 font-heading text-lg font-semibold leading-snug text-navy md:text-[1.45rem] text-balance">
                        {story.title}
                      </h2>
                      <p className="mt-2 max-w-sm text-[0.8125rem] leading-relaxed text-muted-light">
                        {summary}
                      </p>
                      <p className="mt-3 text-[0.62rem] font-medium uppercase tracking-wider text-muted-light">
                        {industryLabel(story.industry)} · {story.clientLabel}
                      </p>
                      <Link
                        href={`/impact-stories/${story.slug}`}
                        className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#c5def0] bg-[#f6f8fb] px-3.5 py-1.5 text-sm font-semibold text-navy transition hover:border-tech-blue/50 lg:mt-auto"
                      >
                        View details
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tech-blue text-white">
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </span>
                      </Link>
                    </div>

                    <div className="flex min-h-0 items-center">
                      <ImpactStorySculpture story={story} />
                    </div>

                    <div className="min-h-0">
                      <DetailList items={details} />
                    </div>
                  </div>

                  {(story.relatedProducts.length > 0 ||
                    story.relatedCapabilities.length > 0) && (
                    <div className="mt-4 grid gap-4 border-t border-[#e4ebf2] pt-4 sm:grid-cols-2">
                      {story.relatedProducts.length > 0 ? (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-light">
                            Related products
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {story.relatedProducts.map((slug) => (
                              <Link
                                key={slug}
                                href={`/products/${slug}`}
                                className="rounded-full border border-[#d7e1ea] bg-white px-2.5 py-1 text-xs font-medium text-navy transition hover:border-tech-blue/40"
                              >
                                {productLabel(slug)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : null}
                      {story.relatedCapabilities.length > 0 ? (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-light">
                            Related capabilities
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {story.relatedCapabilities.map((slug) => (
                              <Link
                                key={slug}
                                href={`/capabilities#${slug}`}
                                className="rounded-full border border-[#d7e1ea] bg-white px-2.5 py-1 text-xs font-medium text-muted-light transition hover:border-tech-blue/40 hover:text-navy"
                              >
                                {capabilityLabel(slug)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
