"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { AiOrbOffset } from "@/components/visualisations/AiOrbCanvas";
import { cn } from "@/lib/utils";

const AiOrbCanvas = dynamic(
  () =>
    import("@/components/visualisations/AiOrbCanvas").then(
      (m) => m.AiOrbCanvas,
    ),
  { ssr: false },
);

type PreferSide = "left" | "right" | "auto";

type SectionCharacter = {
  sectionId: string;
  /** Formation scale — larger = bigger orb */
  size: number;
  /** Material brightness */
  intensity: number;
  /** Particle volume / density feel */
  volume: number;
  /** Bias empty-space search toward a side so we leave text alone */
  prefer: PreferSide;
  /** Fallback world pose if content markers are missing */
  fallback: { x: number; y: number };
};

const DESKTOP_SECTIONS: SectionCharacter[] = [
  {
    sectionId: "intelligence-engine-hero",
    size: 1.08,
    intensity: 0.98,
    volume: 1.05,
    prefer: "right",
    fallback: { x: 1.05, y: 0.0 },
  },
  {
    sectionId: "home-what-we-do",
    size: 0.9,
    intensity: 0.88,
    volume: 0.95,
    prefer: "right",
    fallback: { x: 1.2, y: -0.1 },
  },
  {
    sectionId: "home-products",
    size: 0.64,
    intensity: 0.55,
    volume: 0.72,
    prefer: "right",
    fallback: { x: 1.3, y: 0.15 },
  },
  {
    sectionId: "home-capabilities",
    size: 0.78,
    intensity: 0.75,
    volume: 0.85,
    prefer: "right",
    fallback: { x: 1.25, y: 0.0 },
  },
  {
    sectionId: "home-cta",
    size: 0.95,
    intensity: 0.95,
    volume: 0.95,
    prefer: "left",
    fallback: { x: -1.05, y: 0.0 },
  },
];

const MOBILE_SECTIONS: SectionCharacter[] = [
  {
    sectionId: "intelligence-engine-hero",
    size: 1.05,
    intensity: 0.55,
    volume: 0.85,
    prefer: "right",
    fallback: { x: 0.45, y: 0.55 },
  },
  {
    sectionId: "home-what-we-do",
    size: 0.7,
    intensity: 0.32,
    volume: 0.55,
    prefer: "right",
    fallback: { x: 0.55, y: -0.35 },
  },
  {
    sectionId: "home-products",
    size: 0.45,
    intensity: 0.22,
    volume: 0.4,
    prefer: "right",
    fallback: { x: 0.6, y: 0.25 },
  },
  {
    sectionId: "home-capabilities",
    size: 0.65,
    intensity: 0.3,
    volume: 0.5,
    prefer: "left",
    fallback: { x: -0.45, y: 0.15 },
  },
  {
    sectionId: "home-cta",
    size: 0.9,
    intensity: 0.48,
    volume: 0.75,
    prefer: "auto",
    fallback: { x: 0.2, y: -0.25 },
  },
];

type LivePose = AiOrbOffset & { sectionId: string };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function clamp01(n: number) {
  return clamp(n, 0, 1);
}

type Pocket = {
  x: number;
  y: number;
  w: number;
  h: number;
  side: PreferSide;
};

/**
 * Find the largest open pocket in the viewport that does not overlap
 * measured text/content boxes — so the orb parks where there is no copy.
 */
