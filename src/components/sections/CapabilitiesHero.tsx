import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { CapabilityGlassStack } from "@/components/visualisations/glass/CapabilityGlassStack";

export function CapabilitiesHero() {
  return (
    <section className="scene-hero relative overflow-visible">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-texture opacity-28"
      />
      <div className="relative grid items-center gap-8 py-12 md:py-16 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-0 lg:pt-12 lg:pb-8">
        <div className="relative z-20 max-w-md">
          <h1 className="font-heading text-[clamp(2.3rem,4.6vw,3.6rem)] font-semibold leading-[1.04] tracking-tight text-navy text-balance">
            Capabilities
          </h1>
          <p className="mt-3 text-lg font-semibold text-navy md:text-xl">
            From strategy to governed production systems
          </p>
          <p className="mt-5 text-base leading-relaxed text-navy/65 md:text-[1.05rem]">
            Seven integrated capability layers connect ambition, data
            foundations, AI modalities, governance, engineering and managed
            operations.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PrimaryButton href="/contact?interest=consultation">
              Book a Consultation
            </PrimaryButton>
            <SecondaryButton href="/products">
              Explore Related Products
            </SecondaryButton>
          </div>
        </div>

        <CapabilityGlassStack className="max-w-none" />
      </div>
    </section>
  );
}
