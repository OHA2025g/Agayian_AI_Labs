"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Layer = {
  slug: string;
  shortName: string;
};

export function CapabilitiesLayerNav({ layers }: { layers: Layer[] }) {
  const [active, setActive] = useState(layers[0]?.slug ?? "");
  const slugKey = useMemo(
    () => layers.map((layer) => layer.slug).join("|"),
    [layers],
  );

  useEffect(() => {
    const ids = slugKey ? slugKey.split("|") : [];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.45] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slugKey]);

  return (
    <nav
      aria-label="Architecture layers"
      className="sticky top-14 z-30 border-y border-[var(--border-soft)] bg-white/95"
    >
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        {layers.map((layer) => {
          const isActive = layer.slug === active;
          return (
            <a
              key={layer.slug}
              href={`#${layer.slug}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-sky/15 text-navy shadow-[inset_0_-2px_0_0_var(--color-brand)]"
                  : "text-muted-light hover:bg-bg-secondary hover:text-navy",
              )}
            >
              {layer.shortName}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