function findEmptyPocket(
  obstacles: DOMRect[],
  vw: number,
  vh: number,
  prefer: PreferSide,
): Pocket | null {
  const pad = 16;
  const usable: DOMRect[] = obstacles
    .map(
      (r) =>
        new DOMRect(
          clamp(r.left, 0, vw),
          clamp(r.top, 0, vh),
          Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0)),
          Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0)),
        ),
    )
    .filter((r) => r.width > 8 && r.height > 8);

  if (usable.length === 0) {
    return prefer === "left"
      ? { x: vw * 0.22, y: vh * 0.5, w: vw * 0.35, h: vh * 0.6, side: "left" }
      : { x: vw * 0.78, y: vh * 0.5, w: vw * 0.35, h: vh * 0.6, side: "right" };
  }

  const leftEdge = Math.min(...usable.map((r) => r.left));
  const rightEdge = Math.max(...usable.map((r) => r.right));
  const topEdge = Math.min(...usable.map((r) => r.top));
  const bottomEdge = Math.max(...usable.map((r) => r.bottom));

  const candidates: Pocket[] = [
    {
      x: leftEdge / 2,
      y: vh / 2,
      w: Math.max(0, leftEdge - pad),
      h: vh,
      side: "left",
    },
    {
      x: (rightEdge + vw) / 2,
      y: vh / 2,
      w: Math.max(0, vw - rightEdge - pad),
      h: vh,
      side: "right",
    },
    {
      x: vw / 2,
      y: topEdge / 2,
      w: vw,
      h: Math.max(0, topEdge - pad),
      side: "auto",
    },
    {
      x: vw / 2,
      y: (bottomEdge + vh) / 2,
      w: vw,
      h: Math.max(0, vh - bottomEdge - pad),
      side: "auto",
    },
  ];
  const pockets = candidates.filter((p) => p.w >= 72 && p.h >= 100);

  if (pockets.length === 0) {
    // Content fills most of the viewport — retreat to the far preferred gutter
    return prefer === "left"
      ? { x: vw * 0.08, y: vh * 0.55, w: vw * 0.14, h: vh * 0.4, side: "left" }
      : {
          x: vw * 0.92,
          y: vh * 0.55,
          w: vw * 0.14,
          h: vh * 0.4,
          side: "right",
        };
  }

  const scored = pockets.map((p) => {
    let score = p.w * p.h;
    if (prefer === "left" && p.side === "left") score *= 1.55;
    if (prefer === "right" && p.side === "right") score *= 1.55;
    // Prefer taller side gutters over thin top/bottom strips for orb presence
    if (p.side === "left" || p.side === "right") score *= 1.2;
    return { pocket: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].pocket;
}

/** Map a viewport pixel point into the R3F world frame used by the page orb */
function clientToWorld(cx: number, cy: number, vw: number, vh: number) {
  const ndcX = (cx / vw) * 2 - 1;
  const ndcY = -((cy / vh) * 2 - 1);
  // Calibrated for camera z≈6.4 / fov 48 — keep orb on-canvas
  return {
    x: clamp(ndcX * 2.55, -1.45, 1.45),
    y: clamp(ndcY * 1.55, -0.95, 0.95),
  };
}

function blendCharacters(
  a: SectionCharacter,
  b: SectionCharacter,
  t: number,
): Pick<SectionCharacter, "size" | "intensity" | "volume"> {
  return {
    size: lerp(a.size, b.size, t),
    intensity: lerp(a.intensity, b.intensity, t),
    volume: lerp(a.volume, b.volume, t),
  };
}

/**
 * Fixed full-page AI ORB that parks in measured empty space (no text)
 * and reshapes size / intensity / volume per homepage section.
 */
export function HomeOrbField({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const sections = useMemo(
    () => (isMobile ? MOBILE_SECTIONS : DESKTOP_SECTIONS),
    [isMobile],
  );

  const poseRef = useRef<LivePose>({
    sectionId: DESKTOP_SECTIONS[0].sectionId,
    x: DESKTOP_SECTIONS[0].fallback.x,
    y: DESKTOP_SECTIONS[0].fallback.y,
    scale: DESKTOP_SECTIONS[0].size,
    intensity: DESKTOP_SECTIONS[0].intensity,
    volume: DESKTOP_SECTIONS[0].volume,
  });
  const offsetRef = useRef<AiOrbOffset>({
    x: DESKTOP_SECTIONS[0].fallback.x,
    y: DESKTOP_SECTIONS[0].fallback.y,
    scale: DESKTOP_SECTIONS[0].size,
    intensity: DESKTOP_SECTIONS[0].intensity,
    volume: DESKTOP_SECTIONS[0].volume,
  });
  const veilRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(true);
  const rafRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = document.getElementById("home-orb-root");
    if (!root || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting;
        setActive(entry.isIntersecting);
        if (veilRef.current && !entry.isIntersecting) {
          veilRef.current.style.opacity = "0";
        }
      },
      { threshold: 0.01 },
    );
    io.observe(root);
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

  useEffect(() => {
    if (reduce) return;

    const measure = () => {
      const vw = window.innerWidth || 1;
      const vh = window.innerHeight || 1;

      const samples = sections.map((section) => {
        const el = document.getElementById(section.sectionId);
        if (!el) return { section, weight: 0, el: null as HTMLElement | null };
        const rect = el.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, vh);
        const visible = Math.max(0, visibleBottom - visibleTop);
        const center = (rect.top + rect.bottom) / 2;
        const dist = Math.abs(center - vh * 0.4) / vh;
        const proximity = clamp01(1 - dist * 1.2);
        const coverage = clamp01(visible / Math.min(rect.height, vh));
        return {
          section,
          weight: proximity * 0.7 + coverage * 0.3,
          el,
        };
      });

      const total = samples.reduce((sum, s) => sum + s.weight, 0);
      if (total <= 0.001) return;

      const ranked = [...samples].sort((a, b) => b.weight - a.weight);
      const primary = ranked[0];
      const secondary = ranked[1] ?? ranked[0];
      const mix = clamp01(
        secondary.weight /
          Math.max(primary.weight + secondary.weight, 0.001),
      );
      const blendT = mix > 0.3 ? ((mix - 0.3) / 0.7) * 0.8 : 0;
      const character = blendCharacters(
        primary.section,
        secondary.section,
        blendT,
      );

      // Measure text blocks inside the dominant section (and keep them on-screen)
      const contentNodes = primary.el
        ? Array.from(
            primary.el.querySelectorAll<HTMLElement>("[data-orb-content]"),
          )
        : [];
      const obstacles = contentNodes
        .map((node) => node.getBoundingClientRect())
        .filter((r) => r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw);

      const prefer =
        blendT < 0.45 ? primary.section.prefer : secondary.section.prefer;
      const pocket = findEmptyPocket(obstacles, vw, vh, prefer);

      let world = primary.section.fallback;
      if (pocket) {
        world = clientToWorld(pocket.x, pocket.y, vw, vh);
      }

      const cur = poseRef.current;
      const smoothed: LivePose = {
        sectionId: primary.section.sectionId,
        x: lerp(cur.x, world.x, 0.1),
        y: lerp(cur.y, world.y, 0.1),
        scale: lerp(cur.scale ?? 1, character.size, 0.09),
        intensity: lerp(cur.intensity ?? 0.8, character.intensity, 0.1),
        volume: lerp(cur.volume ?? 1, character.volume, 0.09),
      };

      poseRef.current = smoothed;
      offsetRef.current = {
        x: smoothed.x,
        y: smoothed.y,
        scale: smoothed.scale,
        intensity: smoothed.intensity,
        volume: smoothed.volume,
      };

      if (veilRef.current) {
        // Container stays fully visible; intensity is handled in the shader/material
        veilRef.current.style.opacity = activeRef.current ? "1" : "0";
      }
    };

    const tick = () => {
      measure();
      rafRef.current = window.requestAnimationFrame(tick);
    };
    rafRef.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafRef.current);
  }, [sections, reduce]);

  if (reduce) {
    return (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className,
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(25,195,211,0.16),transparent_55%),radial-gradient(ellipse_at_25%_75%,rgba(230,57,70,0.1),transparent_50%)]" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div ref={veilRef} className="absolute inset-0" style={{ opacity: 1 }}>
        <AiOrbCanvas
          pointer={pointer}
          mode="page"
          active={active}
          offsetRef={offsetRef}
        />
      </div>
    </div>
  );
}
