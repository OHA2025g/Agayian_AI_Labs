import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-bg-elevated/30 px-6 py-16 text-center",
        className,
      )}
      role="status"
    >
      <h3 className="font-heading text-xl font-semibold text-text-on-dark">
        {title}
      </h3>
      {description && (
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-dark">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
