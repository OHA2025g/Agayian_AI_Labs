import { IndustriesHeroBackground } from "@/components/industries/IndustriesHeroBackground";
import { IndustriesHeroContent } from "@/components/industries/IndustriesHeroContent";
import { IndustriesHeroIndiaMap } from "@/components/industries/IndustriesHeroIndiaMap";
import { IndustriesHeroLegend } from "@/components/industries/IndustriesHeroLegend";

export function IndustriesHero() {
  return (
    <section className="industries-hero">
      <IndustriesHeroBackground />
      <div className="industries-hero-frame">
        <IndustriesHeroContent />
        <IndustriesHeroIndiaMap />
        <IndustriesHeroLegend />
      </div>
    </section>
  );
}
