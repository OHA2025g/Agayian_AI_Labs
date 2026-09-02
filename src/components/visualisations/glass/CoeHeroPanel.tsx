import { ArrowRight, Check } from "lucide-react";
import { mockupAssets } from "@/config/mockup-assets";
import { WhiteSculpture } from "@/components/visualisations/glass/WhiteSculpture";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { cn } from "@/lib/utils";

const defaultLayers = [
  "Business strategy",
  "Governance",
  "Use-case portfolio",
  "Data foundation",
  "AI platform",
  "Delivery factory",
  "Talent & capability",
  "Operations & monitoring",
  "Value realisation",
] as const;

const defaultOutcomes = [
  "Aligned strategy and priorities",
  "Governed AI by design",
  "Reusable platforms and assets",
  "Faster, safer delivery",
  "Measurable business impact",
] as const;

function CircleArrow() {
  return (
    <span className="coe-cta-arrow" aria-hidden>
      <ArrowRight className="h-3 w-3" />
    </span>
  );
}

function CoeHeroInlines({ count }: { count: number }) {
  const last = Math.max(count - 1, 1);

  return (
    <svg
      className="coe-hero-inlines"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {Array.from({ length: count }, (_, index) => {
        const startY = 22 + index * 1.15;
        const endY = 8 + (index / last) * 84;
        return (
          <path
            key={index}
            d={`M 0 ${startY} C 32 ${startY + 1}, 64 ${endY}, 100 ${endY}`}
            fill="none"
            stroke="#4ec8ef"
            strokeWidth="0.55"
            opacity="0.72"
          />
        );
      })}
    </svg>
  );
}

export function CoeHero({
  layers = defaultLayers,
  outcomes = defaultOutcomes,
}: {
  layers?: readonly string[];
  outcomes?: readonly string[];
}) {
  return (
    <section className="coe-hero">
      <div className="coe-hero-stage">
        <div className="coe-hero-copy">
          <Eyebrow>AI Centre of Excellence</Eyebrow>
          <h1>AI Centre of Excellence</h1>
          <p className="coe-hero-sub">
            An operating model that makes AI repeatable
          </p>
          <p className="coe-hero-body">
            Connect strategy, governance, platforms, talent and delivery so
            every use case stops restarting from zero.
          </p>
          <div className="coe-hero-ctas">
            <PrimaryButton
              href="/contact?interest=consultation"
              showArrow={false}
            >
              Book a Consultation
              <CircleArrow />
            </PrimaryButton>
            <SecondaryButton href="#operating-model" showArrow={false}>
              Explore the Operating Model
              <CircleArrow />
            </SecondaryButton>
          </div>
        </div>

        <div className="coe-hero-diagram">
          <CoeHeroInlines count={layers.length} />
          <div className="coe-hero-tower">
            <WhiteSculpture
              src={mockupAssets.coeHeroTower}
              alt="Nine-layer CoE glass stack"
              width={600}
              height={960}
              priority
              multiply={false}
              className="coe-hero-sculpture bg-transparent"
            />
          </div>
          <ol className="coe-hero-callouts">
            {layers.map((title, index) => (
              <li key={title}>
                <span className="coe-hero-lead" aria-hidden />
                <span className="coe-hero-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="coe-hero-label">{title}</span>
              </li>
            ))}
          </ol>
        </div>

        <CoeOutcomes outcomes={outcomes} />
      </div>
    </section>
  );
}

export function CoeHeroPanel({
  layers = defaultLayers,
  outcomes = defaultOutcomes,
  className,
}: {
  layers?: readonly string[];
  outcomes?: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn("coe-hero-panel", className)}>
      <ol className="coe-layer-grid">
        {layers.map((title, index) => (
          <li key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{title}</span>
          </li>
        ))}
      </ol>
      <div className="coe-hero-split">
        <CoeLayerTower priority className="coe-hero-stack" />
        <CoeOutcomes outcomes={outcomes} />
      </div>
    </div>
  );
}

export function CoeOutcomes({
  outcomes,
}: {
  outcomes: readonly string[];
}) {
  return (
    <aside className="coe-outcomes">
      <h3>Core outcomes</h3>
      <ul>
        {outcomes.map((item) => (
          <li key={item}>
            <span className="coe-check" aria-hidden>
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function CoeLayerTower({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <WhiteSculpture
      src={mockupAssets.originalCoeStack}
      alt="Nine-layer CoE operating model as stacked glass plates"
      width={1024}
      height={1280}
      priority={priority}
      className={cn("coe-hero-stack", className)}
    />
  );
}
