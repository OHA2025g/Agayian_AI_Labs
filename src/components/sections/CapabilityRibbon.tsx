"use client";

import { useReducedMotion } from "framer-motion";
import { capabilityRibbon } from "@/data/navigation";

export function CapabilityRibbon() {
  const reduce = useReducedMotion();
  const items = [...capabilityRibbon, ...capabilityRibbon];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-bg-secondary/80 py-4">
      <div className="sr-only">
        Capabilities include {capabilityRibbon.join(", ")}
      </div>
      <div
        className={
          reduce
            ? "flex flex-wrap justify-center gap-3 px-4"
            : "flex w-max animate-marquee gap-3"
        }
        aria-hidden={!reduce}
      >
        {(reduce ? [...capabilityRibbon] : items).map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted-dark"
          >
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-cyan" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
