"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  FileCheck2,
  LayoutGrid,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";
import { EmptyState } from "@/components/states/EmptyState";
import { GlassCard } from "@/components/ui/GlassCard";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
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

function storySummary(story: ImpactStory) {
  return story.approach.split(".")[0] + ".";
}

function DetailList({ story }: { story: ImpactStory }) {
  const items = [
    { label: "Context", body: story.context },
    { label: "Challenge", body: story.challenge },
    { label: "Approach", body: story.approach },
    { label: "Architecture", body: story.architecture },
    { label: "Responsible AI controls", body: story.governance },
    {
      label: "Outcome pathway",
      body: story.outcomes.join(" "),
    },
  ];

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label} className="flex gap-3">
          <span
            aria-hidden
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tech-blue"
          />
          <div className="min-w-0">
            <p className="font-heading text-sm font-semibold text-navy">
              {item.label}
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted-light">
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function IllustrativeLabel() {
  return (
    <p className="mt-2 font-tech text-[0.55rem] uppercase tracking-[0.18em] text-muted-light">
      Illustrative preview
    </p>
  );
}

function TalentChart() {
  const stages = [
    "Discover",
    "Assess",
    "Engage",
    "Develop",
    "Deploy",
    "Grow",
  ];
  return (
    <GlassCard variant="soft" className="p-4">
      <p className="text-xs font-semibold text-navy">
        Candidate journey intelligence
      </p>
      <svg viewBox="0 0 320 90" className="mt-3 h-20 w-full" aria-hidden>
        <path
          d="M10 55 C40 20, 70 70, 100 40 S160 15, 190 45 S250 75, 310 30"
          fill="none"
          stroke="rgba(59,130,246,0.55)"
          strokeWidth="2.5"
        />
        {stages.map((label, i) => {
          const x = 20 + i * 50;
          const y = [55, 38, 52, 34, 48, 30][i];
          return (
            <g key={label}>
              <circle cx={x} cy={y} r="4" fill="#3b82f6" />
              <text
                x={x}
                y="82"
                textAnchor="middle"
                fontSize="8"
                fill="#5b6b7c"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          { title: "Skill signals", bars: [40, 65, 50, 78] },
          { title: "Engagement quality", path: true },
          { title: "Path to fit", radar: true },
          { title: "Learning velocity", bars: [55, 42, 70, 60] },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-lg border border-white/70 bg-white/70 p-2"
          >
            <p className="text-[0.6rem] font-medium text-muted-light">
              {card.title}
            </p>
            {"bars" in card && card.bars ? (
              <div className="mt-2 flex h-8 items-end gap-1">
                {card.bars.map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm bg-tech-blue/50"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            ) : null}
            {"path" in card && card.path ? (
              <svg viewBox="0 0 80 32" className="mt-1 h-8 w-full" aria-hidden>
                <path
                  d="M2 24 C18 8, 30 28, 44 12 S68 6, 78 18"
                  fill="none"
                  stroke="#0ea5b7"
                  strokeWidth="2"
                />
              </svg>
            ) : null}
            {"radar" in card && card.radar ? (
              <svg viewBox="0 0 48 40" className="mx-auto mt-1 h-8 w-10" aria-hidden>
                <polygon
                  points="24,4 40,16 34,34 14,34 8,16"
                  fill="rgba(59,130,246,0.15)"
                  stroke="#3b82f6"
                  strokeWidth="1"
                />
              </svg>
            ) : null}
          </div>
        ))}
      </div>
      <IllustrativeLabel />
    </GlassCard>
  );
}

function GovernmentChart() {
  const cells = Array.from({ length: 48 }, (_, i) => i);
  return (
    <GlassCard variant="soft" className="p-4">
      <p className="text-xs font-semibold text-navy">
        District prioritisation heatmap
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
        <div className="relative overflow-hidden rounded-xl border border-white/70 bg-gradient-to-br from-sky/10 to-white p-3">
          <div className="grid grid-cols-8 gap-1.5">
            {cells.map((i) => (
              <span
                key={i}
                className={cn(
                  "aspect-square rounded-full",
                  i % 7 === 0
                    ? "bg-brand/70"
                    : i % 3 === 0
                      ? "bg-tech-blue/70"
                      : "bg-tech-blue/25",
                )}
              />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/70 p-3">
          <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-light">
            Intervention prioritisation
          </p>
          <ul className="mt-2 space-y-1.5 text-xs text-navy">
            {[
              "Health outreach",
              "Education support",
              "Nutrition coverage",
              "Case follow-up",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded border border-tech-blue/40 bg-sky/20" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <IllustrativeLabel />
    </GlassCard>
  );
}

function AuditChart() {
  return (
    <GlassCard variant="soft" className="p-4">
      <p className="text-xs font-semibold text-navy">Audit evidence graph</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
        <svg viewBox="0 0 200 140" className="h-36 w-full" aria-hidden>
          <circle cx="100" cy="70" r="18" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" />
          <text x="100" y="74" textAnchor="middle" fontSize="8" fill="#0b1f3a">
            Hub
          </text>
          {[
            [40, 30, "Process"],
            [160, 30, "Policy"],
            [30, 100, "System"],
            [170, 100, "Control"],
            [100, 20, "Txn"],
            [100, 125, "Evidence"],
          ].map(([x, y, label]) => (
            <g key={String(label)}>
              <line
                x1="100"
                y1="70"
                x2={Number(x)}
                y2={Number(y)}
                stroke="rgba(59,130,246,0.35)"
              />
              <circle
                cx={Number(x)}
                cy={Number(y)}
                r="12"
                fill="white"
                stroke="#0ea5b7"
              />
              <text
                x={Number(x)}
                y={Number(y) + 3}
                textAnchor="middle"
                fontSize="6"
                fill="#5b6b7c"
              >
                {label}
              </text>
            </g>
          ))}
        </svg>
        <div className="space-y-3">
          <div className="rounded-xl border border-white/70 bg-white/70 p-3">
            <p className="text-[0.65rem] font-semibold text-muted-light">
              Risk overview
            </p>
            <div className="mt-2 flex items-center gap-3">
              <svg viewBox="0 0 36 36" className="h-12 w-12" aria-hidden>
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#e8eef6"
                  strokeWidth="4"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeDasharray="55 88"
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <ul className="space-y-1 text-[0.65rem] text-muted-light">
                <li>High · Medium · Low bands</li>
                <li>Sample distribution only</li>
              </ul>
            </div>
          </div>
          <div className="rounded-xl border border-white/70 bg-white/70 p-3">
            <p className="text-[0.65rem] font-semibold text-muted-light">
              Evidence status
            </p>
            <ul className="mt-2 space-y-2">
              {[
                { label: "Linked", w: "78%" },
                { label: "In review", w: "52%" },
                { label: "Pending", w: "34%" },
              ].map((row) => (
                <li key={row.label}>
                  <div className="mb-0.5 flex justify-between text-[0.6rem] text-muted-light">
                    <span>{row.label}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-bg-secondary">
                    <div
                      className="h-full rounded-full bg-tech-blue/70"
                      style={{ width: row.w }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <IllustrativeLabel />
    </GlassCard>
  );
}

function GovernanceChart() {
  const stages = [
    "Ideate",
    "Build",
    "Deploy",
    "Operate",
    "Review",
    "Retire",
  ];
  return (
    <GlassCard variant="soft" className="p-4">
      <p className="text-xs font-semibold text-navy">Responsible AI lifecycle</p>
      <div className="relative mx-auto mt-4 flex h-52 w-52 items-center justify-center">
        <div
          aria-hidden
          className="absolute inset-4 rounded-full border border-dashed border-tech-blue/40"
        />
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/90 bg-white/90 text-tech-blue shadow-md">
          <Shield className="h-7 w-7" aria-hidden />
        </div>
        {stages.map((label, i) => {
          const angle = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 42;
          const y = 50 + Math.sin(angle) * 42;
          return (
            <div
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/80 bg-white/90 px-2 py-1 text-[0.65rem] font-semibold text-navy shadow-sm"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {label}
            </div>
          );
        })}
      </div>
      <IllustrativeLabel />
    </GlassCard>
  );
}

function StoryVisual({ story }: { story: ImpactStory }) {
  if (story.slug.includes("talent") || story.industry === "hr") {
    return <TalentChart />;
  }
  if (story.industry === "government") {
    return <GovernmentChart />;
  }
  if (story.slug.includes("audit")) {
    return <AuditChart />;
  }
  return <GovernanceChart />;
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

  const filtered = useMemo(
    () => stories.filter((story) => activeFilter.match(story)),
    [stories, activeFilter],
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
          <div className="mt-12 space-y-16 md:space-y-20">
            {filtered.map((story) => {
              const Icon = storyIcon(story);
              const number = String(
                stories.findIndex((s) => s.id === story.id) + 1,
              ).padStart(2, "0");

              return (
                <article
                  key={story.id}
                  id={story.slug}
                  className="scroll-mt-36 lg:scroll-mt-40"
                >
                  <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr_1fr] lg:items-start lg:gap-10">
                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="font-tech text-3xl text-cyan/80 md:text-4xl">
                          {number}
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/80 text-tech-blue shadow-sm">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                      </div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-light">
                        {industryLabel(story.industry)} · {story.clientLabel}
                      </p>
                      <h2 className="mt-2 font-heading text-xl font-semibold text-navy md:text-2xl text-balance">
                        {story.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-light">
                        {storySummary(story)}
                      </p>
                      <Link
                        href={`/impact-stories#${story.slug}`}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-tech-blue transition hover:text-navy"
                      >
                        View details
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      {(story.relatedProducts.length > 0 ||
                        story.relatedCapabilities.length > 0) && (
                        <div className="mt-6 space-y-3">
                          {story.relatedProducts.length > 0 ? (
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider text-muted-light">
                                Related products
                              </p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {story.relatedProducts.map((slug) => (
                                  <Link
                                    key={slug}
                                    href={`/products?product=${slug}`}
                                    className="rounded-md border border-[var(--border-light)] bg-white/70 px-2.5 py-1 text-xs font-medium text-navy transition hover:border-tech-blue/40"
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
                                    className="rounded-md border border-[var(--border-light)] bg-white/70 px-2.5 py-1 text-xs font-medium text-muted-light transition hover:border-tech-blue/40 hover:text-navy"
                                  >
                                    {capabilityLabel(slug)}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>

                    <div>
                      <StoryVisual story={story} />
                    </div>

                    <div>
                      <DetailList story={story} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
