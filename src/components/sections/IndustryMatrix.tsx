"use client";

import { useState } from "react";
import { industries as staticIndustries } from "@/data/industries";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { Badge } from "@/components/ui/badge";
import type { Industry } from "@/types";

export function IndustryMatrix({
  items = staticIndustries,
}: {
  items?: Industry[];
}) {
  const [active, setActive] = useState(items[0]?.slug ?? "");
  const selected =
    items.find((industry) => industry.slug === active) ?? items[0];

  if (!selected) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <div className="space-y-2">
        {items.map((industry) => (
          <IndustryCard
            key={industry.id}
            industry={industry}
            active={industry.slug === active}
            onSelect={setActive}
          />
        ))}
      </div>
      <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
        <h3 className="font-heading text-2xl font-semibold text-text-light">
          {selected.name}
        </h3>
        <p className="mt-2 text-muted-light">{selected.summary}</p>
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0e7490]">
            Relevant use cases
          </p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {selected.workflows.map((workflow) => (
              <li
                key={workflow.title}
                className="rounded-lg border border-black/10 bg-[#f4f7fb] p-4"
              >
                <p className="font-medium text-text-light">{workflow.title}</p>
                <p className="mt-1 text-sm text-muted-light">
                  {workflow.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {selected.opportunities.slice(0, 4).map((item) => (
            <Badge key={item} variant="cyan">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
