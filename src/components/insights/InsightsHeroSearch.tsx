"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function InsightsHeroSearch() {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  return (
    <form
      className="relative mt-8 max-w-xl"
      onSubmit={(event) => {
        event.preventDefault();
        const next = new URLSearchParams(params.toString());
        const value = query.trim();
        if (value) next.set("q", value);
        else next.delete("q");
        const suffix = next.toString();
        router.replace(
          suffix ? `/insights?${suffix}#insights-library` : "/insights#insights-library",
          { scroll: false },
        );
      }}
    >
      <label htmlFor="insights-search" className="sr-only">
        Search insights
      </label>
      <input
        id="insights-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search insights, frameworks, topics..."
        className="h-12 w-full rounded-full border border-[#d7e1ea] bg-white px-5 pr-12 text-sm text-navy outline-none transition placeholder:text-muted-light focus:border-tech-blue/50"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-light transition hover:text-navy"
        aria-label="Search insights"
      >
        <Search className="h-5 w-5" aria-hidden />
      </button>
    </form>
  );
}
