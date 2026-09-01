import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type IconProps = { className?: string };

export type AmbitionStep = {
  title: string;
  description: string;
  icon: (props: IconProps) => ReactNode;
};

const defaultSteps: AmbitionStep[] = [
  {
    title: "Strategy",
    description: "Align AI initiatives with mission outcomes and measurable value.",
    icon: IconStrategy,
  },
  {
    title: "Data",
    description: "Unify, contextualize and prepare data for trusted AI outcomes.",
    icon: IconData,
  },
  {
    title: "Generative AI",
    description: "Create with context, grounded in enterprise knowledge.",
    icon: IconSpark,
  },
  {
    title: "Agentic AI",
    description: "Autonomous systems that act, adapt and orchestrate.",
    icon: IconAgent,
  },
  {
    title: "Governance",
    description: "Policies, controls and risk management by design.",
    icon: IconShield,
  },
  {
    title: "Product Engineering",
    description: "Build secure, scalable AI products that deliver impact.",
    icon: IconCode,
  },
  {
    title: "Managed Services",
    description:
      "Operate, optimize and evolve AI systems with continuous assurance.",
    icon: IconHeadset,
  },
];

const COLS = 7;
const WAVE_W = 700;
const WAVE_H = 64;
const WAVE_MID = 32;
const WAVE_AMP = 11;

function wavePoint(t: number) {
  const x = ((t + 0.5) / COLS) * WAVE_W;
  const y = WAVE_MID + WAVE_AMP * Math.sin(Math.PI * t);
  return { x, y };
}

function waveAngle(t: number) {
  const dx = WAVE_W / COLS;
  const dy = WAVE_AMP * Math.PI * Math.cos(Math.PI * t);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

const wavePath = (() => {
  const samples = 120;
  const points: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * (COLS - 1);
    const { x, y } = wavePoint(t);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return `M ${points.join(" L ")}`;
})();

const flowMarks = Array.from({ length: COLS - 1 }, (_, i) => {
  const t = i + 0.5;
  return {
    ...wavePoint(t),
    angle: waveAngle(t),
    fill: i % 2 === 1 ? "#149fe6" : "#ff4d5e",
  };
});

type HomeAmbitionFlowProps = {
  steps?: AmbitionStep[];
  className?: string;
};

/**
 * Home process strip — original line icons, sine path through ring
 * centres, coral/cyan arrows on the path.
 */
export function HomeAmbitionFlow({
  steps = defaultSteps,
  className,
}: HomeAmbitionFlowProps) {
  return (
    <div className={cn("relative", className)}>
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-16 w-full lg:block"
        viewBox={`0 0 ${WAVE_W} ${WAVE_H}`}
        preserveAspectRatio="none"
      >
        <path
          d={wavePath}
          fill="none"
          stroke="#149fe6"
          strokeOpacity="0.72"
          strokeWidth="1.4"
          strokeDasharray="1.4 6.2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {flowMarks.map((mark) => (
          <g
            key={`${mark.x}-${mark.y}`}
            transform={`translate(${mark.x} ${mark.y}) rotate(${mark.angle})`}
          >
            <path
              d="M-2.6 -2.5 L2.8 0 L-2.6 2.5"
              fill="none"
              stroke={mark.fill}
              strokeWidth="1.55"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>

      <ol className="relative z-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-7 lg:gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <li
              key={step.title}
              className="flex flex-col items-center text-center"
            >
              <span
                className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-navy"
                style={{
                  border: "1px solid rgba(20,159,230,0.26)",
                  boxShadow:
                    "0 8px 20px rgba(20,159,230,0.13), 0 0 0 7px rgba(20,159,230,0.05)",
                }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-heading text-sm font-semibold text-navy">
                {step.title}
              </h3>
              <p className="mt-1.5 max-w-[10rem] text-[0.72rem] leading-snug text-navy/65">
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function iconClass(className?: string) {
  return cn("h-5 w-5", className);
}

function IconStrategy({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClass(className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="11" cy="13.2" r="6.4" />
      <circle cx="11" cy="13.2" r="3.3" />
      <circle cx="11" cy="13.2" r="0.85" fill="currentColor" stroke="none" />
      <path d="M16.6 3.8 L13.8 10.4" strokeLinecap="round" />
      <path
        d="M16.6 3.8 L14.7 4.55 L15.45 6.45 Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function IconData({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClass(className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <ellipse cx="12" cy="6" rx="6.2" ry="2.15" />
      <path d="M5.8 6 v4.4 c0 1.2 2.8 2.15 6.2 2.15 s6.2-0.95 6.2-2.15 V6" />
      <path d="M5.8 10.4 v4.4 c0 1.2 2.8 2.15 6.2 2.15 s6.2-0.95 6.2-2.15 V10.4" />
    </svg>
  );
}

function IconSpark({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClass(className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3.2 L13.55 10.45 L20.8 12 L13.55 13.55 L12 20.8 L10.45 13.55 L3.2 12 L10.45 10.45 Z" />
    </svg>
  );
}

function IconAgent({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClass(className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="12" cy="12" r="2.35" />
      <circle cx="12" cy="4.7" r="1.55" />
      <circle cx="5.8" cy="16.6" r="1.55" />
      <circle cx="18.2" cy="16.6" r="1.55" />
      <path d="M12 9.65 V6.3 M10.15 13.7 L7.15 15.55 M13.85 13.7 L16.85 15.55" />
    </svg>
  );
}

function IconShield({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClass(className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3.4 L19.1 6.3 v5.1 c0 4.35-2.9 7.35-7.1 8.7 C7.8 18.75 4.9 15.75 4.9 11.4 V6.3 Z" />
      <path
        d="M9.15 12.15 L11.1 14.05 L15.05 9.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCode({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClass(className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8.4 8.1 L4.7 12 L8.4 15.9" />
      <path d="M15.6 8.1 L19.3 12 L15.6 15.9" />
      <path d="M13.35 7.35 L10.65 16.65" />
    </svg>
  );
}

function IconHeadset({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClass(className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="10" r="3.2" />
      <path d="M5.7 11.2 a6.3 6.3 0 0 1 12.6 0" />
      <rect x="4.55" y="10.5" width="2.25" height="4.3" rx="0.95" />
      <rect x="17.2" y="10.5" width="2.25" height="4.3" rx="0.95" />
      <path d="M6.7 14.8 c0.2 2.2 2.3 3.5 5.3 3.5" />
    </svg>
  );
}
