import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { GlassOrb } from "@/components/visualisations/glass/GlassOrb";

export type ProcessStep = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  accent?: "default" | "brand";
};

type ProcessFlowProps = {
  steps: ProcessStep[];
  className?: string;
  compact?: boolean;
  orientation?: "horizontal" | "vertical";
};

/**
 * Glass process flow — frosted orbs on a glowing coral→cyan path (mockup exact).
 */
export function ProcessFlow({
  steps,
  className,
  compact,
  orientation = "horizontal",
}: ProcessFlowProps) {
  if (orientation === "vertical") {
    return <VerticalJourneyRail steps={steps} className={className} />;
  }

  return (
    <div className={cn("relative overflow-hidden rounded-3xl py-4", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            radial-gradient(circle at 6% 50%, rgba(230,57,70,0.14), transparent 26%),
            radial-gradient(circle at 94% 50%, rgba(14,165,183,0.16), transparent 30%),
            linear-gradient(rgba(59,130,246,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "auto, auto, 44px 44px, 44px 44px",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-[5%] right-[5%] top-[2.9rem] hidden h-[3px] rounded-full lg:block"
        style={{
          background:
            "linear-gradient(90deg, #e63946 0%, #60a5fa 48%, #0ea5b7 100%)",
          boxShadow:
            "0 0 18px rgba(59,130,246,0.4), 0 0 24px rgba(230,57,70,0.18)",
        }}
      />

      <div
        className={cn(
          "relative grid gap-6",
          steps.length <= 4
            ? "sm:grid-cols-2 lg:grid-cols-4"
            : steps.length <= 5
              ? "sm:grid-cols-2 lg:grid-cols-5"
              : steps.length <= 6
                ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
                : "sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7",
        )}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.title}
              className={cn(
                "relative flex flex-col items-center text-center",
                compact ? "px-1 py-2" : "px-2 py-3",
              )}
            >
              {isFirst ? (
                <div className="relative flex flex-col items-center">
                  <span
                    aria-hidden
                    className="mb-2 flex h-8 w-8 items-center justify-center"
                  >
                    <span
                      className="absolute h-10 w-10 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(230,57,70,0.4), transparent 70%)",
                      }}
                    />
                    <span
                      className="relative h-3 w-3 rounded-full bg-brand"
                      style={{
                        boxShadow:
                          "0 0 0 5px rgba(230,57,70,0.22), 0 0 16px rgba(230,57,70,0.6)",
                      }}
                    />
                  </span>
                  <GlassOrb icon={Icon} size="lg" />
                </div>
              ) : isLast ? (
                <HexGlassNode icon={Icon} />
              ) : (
                <GlassOrb icon={Icon} size="lg" />
              )}

              <p className="mt-3 font-tech text-[0.65rem] text-sky">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-heading text-sm font-semibold text-navy">
                {step.title}
              </h3>
              {step.description ? (
                <p className="mt-1.5 max-w-[11rem] text-[0.72rem] leading-relaxed text-muted-light">
                  {step.description}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HexGlassNode({ icon: Icon }: { icon?: LucideIcon }) {
  return (
    <span className="relative flex h-[4.75rem] w-[4.75rem] items-center justify-center">
      <span
        aria-hidden
        className="absolute inset-[-6px]"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,183,0.3), transparent 68%)",
          clipPath:
            "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
        }}
      />
      <span
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          border: "1px solid rgba(14,165,183,0.35)",
          clipPath:
            "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
          transform: "scale(1.18)",
        }}
      />
      <span
        className="relative flex h-14 w-14 items-center justify-center text-navy"
        style={{
          clipPath:
            "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
          background:
            "linear-gradient(145deg, rgba(186,230,253,0.95), rgba(59,130,246,0.7))",
          boxShadow:
            "0 0 28px rgba(14,165,183,0.45), inset 0 1px 0 rgba(255,255,255,0.75)",
        }}
      >
        {Icon ? <Icon className="h-5 w-5" aria-hidden /> : null}
      </span>
    </span>
  );
}

function VerticalJourneyRail({
  steps,
  className,
}: {
  steps: ProcessStep[];
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <svg
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-[3.35rem] top-10 hidden w-5 md:block"
        viewBox="0 0 20 900"
        preserveAspectRatio="none"
      >
        <path
          d="M10 0 C16 50, 4 100, 10 150 S4 250, 10 300 S16 400, 10 450 S4 550, 10 600 S16 700, 10 750 S4 850, 10 900"
          fill="none"
          stroke="rgba(96,165,250,0.55)"
          strokeWidth="1.5"
        />
      </svg>

      <ol className="relative space-y-9 md:space-y-11">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li key={step.title} className="relative">
              <p className="font-tech text-2xl text-sky md:text-3xl">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <GlassOrb icon={Icon} size="lg" />
                <span
                  aria-hidden
                  className="hidden h-2.5 w-2.5 rounded-full bg-brand md:inline-block"
                  style={{ boxShadow: "0 0 8px rgba(230,57,70,0.55)" }}
                />
                <h3 className="max-w-[11rem] font-heading text-base font-semibold leading-snug text-navy">
                  {step.title}
                </h3>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
