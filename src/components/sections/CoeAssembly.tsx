"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  ensureGsap,
  getStaticScrollModeSnapshot,
  gsap,
  subscribeStaticScrollMode,
} from "@/lib/gsap";
import { cn } from "@/lib/utils";

const layers = [
  {
    id: "business-strategy",
    title: "Business strategy",
    description:
      "Leadership ambition, portfolio priorities and value realisation define where AI effort should concentrate.",
  },
  {
    id: "governance",
    title: "Governance",
    description:
      "Risk tiers, intake, approval gates and assurance evidence keep innovation aligned with accountability.",
  },
  {
    id: "use-case-portfolio",
    title: "Use-case portfolio",
    description:
      "Structured intake, scoring and prioritisation protect capacity and force early clarity on value and feasibility.",
  },
  {
    id: "data-foundation",
    title: "Data foundation",
    description:
      "Governed data products, access patterns and quality rules underpin every production AI system.",
  },
  {
    id: "ai-platform",
    title: "AI platform",
    description:
      "Shared model access, retrieval, evaluation harnesses and component registries reduce one-off engineering.",
  },
  {
    id: "delivery-factory",
    title: "Delivery factory",
    description:
      "Reusable playbooks, squads and release discipline turn approved demand into production capability.",
  },
  {
    id: "talent-capability",
    title: "Talent and capability",
    description:
      "Clear roles, enablement and federated competence multiply scarce specialists across the organisation.",
  },
  {
    id: "operations-monitoring",
    title: "Operations and monitoring",
    description:
      "Production observation for drift, misuse, fairness signals and control failures with defined incident paths.",
  },
  {
    id: "value-realisation",
    title: "Value realisation",
    description:
      "Outcome, adoption and control measures designed per use case — not claimed after go-live.",
  },
] as const;

export function CoeAssembly() {
  const root = useRef<HTMLElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const staticMode = useSyncExternalStore(
    subscribeStaticScrollMode,
    getStaticScrollModeSnapshot,
    () => true,
  );

  useEffect(() => {
    if (staticMode || !root.current || !stack.current) return;

    ensureGsap();
    const layerEls = stack.current.querySelectorAll<HTMLElement>("[data-coe-layer]");

    const ctx = gsap.context(() => {
      gsap.set(layerEls, { transformOrigin: "center top" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${layerEls.length * 120}`,
          pin: stack.current,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      layerEls.forEach((layer, index) => {
        if (index === 0) {
          tl.fromTo(
            layer,
            { opacity: 0.35, y: 48, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 1 },
            0,
          );
          return;
        }

        tl.fromTo(
          layer,
          { opacity: 0, y: 80, scale: 0.94 },
          { opacity: 1, y: index * -6, scale: 1 - index * 0.015, duration: 1 },
          index,
        );
      });
    }, root);

    return () => ctx.revert();
  }, [staticMode]);

  return (
    <section ref={root} className="scene-navy py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-tech text-[0.68rem] uppercase tracking-[0.2em] text-cyan">
          CoE operating stack
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-[clamp(1.75rem,3vw,2.75rem)] font-semibold text-text-on-dark">
          Nine layers that assemble into one operating model
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-dark md:text-base">
          Scroll to see how strategy, control, delivery and value realisation
          connect — or browse the full stack below.
        </p>

        <div
          ref={stack}
          className={cn(
            "relative mt-12",
            staticMode ? "space-y-3" : "min-h-[28rem] md:min-h-[32rem]",
          )}
        >
          {layers.map((layer, index) => (
            <article
              key={layer.id}
              data-coe-layer
              id={`coe-${layer.id}`}
              className={cn(
                "panel-thin rounded-xl p-5 md:p-6",
                !staticMode && "absolute inset-x-0 top-0 will-change-transform",
                !staticMode && index > 0 && "shadow-[0_-8px_32px_rgba(0,0,0,0.35)]",
              )}
              style={
                staticMode
                  ? undefined
                  : { zIndex: layers.length - index }
              }
            >
              <div className="flex items-start gap-4">
                <span className="font-tech text-xs text-cyan">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-text-on-dark">
                    {layer.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-dark">
                    {layer.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
