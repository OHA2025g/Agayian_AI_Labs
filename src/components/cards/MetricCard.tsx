import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  hint,
  tone = "default",
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "cyan" | "brand" | "violet" | "success" | "warning";
  className?: string;
}) {
  const valueClass =
    tone === "cyan"
      ? "text-cyan"
      : tone === "brand"
        ? "text-brand-hover"
        : tone === "violet"
          ? "text-violet"
          : tone === "success"
            ? "text-success"
            : tone === "warning"
              ? "text-warning"
              : "text-text-on-dark";

  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-bg-primary/60 p-3",
        className,
      )}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-dark">
        {label}
      </p>
      <p className={cn("mt-1 font-heading text-xl font-semibold", valueClass)}>
        {value}
      </p>
      {hint && <p className="mt-1 text-[0.65rem] text-muted-dark">{hint}</p>}
    </div>
  );
}
