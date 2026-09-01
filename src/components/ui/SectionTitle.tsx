import { cn } from "@/lib/utils";

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
  accent?: "above" | "below";
};

/** Mockup section heading with coral + cyan underline accents. */
export function SectionTitle({
  children,
  className,
  align = "left",
  action,
  accent = "above",
}: SectionTitleProps) {
  const bars = (
    <div
      className={cn(
        "flex items-center gap-1.5",
        accent === "above" ? "mb-3" : "mt-3",
      )}
      aria-hidden
    >
      <span className="h-[3px] w-6 rounded-full bg-cyan" />
      <span className="h-[3px] w-6 rounded-full bg-brand" />
    </div>
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        action && "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn(align === "center" && "flex flex-col items-center")}>
        {accent === "above" ? bars : null}
        <h2 className="font-heading text-[clamp(1.65rem,3vw,2.5rem)] font-semibold tracking-tight text-navy text-balance">
          {children}
        </h2>
        {accent === "below" ? bars : null}
      </div>
      {action}
    </div>
  );
}
