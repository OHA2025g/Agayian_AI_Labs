import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  tone?: "dark" | "elevated" | "light";
  grid?: boolean;
  cta?: React.ReactNode;
  as?: "section" | "div";
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  containerClassName,
  tone = "light",
  grid = false,
  cta,
  as: Comp = "section",
}: SectionProps) {
  return (
    <Comp
      id={id}
      className={cn(
        "relative py-16 md:py-24",
        tone === "dark" && "on-dark-surface bg-navy-deep text-text-on-dark",
        tone === "elevated" && "bg-bg-secondary text-navy",
        tone === "light" && "bg-bg-primary text-navy",
        grid && "grid-texture",
        className,
      )}
    >
      <div
        className={cn(
          "relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
          containerClassName,
        )}
      >
        {(eyebrow || title || description || cta) && (
          <div className="mb-10 max-w-3xl md:mb-14">
            {eyebrow && (
              <p
                className={cn(
                  "mb-3 font-tech text-[0.65rem] uppercase tracking-[0.22em]",
                  tone === "dark" ? "text-cyan" : "text-cyan",
                )}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <>
                <div className="mb-3 flex items-center gap-1.5" aria-hidden>
                  <span className="h-[3px] w-6 rounded-full bg-cyan" />
                  <span className="h-[3px] w-6 rounded-full bg-brand" />
                </div>
                <h2
                  className={cn(
                    "font-heading text-[clamp(1.75rem,3vw,2.75rem)] font-semibold tracking-tight text-balance",
                    tone === "dark" ? "text-text-on-dark" : "text-navy",
                  )}
                >
                  {title}
                </h2>
              </>
            )}
            {description && (
              <p
                className={cn(
                  "mt-4 max-w-2xl text-base leading-relaxed md:text-lg",
                  tone === "dark" ? "text-muted-dark" : "text-muted-light",
                )}
              >
                {description}
              </p>
            )}
            {cta && <div className="mt-6">{cta}</div>}
          </div>
        )}
        {children}
      </div>
    </Comp>
  );
}
