"use client";

import { motion, useReducedMotion } from "framer-motion";

const layers = [
  "Data Sources",
  "Intelligence Layer",
  "AI Models and Agents",
  "Governance and Human Oversight",
  "Decisions and Impact",
];

const floatingCards = [
  { label: "Use-case registry", x: "8%", y: "18%" },
  { label: "Risk score", x: "72%", y: "28%" },
  { label: "Decision trail", x: "18%", y: "72%" },
  { label: "KPI signals", x: "68%", y: "70%" },
];

export function HeroEcosystem() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg lg:max-w-none">
      <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-bg-elevated/40 shadow-2xl backdrop-blur-sm" />
      <div className="absolute inset-4 rounded-[1.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent grid-texture" />

      <div className="relative z-10 flex h-full flex-col justify-center gap-3 p-6 sm:p-8">
        {layers.map((layer, index) => (
          <motion.div
            key={layer}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.12, duration: 0.5 }}
            className="relative"
          >
            <div className="rounded-lg border border-white/10 bg-bg-primary/70 px-4 py-3 text-sm font-medium text-text-on-dark shadow-lg">
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan/15 text-[0.65rem] text-cyan">
                {index + 1}
              </span>
              {layer}
            </div>
            {index < layers.length - 1 && (
              <div className="mx-auto my-1 h-3 w-px bg-gradient-to-b from-cyan/60 to-transparent" />
            )}
          </motion.div>
        ))}
      </div>

      {floatingCards.map((card, index) => (
        <motion.div
          key={card.label}
          className="absolute z-20 hidden rounded-md border border-cyan/20 bg-bg-secondary/90 px-2.5 py-1.5 text-[0.65rem] text-cyan shadow-lg sm:block"
          style={{ left: card.x, top: card.y }}
          animate={
            reduce
              ? undefined
              : { y: [0, -6, 0], opacity: [0.7, 1, 0.7] }
          }
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {card.label}
        </motion.div>
      ))}

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        aria-hidden
      >
        <defs>
          <linearGradient id="signal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#19C3D3" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#E63946" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M40 80 C120 40, 220 120, 320 60"
          fill="none"
          stroke="url(#signal)"
          strokeWidth="1.5"
        />
        <path
          d="M60 300 C140 240, 240 320, 340 260"
          fill="none"
          stroke="url(#signal)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
