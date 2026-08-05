"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FilterBar } from "@/components/ui/FilterBar";
import { EmptyState } from "@/components/states/EmptyState";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Badge } from "@/components/ui/badge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { capabilities as staticCapabilities } from "@/data/capabilities";
import { impactStories as staticStories } from "@/data/impactStories";
import { industries as staticIndustries } from "@/data/industries";
import { products as staticProducts } from "@/data/products";
import type { Capability, ImpactStory, Industry, Product } from "@/types";
import { cn } from "@/lib/utils";

function unique(values: string[]) {
  return Array.from(new Set(values)).sort();
}

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function getHashSnapshot() {
  return window.location.hash.replace("#", "") || null;
}

function setStoryHash(slug: string | null) {
  const url = slug ? `/impact-stories#${slug}` : "/impact-stories";
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
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

  const hashSlug = useSyncExternalStore(
    subscribeHash,
    getHashSnapshot,
    () => null,
  );
  const expanded =
    hashSlug && stories.some((s) => s.slug === hashSlug) ? hashSlug : null;

  const [industry, setIndustry] = useState("All");
  const [capability, setCapability] = useState("All");
  const [solutionType, setSolutionType] = useState("All");
  const [outcome, setOutcome] = useState("All");

  const industryOptions = unique(stories.map((s) => s.industry));
  const capabilityOptions = unique(stories.map((s) => s.capability));
  const solutionTypes = unique(stories.map((s) => s.solutionType));
  const outcomes = unique(stories.map((s) => s.outcomeCategory));

  const filtered = useMemo(
    () =>
      stories.filter((story) => {
        return (
          (industry === "All" || story.industry === industry) &&
          (capability === "All" || story.capability === capability) &&
          (solutionType === "All" || story.solutionType === solutionType) &&
          (outcome === "All" || story.outcomeCategory === outcome)
        );
      }),
    [stories, industry, capability, solutionType, outcome],
  );

  const hasFilters =
    industry !== "All" ||
    capability !== "All" ||
    solutionType !== "All" ||
    outcome !== "All";

  useEffect(() => {
    if (!expanded) return;
    requestAnimationFrame(() => {
      document.getElementById(expanded)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [expanded]);

  function toggleStory(slug: string) {
    setStoryHash(expanded === slug ? null : slug);
  }

  function clearFilters() {
    setIndustry("All");
    setCapability("All");
    setSolutionType("All");
    setOutcome("All");
  }

  return (
    <div className="space-y-8">
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
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-muted-dark">
            Showing {filtered.length} of {stories.length} stories
          </p>
          <SecondaryButton type="button" onClick={clearFilters}>
            Clear filters
          </SecondaryButton>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          title="No stories match these filters"
          description="Adjust filters to browse anonymised sector patterns. No invented numerical outcomes."
          action={
            <SecondaryButton type="button" onClick={clearFilters}>
              Reset filters
            </SecondaryButton>
          }
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((story, index) => {
            const isOpen = expanded === story.slug;
            const tone = index % 2 === 0 ? "scene-navy" : "scene-minimal";

            return (
              <article
                key={story.id}
                id={story.slug}
                className={cn(
                  "scroll-mt-36 overflow-hidden rounded-2xl border border-white/10 lg:scroll-mt-40",
                  tone,
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleStory(story.slug)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${story.slug}`}
                  className="flex w-full items-start justify-between gap-4 p-6 text-left md:p-8"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="violet">
                        {industryLabel(story.industry)}
                      </Badge>
                      <Badge>{story.clientLabel}</Badge>
                      <Badge variant="cyan">{story.solutionType}</Badge>
                    </div>
                    <h3 className="mt-4 font-heading text-xl font-semibold text-text-on-dark md:text-2xl">
                      {story.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-dark md:text-base">
                      {story.challenge}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "mt-2 h-5 w-5 shrink-0 text-cyan transition-transform",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>

                <div
                  id={`panel-${story.slug}`}
                  hidden={!isOpen}
                  className="border-t border-white/10 px-6 pb-8 pt-2 md:px-8"
                >
                  <div className="grid gap-8 lg:grid-cols-2">
                    <StoryBlock title="Sector" body={industryLabel(story.industry)} />
                    <StoryBlock
                      title="Outcome category"
                      body={story.outcomeCategory}
                      accent
                    />
                    <StoryBlock title="Challenge" body={story.challenge} />
                    <StoryBlock title="Context" body={story.context} />
                    <StoryBlock title="Approach" body={story.approach} />
                    <StoryBlock
                      title="Architecture"
                      body={story.architecture}
                    />
                    <StoryBlock
                      title="Governance"
                      body={story.governance}
                      className="lg:col-span-2"
                    />
                  </div>

                  <div className="mt-8">
                    <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-cyan">
                      Outcomes
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {story.outcomes.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-sm leading-relaxed text-muted-dark"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-6">
                    {story.relatedProducts.length > 0 && (
                      <div>
                        <h4 className="font-heading text-sm font-semibold text-text-on-dark">
                          Related products
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {story.relatedProducts.map((slug) => (
                            <Link
                              key={slug}
                              href={`/products?product=${slug}`}
                              className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-cyan transition hover:border-cyan/40 hover:text-white"
                            >
                              {productLabel(slug)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {story.relatedCapabilities.length > 0 && (
                      <div>
                        <h4 className="font-heading text-sm font-semibold text-text-on-dark">
                          Related capabilities
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {story.relatedCapabilities.map((slug) => (
                            <Link
                              key={slug}
                              href={`/capabilities#${slug}`}
                              className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-muted-dark transition hover:border-violet/40 hover:text-white"
                            >
                              {capabilityLabel(slug)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8">
                    <PrimaryButton href="/contact?interest=consultation">
                      Discuss a similar engagement
                    </PrimaryButton>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StoryBlock({
  title,
  body,
  accent,
  className,
}: {
  title: string;
  body: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-white/10 bg-bg-primary/40 p-5", className)}>
      <h4 className="font-tech text-[0.65rem] uppercase tracking-[0.18em] text-cyan">
        {title}
      </h4>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed",
          accent ? "font-heading font-semibold text-cyan" : "text-muted-dark",
        )}
      >
        {body}
      </p>
    </div>
  );
}
