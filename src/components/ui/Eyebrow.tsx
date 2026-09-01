import { cn } from "@/lib/utils";

/** Mockup page label: cyan uppercase + coral dash. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 font-tech text-[0.65rem] uppercase tracking-[0.22em] text-cyan",
        className,
      )}
    >
      <span aria-hidden className="h-[2px] w-4 rounded-full bg-brand" />
      {children}
    </p>
  );
}
