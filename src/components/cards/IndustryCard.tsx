import type { Industry } from "@/types";
import { cn } from "@/lib/utils";

export function IndustryCard({
  industry,
  active,
  onSelect,
  className,
}: {
  industry: Industry;
  active?: boolean;
  onSelect?: (slug: string) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(industry.slug)}
      className={cn(
        "w-full rounded-xl border p-4 text-left transition",
        active
          ? "border-cyan/50 bg-cyan/10 shadow-sm"
          : "border-black/10 bg-white hover:border-cyan/35",
        className,
      )}
    >
      <p className="font-heading text-base font-semibold text-text-light">
        {industry.name}
      </p>
      <p className="mt-1 text-sm text-muted-light">{industry.summary}</p>
    </button>
  );
}
