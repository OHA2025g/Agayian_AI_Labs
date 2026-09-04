import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  CapabilityGlassStack,
  type StackLabel,
} from "@/components/visualisations/glass/CapabilityGlassStack";

export function CapabilitiesHero({
  title = "Capabilities",
  subheadLine1 = "From strategy to governed",
  subheadLine2 = "production systems",
  body = "Seven integrated capability layers connect ambition, data foundations, AI modalities, governance, engineering and managed operations.",
  primaryCtaLabel = "Book a Consultation",
  primaryCtaHref = "/contact?interest=consultation",
  secondaryCtaLabel = "Explore Related Products",
  secondaryCtaHref = "/products",
  stackLabels,
}: {
  title?: string;
  subheadLine1?: string;
  subheadLine2?: string;
  body?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  stackLabels?: StackLabel[];
}) {
  return (
    <section className="capabilities-hero relative overflow-visible">
      <div className="capabilities-hero-grid relative">
        <div className="capabilities-hero-copy relative z-20 max-w-md min-[1200px]:max-w-none">
          <h1 className="font-heading text-[clamp(2.3rem,4.6vw,3.6rem)] font-semibold leading-[1.04] tracking-tight text-[#071b40] min-[1200px]:text-[68px] min-[1200px]:font-bold min-[1200px]:leading-[0.98] min-[1200px]:tracking-[-2.4px]">
            {title}
          </h1>
          <p className="capabilities-subhead mt-3 font-heading text-lg font-semibold text-[#071b40] md:text-xl">
            <span className="block">{subheadLine1}</span>
            <span className="block">{subheadLine2}</span>
          </p>
          <p className="capabilities-body mt-5 text-base leading-relaxed text-[#5d7394] md:text-[1.05rem]">
            {body}
          </p>
          <div className="capabilities-ctas mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PrimaryButton
              href={primaryCtaHref}
              className="h-[52px] shadow-[0_8px_22px_rgba(255,75,90,0.16)]"
            >
              {primaryCtaLabel}
            </PrimaryButton>
            <SecondaryButton href={secondaryCtaHref} className="h-[52px]">
              {secondaryCtaLabel}
            </SecondaryButton>
          </div>
        </div>

        <CapabilityGlassStack
          className="capabilities-stack max-w-none"
          labels={stackLabels}
        />
      </div>
    </section>
  );
}
