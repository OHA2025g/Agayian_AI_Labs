import { brandCopy } from "@/config/site";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { AIBackground } from "@/components/visualisations/AIBackground";

export function CTASection({
  title = "Turn AI Ambition into Governed, Measurable Impact",
  primaryHref = "/contact",
  primaryLabel = brandCopy.primaryCta,
  secondaryHref = "/products",
  secondaryLabel = "Explore Our Products",
}: {
  title?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-white/10 py-20">
      <AIBackground variant="cta" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.75rem)] font-semibold text-balance">
          {title}
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <PrimaryButton href={primaryHref}>{primaryLabel}</PrimaryButton>
          <SecondaryButton href={secondaryHref}>{secondaryLabel}</SecondaryButton>
        </div>
      </div>
    </section>
  );
}
