"use client";

import { brandCopy } from "@/config/site";
import { mockupAssets } from "@/config/mockup-assets";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { OriginalSculpture } from "@/components/visualisations/glass/OriginalSculpture";

export function HomeHero() {
  return (
    <section
      className="scene-hero relative isolate overflow-hidden bg-white"
      id="intelligence-engine-hero"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-texture opacity-[0.22]"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 md:py-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-2 lg:px-8 lg:py-16">
        <div className="relative z-20 max-w-xl">
          <h1 className="font-heading text-[clamp(2.4rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-navy text-balance">
            <span className="block">{brandCopy.headline}</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-navy/70 md:text-lg">
            We help enterprises and governments turn complex data into
            responsible AI systems, measurable decisions and action.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <PrimaryButton href="/contact?interest=consultation">
              {brandCopy.primaryCta}
            </PrimaryButton>
            <SecondaryButton href="/capabilities">
              {brandCopy.secondaryCta}
            </SecondaryButton>
          </div>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-muted-light md:text-sm">
            {brandCopy.trustStatement}
          </p>
        </div>

        <InfinityStage />
      </div>
    </section>
  );
}

/** Stages the original infinity on a technical wall + floor grid. */
function InfinityStage() {
  return (
    <div
      id="home-infinity-stage"
      className="relative mx-auto aspect-[4/3] w-full max-w-2xl lg:mx-0 lg:max-w-none"
    >
      <div className="relative z-10 flex h-full items-center justify-center">
        <OriginalSculpture
          src={mockupAssets.originalInfinityHero}
          alt="Glass infinity — governed intelligence"
          priority
          className="w-full max-w-none lg:w-[118%] lg:translate-x-[2%] lg:scale-110"
        />
      </div>

      <HeroWallGrid />
      <HeroFloorGrid />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[10%] left-1/2 z-20 h-20 w-[62%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(20,159,230,0.16),transparent_70%)] blur-xl"
      />

      <svg
        aria-hidden
        viewBox="0 0 640 480"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      >
        <path
          d="M58 188 C 18 136, 78 72, 162 112"
          fill="none"
          stroke="#149fe6"
          strokeWidth="1.4"
          opacity="0.45"
        />
        <path
          d="M580 168 C 632 118, 608 70, 516 102"
          fill="none"
          stroke="#149fe6"
          strokeWidth="1.4"
          opacity="0.4"
        />
        <circle cx="148" cy="118" r="3" fill="#ff4d5e" />
        <circle cx="528" cy="112" r="2.6" fill="#ff4d5e" />
        <circle cx="92" cy="232" r="2" fill="#149fe6" />
        <circle cx="556" cy="208" r="2" fill="#149fe6" />
      </svg>
    </div>
  );
}

const WALL_COLS = 16;
const WALL_ROWS = 12;
const WALL_W = 800;
const WALL_H = 600;
const WALL_CW = WALL_W / WALL_COLS;
const WALL_CH = WALL_H / WALL_ROWS;

const wallNodes = [
  [2, 1],
  [5, 1],
  [9, 2],
  [13, 1],
  [1, 4],
  [4, 3],
  [7, 4],
  [11, 3],
  [14, 5],
  [3, 7],
  [8, 6],
  [12, 7],
  [15, 8],
  [2, 10],
  [6, 9],
  [10, 10],
  [13, 11],
] as const;

/** Flat blueprint wall behind the infinity. */
function HeroWallGrid() {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${WALL_W} ${WALL_H}`}
      className="pointer-events-none absolute inset-[-6%] z-[15] h-[112%] w-[112%] mix-blend-multiply"
      style={{
        WebkitMaskImage:
          "radial-gradient(ellipse 82% 76% at 52% 44%, rgba(0,0,0,0.35) 12%, #000 48%, transparent 80%)",
        maskImage:
          "radial-gradient(ellipse 82% 76% at 52% 44%, rgba(0,0,0,0.35) 12%, #000 48%, transparent 80%)",
      }}
    >
      {Array.from({ length: WALL_ROWS + 1 }, (_, row) => {
        const y = row * WALL_CH;
        return (
          <line
            key={`h-${row}`}
            x1="0"
            y1={y}
            x2={WALL_W}
            y2={y}
            stroke="#149fe6"
            strokeWidth="1"
            opacity="0.34"
          />
        );
      })}
      {Array.from({ length: WALL_COLS + 1 }, (_, col) => {
        const x = col * WALL_CW;
        return (
          <line
            key={`v-${col}`}
            x1={x}
            y1="0"
            x2={x}
            y2={WALL_H}
            stroke="#149fe6"
            strokeWidth="1"
            opacity="0.3"
          />
        );
      })}
      {wallNodes.map(([col, row]) => (
        <rect
          key={`${col}-${row}`}
          x={col * WALL_CW - 3}
          y={row * WALL_CH - 3}
          width="6"
          height="6"
          fill="#149fe6"
          opacity="0.62"
        />
      ))}
    </svg>
  );
}

function HeroFloorGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-[-10%] bottom-[-8%] z-20 h-[50%] mix-blend-multiply"
      style={{
        transform: "perspective(720px) rotateX(64deg)",
        transformOrigin: "50% 100%",
        backgroundImage:
          "linear-gradient(rgba(20,159,230,0.36) 1px, transparent 1px), linear-gradient(90deg, rgba(20,159,230,0.28) 1px, transparent 1px)",
        backgroundSize: "38px 38px",
        WebkitMaskImage:
          "linear-gradient(to top, rgba(0,0,0,0.78) 6%, transparent 86%)",
        maskImage:
          "linear-gradient(to top, rgba(0,0,0,0.78) 6%, transparent 86%)",
      }}
    />
  );
}
