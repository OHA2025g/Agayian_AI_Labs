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
  tone = "dark",
  grid = false,
  cta,
  as: Comp = "section",
}: SectionProps) {
  return (
    <Comp
      id={id}
      className={cn(
        "relative py-16 md:py-24",
        tone === "dark" && "bg-bg-primary text-text-on-dark",
        tone === "elevated" && "bg-bg-secondary text-text-on-dark",
        tone === "light" && "bg-surface-light text-text-light",
        grid && (tone === "light" ? "grid-texture-light" : "grid-texture"),
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
                  "mb-3 text-xs font-semibold uppercase tracking-[0.2em]",
                  tone === "light" ? "text-brand" : "text-cyan",
                )}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={cn(
                  "font-heading text-[clamp(1.75rem,3vw,2.75rem)] font-semibold tracking-tight text-balance",
                  tone === "light" ? "text-text-light" : "text-text-on-dark",
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "mt-4 max-w-2xl text-base leading-relaxed md:text-lg",
                  tone === "light" ? "text-muted-light" : "text-muted-dark",
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
