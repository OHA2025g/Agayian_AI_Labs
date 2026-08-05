"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { IntelligenceEngineSvg } from "@/components/visualisations/IntelligenceEngineSvg";
import { cn } from "@/lib/utils";

const AiOrbCanvas = dynamic(
  () =>
    import("@/components/visualisations/AiOrbCanvas").then(
      (m) => m.AiOrbCanvas,
    ),
  { ssr: false, loading: () => <IntelligenceEngineSvg /> },
);

type Props = {
  className?: string;
};

/**
 * Native AI ORB particle swarm for the landing hero (ported from Casberry
 * formation "AI ORB" — runs in-process via React Three Fiber, no iframe).
 */
export function AiOrbEmbed({ className }: Props) {
  const reduce = useReducedMotion();
  const useWebGL = !reduce;
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  return (
    <div
      className={cn(
        "relative aspect-square w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#050b18]",
        className,
      )}
      onPointerMove={(event) => {
        if (!useWebGL) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
        setPointer({ x, y });
      }}
    >
      <div className="pointer-events-none absolute inset-0 grid-texture opacity-30" />
      {useWebGL ? (
        <AiOrbCanvas pointer={pointer} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <IntelligenceEngineSvg />
        </div>
      )}
      <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 font-tech text-[0.55rem] uppercase tracking-[0.18em] text-muted-dark">
        AI Orb
      </p>
    </div>
  );
}
