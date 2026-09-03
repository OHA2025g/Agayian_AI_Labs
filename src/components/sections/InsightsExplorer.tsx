"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Bot,
  Building2,
  Compass,
  FileCheck,
  LayoutGrid,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { InsightCard } from "@/components/cards/InsightCard";
import { EmptyState } from "@/components/states/EmptyState";
import { FilterPills } from "@/components/ui/FilterPills";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { insightListingOrder } from "@/config/insight-sculptures";
import type { Insight } from "@/types";

const filterPills: {
  id: string;
  label: string;
  icon: LucideIcon;
  match: (insight: Insight) => boolean;
}[] = [
  { id: "all", label: "All", icon: LayoutGrid, match: () => true },
  {
    id: "strategy",
    label: "AI Strategy",
    icon: Compass,
    match: (insight) => insight.category === "AI Strategy",
  },
  {
    id: "governance",
    label: "AI Governance",
    icon: Shield,
    match: (insight) =>
      insight.category === "AI Governance" ||
      insight.category === "Responsible AI",
  },
  {
    id: "coe",
    label: "AI CoE",
    icon: Sparkles,
    match: (insight) => insight.category === "AI Centre of Excellence",
  },
  {
    id: "agentic",
    label: "Agentic AI",
    icon: Bot,
    match: (insight) => insight.category === "Agentic AI",
  },
  {
    id: "government",
    label: "Government",
    icon: Building2,
    match: (insight) => insight.category === "Government Transformation",
  },
  {
    id: "audit",
    label: "Audit",
    icon: FileCheck,
    match: (insight) => insight.category === "Audit and Compliance",
  },
];

function listingRank(insight: Insight) {
  const index = (insightListingOrder as readonly string[]).indexOf(
    insight.slug,
  );
  return index === -1 ? 100 : index;
}

export function InsightsExplorer({
  items,
  excludeSlug,
}: {
  items: Insight[];
  excludeSlug?: string;
}) {
  const params = useSearchParams();
  const query = (params.get("q") ?? "").trim().toLowerCase();
  const [category, setCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const activeFilter =
    filterPills.find((pill) => pill.id === category) ?? filterPills[0];

  const filtered = useMemo(() => {
    return items
      .filter((insight) => {
        if (excludeSlug && insight.slug === excludeSlug) return false;
        if (!activeFilter.match(insight)) return false;
        if (!query) return true;
        return (
          insight.title.toLowerCase().includes(query) ||
          insight.excerpt.toLowerCase().includes(query) ||
          insight.category.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => listingRank(a) - listingRank(b));
  }, [items, excludeSlug, activeFilter, query]);

  const previewCount = category === "all" && !query ? 7 : filtered.length;
  const visible = showAll ? filtered : filtered.slice(0, previewCount);
  const hasMore = filtered.length > visible.length;
  const firstRow = visible.slice(0, 4);
  const secondRow = visible.slice(4, 7);
  const extraRows = visible.slice(7);

  return (
    <div className="space-y-10">
      <FilterPills
        items={filterPills.map(({ id, label, icon: Icon }) => ({
          id,
          label,
          icon: (
            <Icon
              className={`h-3.5 w-3.5 ${id === category ? "" : "text-tech-blue"}`}
              aria-hidden
            />
          ),
        }))}
        activeId={category}
        onChange={(id) => {
          setCategory(id);
          setShowAll(false);
        }}
      />

      {filtered.length === 0 ? (
        <EmptyState
          className="border-[var(--border-soft)] bg-white/70 text-navy [&_h3]:text-navy [&_p]:text-muted-light"
          title="No insights in this category"
          description="Choose another topic or return to All to browse the full library."
          action={
            <SecondaryButton type="button" onClick={() => setCategory("all")}>
              Show all insights
            </SecondaryButton>
          }
        />
      ) : (
        <>
          <div className="space-y-6 md:space-y-8">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
              {firstRow.map((insight, index) => (
                <InsightCard key={insight.id} insight={insight} index={index} />
              ))}
            </div>
            {secondRow.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
                {secondRow.map((insight, index) => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    index={index + 4}
                  />
                ))}
              </div>
            ) : null}
            {extraRows.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
                {extraRows.map((insight, index) => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    index={index + 7}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {hasMore ? (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-tech-blue hover:text-navy"
              >
                View all insights
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
