import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockupAssets } from "@/config/mockup-assets";
import { OriginalSculpture } from "@/components/visualisations/glass/OriginalSculpture";

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
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[#dce8f2] bg-white p-5 md:p-7",
        className,
      )}
    >
      <ol className="grid grid-cols-2 gap-x-3 gap-y-1.5 sm:grid-cols-3">
        {layers.map((title, index) => (
          <li
            key={title}
            className="flex items-baseline gap-1.5 text-[0.68rem] leading-snug"
          >
            <span className="font-tech text-[0.6rem] text-cyan">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="truncate font-medium text-navy">{title}</span>
          </li>
        ))}
      </ol>

      <div className="mt-5 grid items-center gap-5 sm:grid-cols-[0.9fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-[11rem]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgba(20,159,230,0.22),transparent_68%)] blur-xl"
          />
          <OriginalSculpture
            src={mockupAssets.originalCoeStack}
            alt=""
            orientation="portrait"
            priority
            className="relative z-10"
          />
        </div>
        <div>
          <p className="font-heading text-sm font-semibold text-navy">
            Core outcomes
          </p>
          <ul className="mt-3 space-y-2.5">
            {outcomes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm leading-snug text-muted-light"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function CoeLayerTower({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[12rem]", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,rgba(20,159,230,0.2),transparent_70%)] blur-xl"
      />
      <OriginalSculpture
        src={mockupAssets.originalCoeStack}
        alt="Nine-layer CoE operating model as stacked glass plates"
        orientation="portrait"
        className="relative z-10"
      />
    </div>
  );
}
