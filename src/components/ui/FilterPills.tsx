import { cn } from "@/lib/utils";

export type FilterPill = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

type FilterPillsProps = {
  items: FilterPill[];
  activeId: string;
  onChange?: (id: string) => void;
  className?: string;
  /** When true, renders as links via hrefBuilder */
  hrefBuilder?: (id: string) => string;
};

export function FilterPills({
  items,
  activeId,
  onChange,
  className,
  hrefBuilder,
}: FilterPillsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2",
        className,
      )}
      role="tablist"
      aria-label="Filters"
    >
      {items.map((item) => {
        const active = item.id === activeId;
        const classes = cn(
          "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition",
          active
            ? "border-brand bg-brand text-white shadow-[0_8px_20px_rgba(255,77,94,0.28)]"
            : "border-[var(--border-light)] bg-white/80 text-navy hover:border-tech-blue/35",
        );

        if (hrefBuilder) {
          return (
            <a key={item.id} href={hrefBuilder(item.id)} className={classes}>
              {item.icon}
              {item.label}
            </a>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={classes}
            onClick={() => onChange?.(item.id)}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
