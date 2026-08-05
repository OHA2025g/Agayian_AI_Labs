"use client";

import { useState } from "react";
import { ImpactStoryCard } from "@/components/cards/ImpactStoryCard";
import { FilterBar } from "@/components/ui/FilterBar";
import { EmptyState } from "@/components/states/EmptyState";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { capabilities as staticCapabilities } from "@/data/capabilities";
import { impactStories as staticStories } from "@/data/impactStories";
import { industries as staticIndustries } from "@/data/industries";
import type { Capability, ImpactStory, Industry } from "@/types";

function unique(values: string[]) {
  return Array.from(new Set(values)).sort();
}

export function ImpactStoriesExplorer({
  stories = staticStories,
  industries = staticIndustries,
  capabilities = staticCapabilities,
}: {
  stories?: ImpactStory[];
  industries?: Industry[];
  capabilities?: Capability[];
}) {
  const industryLabel = (slug: string) =>
    industries.find((item) => item.slug === slug)?.name ?? slug;
  const capabilityLabel = (slug: string) =>
    capabilities.find((item) => item.slug === slug)?.shortName ??
    capabilities.find((item) => item.slug === slug)?.name ??
    slug;

  const [industry, setIndustry] = useState("All");
  const [capability, setCapability] = useState("All");
  const [solutionType, setSolutionType] = useState("All");
  const [outcome, setOutcome] = useState("All");

  const industryOptions = unique(stories.map((s) => s.industry));
  const capabilityOptions = unique(stories.map((s) => s.capability));
  const solutionTypes = unique(stories.map((s) => s.solutionType));
  const outcomes = unique(stories.map((s) => s.outcomeCategory));

  const filtered = stories.filter((story) => {
    return (
      (industry === "All" || story.industry === industry) &&
      (capability === "All" || story.capability === capability) &&
      (solutionType === "All" || story.solutionType === solutionType) &&
      (outcome === "All" || story.outcomeCategory === outcome)
    );
  });

  const hasFilters =
    industry !== "All" ||
    capability !== "All" ||
    solutionType !== "All" ||
    outcome !== "All";

  function clearFilters() {
    setIndustry("All");
    setCapability("All");
    setSolutionType("All");
    setOutcome("All");
  }

  return (
    <div>
      <div className="grid gap-4 rounded-xl border border-white/10 bg-bg-elevated/40 p-5 md:grid-cols-2 xl:grid-cols-4">
        <FilterBar
          label="Industry"
          options={["All", ...industryOptions.map(industryLabel)]}
          value={industry === "All" ? "All" : industryLabel(industry)}
          onChange={(value) => {
            if (value === "All") {
              setIndustry("All");
              return;
            }
            const match = industryOptions.find(
              (slug) => industryLabel(slug) === value,
            );
            setIndustry(match ?? "All");
          }}
        />
        <FilterBar
          label="Capability"
          options={["All", ...capabilityOptions.map(capabilityLabel)]}
          value={capability === "All" ? "All" : capabilityLabel(capability)}
          onChange={(value) => {
            if (value === "All") {
              setCapability("All");
              return;
            }
            const match = capabilityOptions.find(
              (slug) => capabilityLabel(slug) === value,
            );
            setCapability(match ?? "All");
          }}
        />
        <FilterBar
          label="Solution type"
          options={["All", ...solutionTypes]}
          value={solutionType}
          onChange={setSolutionType}
        />
        <FilterBar
          label="Business outcome"
          options={["All", ...outcomes]}
          value={outcome}
          onChange={setOutcome}
        />
      </div>

      {hasFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="text-sm text-muted-dark">
            Showing {filtered.length} of {stories.length} stories
          </p>
          <SecondaryButton type="button" onClick={clearFilters}>
            Clear filters
          </SecondaryButton>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No stories match these filters"
            description="Adjust industry, capability, solution type or outcome filters. Stories use anonymised client labels only — no invented numerical outcomes."
            action={
              <SecondaryButton type="button" onClick={clearFilters}>
                Reset filters
              </SecondaryButton>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {filtered.map((story) => (
            <ImpactStoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}
