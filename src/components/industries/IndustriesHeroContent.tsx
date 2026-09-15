import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { CTA } from "@/config/cta";

export function IndustriesHeroContent() {
  return (
    <div className="industries-hero-copy">
      <p className="industries-eyebrow">Industries</p>
      <h1>
        Domain-aware AI for
        <br />
        complex operating
        <br />
        environments
      </h1>
      <p className="industries-body">
        Explore the challenges, workflows, governance considerations and
        outcomes that shape each engagement.
      </p>
      <div className="industries-ctas">
        <PrimaryButton href={CTA.primary.href}>{CTA.primary.label}</PrimaryButton>
        <SecondaryButton href={CTA.secondary.href}>
          {CTA.secondary.label}
        </SecondaryButton>
      </div>
    </div>
  );
}
