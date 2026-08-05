import { cn } from "@/lib/utils";

export function LoadingState({
  label = "Loading",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 py-20",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-cyan border-r-violet/60" />
      </div>
      <p className="text-sm text-muted-dark">{label}</p>
      <span className="sr-only">{label}</span>
    </div>
  );
}
