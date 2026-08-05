"use client";

import { motion, useReducedMotion } from "framer-motion";

const stages = [
  {
    name: "Experimental",
    focus: "Isolated pilots and tool experiments with limited shared standards.",
  },
  {
    name: "Emerging",
    focus: "Early portfolio view, initial governance and selective production use cases.",
  },
  {
    name: "Established",
    focus: "Defined CoE practices, reusable platforms and formal risk controls.",
  },
  {
    name: "Scaled",
    focus: "Repeatable delivery factory, broad adoption and measured benefits.",
  },
  {
    name: "Optimised",
    focus: "Continuous improvement, strong assurance and adaptive operating models.",
  },
];

export function MaturityCurve() {
  const reduce = useReducedMotion();

  return (
    <div className="rounded-2xl border border-white/10 bg-bg-elevated/40 p-6">
      <div className="relative mb-8 h-24 overflow-hidden rounded-xl border border-white/5 bg-bg-primary/50">
        <svg viewBox="0 0 500 100" className="h-full w-full" aria-hidden>
          <path
            d="M10 80 C80 78, 120 70, 180 55 S300 25, 390 18 480 12, 490 10"
            fill="none"
            stroke="url(#maturity)"
            strokeWidth="3"
          />
          <defs>
            <linearGradient id="maturity" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E63946" />
              <stop offset="50%" stopColor="#19C3D3" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="grid gap-3 md:grid-cols-5">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.name}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="rounded-lg border border-white/10 bg-bg-primary/50 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan">
              Stage {index + 1}
            </p>
            <h3 className="mt-2 font-heading text-base font-semibold">
              {stage.name}
            </h3>
            <p className="mt-2 text-xs text-muted-dark">{stage.focus}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
