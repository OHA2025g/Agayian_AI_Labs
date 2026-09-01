import { brandCopy } from "@/config/site";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { DarkCtaBand, LightCtaBar } from "@/components/ui/DarkCtaBand";

export function CTASection({
  title = "Ready to build governed intelligence?",
  description,
  primaryHref = "/contact",
  primaryLabel = brandCopy.primaryCta,
  secondaryHref = "/products",
  secondaryLabel = "Explore Our Products",
  variant = "light",
}: {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  variant?: "light" | "glass" | "dark" | "bar";
}) {
  if (variant === "dark") {
    return (
      <DarkCtaBand
        title={title}
        description={description}
        primaryHref={primaryHref}
        primaryLabel={primaryLabel}
        secondaryHref={secondaryHref}
        secondaryLabel={secondaryLabel}
      />
    );
  }

  if (variant === "bar") {
    return (
      <LightCtaBar
        title={title}
        description={description}
        href={primaryHref}
        label={primaryLabel}
      />
    );
  }

  return (
    <section className="relative overflow-hidden border-t border-[var(--border-soft)] py-16 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,rgba(20,159,230,0.08),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(255,77,94,0.05),transparent_45%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GlassCard
          variant="strong"
          className="flex flex-col items-start justify-between gap-6 px-6 py-8 text-left sm:flex-row sm:items-center sm:px-10"
        >
          <div>
            <h2 className="max-w-2xl font-heading text-[clamp(1.5rem,2.8vw,2.15rem)] font-semibold tracking-tight text-navy text-balance">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 max-w-xl text-sm text-muted-light">{description}</p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href={primaryHref}>{primaryLabel}</PrimaryButton>
            {variant === "glass" ? (
              <SecondaryButton href={secondaryHref}>
                {secondaryLabel}
              </SecondaryButton>
            ) : null}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
