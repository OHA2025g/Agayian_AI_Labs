"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const AiOrbCanvas = dynamic(
  () =>
    import("@/components/visualisations/AiOrbCanvas").then(
      (m) => m.AiOrbCanvas,
    ),
  { ssr: false },
);

type Props = {
  className?: string;
};

/**
 * Full-bleed atmospheric AI ORB — Deckoviz-style background presence.
 * Pointer-events none so hero copy/CTAs stay interactive.
 */
export function AiOrbBackground({ className }: Props) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.02 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) return;
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -((event.clientY / window.innerHeight) * 2 - 1);
      setPointer({ x, y });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  if (reduce) {
    return (
      <div
        ref={rootRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className,
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(25,195,211,0.18),transparent_55%),radial-gradient(ellipse_at_30%_70%,rgba(230,57,70,0.12),transparent_50%)]" />
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 scale-[1.15] opacity-90 md:scale-100 md:opacity-100">
        <AiOrbCanvas pointer={pointer} mode="hero" active={active} />
      </div>
      {/* Readability veil — keeps brand copy crisp over the swarm */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050b18]/92 via-[#050b18]/55 to-[#050b18]/25 md:via-[#050b18]/45 md:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050b18] via-transparent to-[#050b18]/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(5,11,24,0.55)_100%)]" />
    </div>
  );
}
