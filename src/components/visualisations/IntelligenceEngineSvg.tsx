"use client";

import { motion, useReducedMotion } from "framer-motion";

const cards = [
  {
    title: "AI SYSTEMS",
    lines: ["24 Monitored", "3 Awaiting Review"],
    className: "left-[4%] top-[8%]",
  },
  {
    title: "DECISION INTELLIGENCE",
    lines: ["Priority intervention identified", "Confidence: High"],
    className: "right-[2%] top-[14%]",
  },
  {
    title: "GOVERNANCE STATUS",
    lines: ["Human approval required", "Risk classification: Elevated"],
    className: "left-[2%] bottom-[16%]",
  },
  {
    title: "AGENT ACTIVITY",
    lines: ["Evidence collected", "Exception routed", "Action recorded"],
    className: "right-[4%] bottom-[10%]",
  },
] as const;

/** Lightweight Intelligence Engine for mobile, reduced-motion, and SSR fallback. */
export function IntelligenceEngineSvg() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative aspect-square w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_50%_45%,rgba(25,195,211,0.16),transparent_42%),linear-gradient(160deg,#061022,#0a1830_55%,#050b18)]"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 grid-texture opacity-60" />
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        role="presentation"
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#19c3d3" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#050b18" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[150, 110, 72].map((r, i) => (
          <motion.circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke={i === 0 ? "rgba(230,57,70,0.35)" : "rgba(25,195,211,0.28)"}
            strokeWidth="1"
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.7 }}
            style={{ transformOrigin: "200px 200px" }}
          />
        ))}
        {[
          [200, 50],
          [330, 140],
          [300, 300],
          [100, 300],
          [70, 140],
        ].map(([x, y], i) => (
          <g key={`${x}-${y}`}>
            <line
              x1="200"
              y1="200"
              x2={x}
              y2={y}
              stroke="rgba(25,195,211,0.25)"
              strokeWidth="1"
            />
            <motion.circle
              cx={x}
              cy={y}
              r="5"
              fill="#19c3d3"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                delay: 0.5 + i * 0.15,
                duration: 2.4,
                repeat: reduce ? 0 : Infinity,
              }}
            />
          </g>
        ))}
        <motion.circle
          cx="200"
          cy="200"
          r="28"
          fill="url(#coreGlow)"
          initial={reduce ? false : { scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <circle
          cx="200"
          cy="200"
          r="10"
          fill="#e63946"
          className={reduce ? undefined : "animate-pulse"}
        />
      </svg>

      {cards.map((card, index) => (
        <motion.article
          key={card.title}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + index * 0.1 }}
          className={`panel-thin absolute hidden max-w-[11rem] p-2.5 sm:block ${card.className}`}
        >
          <p className="font-tech text-[0.58rem] text-cyan">{card.title}</p>
          {card.lines.map((line) => (
            <p key={line} className="mt-0.5 text-[0.65rem] text-muted-dark">
              {line}
            </p>
          ))}
        </motion.article>
      ))}
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 font-tech text-[0.55rem] uppercase tracking-[0.2em] text-muted-dark">
        Demonstration data
      </p>
    </div>
  );
}
