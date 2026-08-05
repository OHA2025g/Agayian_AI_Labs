"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IntelligenceEngineSvg } from "@/components/visualisations/IntelligenceEngineSvg";

const IntelligenceEngineCanvas = dynamic(
  () =>
    import("@/components/visualisations/IntelligenceEngineCanvas").then(
      (m) => m.IntelligenceEngineCanvas,
    ),
  { ssr: false, loading: () => <IntelligenceEngineSvg /> },
);

const cards = [
  {
    title: "AI SYSTEMS",
    lines: ["24 Monitored", "3 Awaiting Review"],
    className: "left-2 top-3 md:left-4 md:top-6",
  },
  {
    title: "DECISION INTELLIGENCE",
    lines: ["Priority intervention identified", "Confidence: High"],
    className: "right-2 top-8 md:right-4 md:top-12",
  },
  {
    title: "GOVERNANCE STATUS",
    lines: ["Human approval required", "Risk classification: Elevated"],
    className: "left-2 bottom-10 md:left-4 md:bottom-14",
  },
  {
    title: "AGENT ACTIVITY",
    lines: ["Evidence collected", "Exception routed", "Action recorded"],
    className: "right-2 bottom-6 md:right-4 md:bottom-10",
  },
] as const;

function subscribeDesktop(onChange: () => void) {
  const mq = window.matchMedia("(min-width: 1024px)");
  const coarse = window.matchMedia("(pointer: coarse)");
  mq.addEventListener("change", onChange);
  coarse.addEventListener("change", onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    coarse.removeEventListener("change", onChange);
  };
}

function getDesktopSnapshot() {
  return (
    window.matchMedia("(min-width: 1024px)").matches &&
    !window.matchMedia("(pointer: coarse)").matches
  );
}

export function IntelligenceEngine() {
  const reduce = useReducedMotion();
  const desktopFine = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    () => false,
  );
  const useWebGL = Boolean(!reduce && desktopFine);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  return (
    <div
      className="relative aspect-square w-full max-w-xl"
      onPointerMove={(event) => {
        if (!useWebGL) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
        setPointer({ x, y });
      }}
    >
      {useWebGL ? (
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-[#050b18]">
          <div className="pointer-events-none absolute inset-0 grid-texture opacity-40" />
          <IntelligenceEngineCanvas pointer={pointer} />
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.12 }}
              className={`panel-thin absolute z-10 max-w-[11.5rem] p-2.5 ${card.className}`}
            >
              <p className="font-tech text-[0.58rem] text-cyan">{card.title}</p>
              {card.lines.map((line) => (
                <p key={line} className="mt-0.5 text-[0.68rem] text-muted-dark">
                  {line}
                </p>
              ))}
            </motion.article>
          ))}
          <p className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 font-tech text-[0.55rem] uppercase tracking-[0.2em] text-muted-dark">
            Demonstration data
          </p>
        </div>
      ) : (
        <IntelligenceEngineSvg />
      )}
    </div>
  );
}
