"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  Compass,
  FileCheck,
  LayoutGrid,
  Shield,
  Sparkles,
  Bot,
  type LucideIcon,
} from "lucide-react";
import { InsightCard } from "@/components/cards/InsightCard";
import { EmptyState } from "@/components/states/EmptyState";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { FilterPills } from "@/components/ui/FilterPills";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import type { Insight } from "@/types";

const categoryIcons: Record<string, LucideIcon> = {
  All: LayoutGrid,
  "AI Strategy": Compass,
  "AI Governance": Shield,
  "Responsible AI": Shield,
  "AI Centre of Excellence": Sparkles,
  "Agentic AI": Bot,
  "Government Transformation": Building2,
  "HR Technology": Sparkles,
  "Audit and Compliance": FileCheck,
};

function shortLabel(category: string) {
  if (category === "AI Centre of Excellence") return "AI CoE";
  if (category === "Government Transformation") return "Government";
  if (category === "Audit and Compliance") return "Audit";
  if (category === "HR Technology") return "HR Tech";
  return category;
}

export function InsightsExplorer({
  items,
  excludeSlug,
}: {
  items: Insight[];
  /** Hide featured (or any) article from the grid when shown above */
  excludeSlug?: string;
}) {
  const [category, setCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(items.map((insight) => insight.category))).sort(),
    [items],
  );

  const pills = useMemo(
    () =>
      ["All", ...categories].map((id) => {
        const Icon = categoryIcons[id] ?? Sparkles;
        return {
          id,
          label: shortLabel(id),
          icon: (
            <Icon
              className={`h-3.5 w-3.5 ${id === "All" || id === category ? "" : "text-tech-blue"}`}
              aria-hidden
            />
          ),
        };
      }),
    [categories, category],
  );

  const filtered = useMemo(() => {
    return items.filter((insight) => {
      if (excludeSlug && insight.slug === excludeSlug) return false;
      return category === "All" || insight.category === category;
    });
  }, [items, category, excludeSlug]);

  const visible = showAll ? filtered : filtered.slice(0, 7);
  const hasMore = filtered.length > visible.length;

  return (
    <div className="space-y-8">
      <FilterPills
        items={pills}
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
            <SecondaryButton type="button" onClick={() => setCategory("All")}>
              Show all insights
            </SecondaryButton>
          }
        />
      ) : (
        <>
          <RevealGroup className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {visible.map((insight, index) => (
              <RevealItem key={insight.id}>
                <InsightCard insight={insight} index={index} />
              </RevealItem>
            ))}
          </RevealGroup>

          {hasMore ? (
            <Reveal className="flex justify-center">
              <SecondaryButton type="button" onClick={() => setShowAll(true)}>
                View all insights
              </SecondaryButton>
            </Reveal>
          ) : null}
        </>
      )}
    </div>
  );
}
