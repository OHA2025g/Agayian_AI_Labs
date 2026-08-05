"use client";

import { cn } from "@/lib/utils";

export function FilterBar({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: readonly string[] | string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-dark">
        {label}
      </p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-xs font-medium transition",
                active
                  ? "border-cyan/40 bg-cyan/15 text-text-on-dark"
                  : "border-white/10 bg-white/5 text-muted-dark hover:border-white/25",
              )}
              aria-pressed={active}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
