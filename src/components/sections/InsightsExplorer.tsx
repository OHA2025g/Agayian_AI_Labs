"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { InsightCard } from "@/components/cards/InsightCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { EmptyState } from "@/components/states/EmptyState";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/badge";
import { FilterBar } from "@/components/ui/FilterBar";
import { SearchInput } from "@/components/ui/SearchInput";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { siteConfig } from "@/config/site";
import { insights as staticInsights } from "@/data/insights";
import type { Insight } from "@/types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function InsightsExplorer({
  items = staticInsights,
}: {
  items?: Insight[];
}) {
  const featured = items.find((item) => item.featured) ?? items[0];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");

  const categories = useMemo(
    () => Array.from(new Set(items.map((insight) => insight.category))).sort(),
    [items],
  );

  const types = useMemo(
    () => Array.from(new Set(items.map((insight) => insight.type))).sort(),
    [items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((insight) => {
      const matchesCategory =
        category === "All" || insight.category === category;
      const matchesType = type === "All" || insight.type === type;
      const haystack =
        `${insight.title} ${insight.excerpt} ${insight.category} ${insight.type} ${insight.author} ${insight.body.join(" ")}`.toLowerCase();
      return matchesCategory && matchesType && (!q || haystack.includes(q));
    });
  }, [items, category, type, query]);

  const hasFilters =
    query.trim() !== "" || category !== "All" || type !== "All";

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setType("All");
  }

  return (
    <div className="scene-editorial -mx-4 space-y-10 px-4 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      {featured && !hasFilters && (
        <Reveal>
          <article
            id={featured.slug}
            className="scroll-mt-28 overflow-hidden rounded-2xl border border-border-light bg-surface-white p-6 shadow-sm md:p-8 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
          >
            <div className="flex flex-wrap gap-2">
              <Badge variant="cyan">Featured</Badge>
              <Badge>{featured.type}</Badge>
              <Badge variant="violet">{featured.category}</Badge>
            </div>
            <h2 className="mt-4 font-heading text-2xl font-semibold text-text-light md:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-3xl text-muted-light">{featured.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-4 font-tech text-xs text-muted-light">
              <span>{featured.author}</span>
              <span>{formatDate(featured.publishedAt)}</span>
              <span>{featured.readingTime} read</span>
            </div>
            <div className="mt-6 space-y-3 border-t border-border-light pt-6 text-sm leading-relaxed text-muted-light">
              {featured.body.slice(0, 2).map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <Link
              href={`/insights/${featured.slug}`}
              className="mt-6 inline-flex text-sm font-semibold text-brand hover:text-text-light"
            >
              Read full article →
            </Link>
          </article>
        </Reveal>
      )}

      <div className="space-y-4 rounded-xl border border-border-light bg-surface-white p-5 shadow-sm">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search insights by title, topic or keyword"
          id="insights-search"
        />
        <FilterBar
          label="Category"
          options={["All", ...categories]}
          value={category}
          onChange={setCategory}
        />
        <FilterBar
          label="Type"
          options={["All", ...types]}
          value={type}
          onChange={setType}
        />
        {hasFilters && (
          <SecondaryButton type="button" onClick={clearFilters}>
            Clear filters
          </SecondaryButton>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No insights match your search"
          description="Try a broader keyword or clear category and type filters to browse the full library."
          action={
            <SecondaryButton type="button" onClick={clearFilters}>
              Reset filters
            </SecondaryButton>
          }
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((insight) => (
            <article
              key={insight.id}
              id={insight.slug}
              className="scroll-mt-28"
            >
              <InsightCard insight={insight} />
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 px-1 text-xs text-muted-dark">
                <span>{formatDate(insight.publishedAt)}</span>
                <span>{insight.readingTime}</span>
                <span>{insight.author}</span>
              </div>
            </article>
          ))}
        </div>
      )}

      <Reveal>
        <div className="rounded-xl border border-border-light bg-surface-white p-6 shadow-sm">
          <h3 className="font-heading text-xl font-semibold text-text-light">
            Stay informed on responsible AI
          </h3>
          <p className="mt-2 text-sm text-muted-light">
            Subscribe for frameworks, guides and practical perspectives. When
            mail delivery is configured, subscriptions notify our team. You can
            also email {siteConfig.contactEmail}.
          </p>
          <div className="mt-4 max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
