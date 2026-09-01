import { cn } from "@/lib/utils";
import { mockupAssets } from "@/config/mockup-assets";
import { OriginalSculpture } from "@/components/visualisations/glass/OriginalSculpture";
import { CapabilityMark } from "@/components/visualisations/glass/CapabilityMarks";

export type StackLabel = {
  label: string;
  mark: string;
};

const defaultLabels: StackLabel[] = [
  { label: "Executive intent", mark: "intent" },
  { label: "Strategy & roadmap", mark: "strategy" },
  { label: "Data foundation", mark: "data" },
  { label: "AI modalities", mark: "modalities" },
  { label: "Governance & risk", mark: "governance" },
  { label: "Engineering & integration", mark: "product-engineering" },
  { label: "Managed operations", mark: "managed-services" },
];

/** Red node positions measured from original-capability-stack.png */
const leftNodes = [
  { x: 22.4, y: 16.0 },
  { x: 22.5, y: 26.9 },
  { x: 22.6, y: 37.8 },
  { x: 22.6, y: 48.8 },
  { x: 22.9, y: 59.5 },
  { x: 22.9, y: 69.8 },
  { x: 22.9, y: 79.1 },
] as const;

const rightNodes = [
  { x: 78.9, y: 15.6 },
  { x: 78.9, y: 26.6 },
  { x: 78.8, y: 37.6 },
  { x: 78.8, y: 48.6 },
  { x: 78.8, y: 59.3 },
  { x: 78.8, y: 69.6 },
  { x: 78.8, y: 79.0 },
] as const;

type CapabilityGlassStackProps = {
  labels?: StackLabel[];
  className?: string;
};

export function CapabilityGlassStack({
  labels = defaultLabels,
  className,
}: CapabilityGlassStackProps) {
  return (
    <div
      id="capabilities-stack"
      className={cn("relative mx-auto w-full max-w-xl lg:max-w-none", className)}
    >
      <div className="relative w-[52%]">
        <div
          className="relative z-10"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 12%, #000 20%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 12%, #000 20%)",
          }}
        >
          <OriginalSculpture
            src={mockupAssets.originalCapabilityStack}
            alt="Seven-layer capability stack"
            orientation="portrait"
            priority
            className="mix-blend-multiply"
          />
        </div>
        <StackFloor />
        <LeftFlow />
      </div>

      <RightConnectors />

      <ol className="absolute inset-0 z-20">
        {labels.map((item, index) => {
          const node = rightNodes[index];
          if (!node) return null;
          return (
            <li
              key={item.label}
              className="absolute left-[56%] flex -translate-y-1/2 items-center gap-2 sm:left-[55%] sm:gap-2.5"
              style={{ top: `${node.y}%` }}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d2e8f4] bg-white text-tech-blue shadow-[0_4px_12px_rgba(20,159,230,0.08)] sm:h-8 sm:w-8">
                <CapabilityMark name={item.mark} className="h-3.5 w-3.5" />
              </span>
              <span className="text-[0.74rem] font-medium leading-snug text-navy sm:text-[0.86rem]">
                {item.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** One origin, seven non-crossing curves into the left plate nodes. */
function LeftFlow() {
  const viewW = 1400;
  const viewH = 1000;
  const overflow = 46;
  const span = overflow + 100;
  const toX = (pct: number) => ((overflow + pct) / span) * viewW;
  const toY = (pct: number) => (pct / 100) * viewH;

  const originX = 210;
  const originY = 455;

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${viewW} ${viewH}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute top-0 z-20 hidden h-full lg:block"
      style={{ left: `-${overflow}%`, width: `${span}%` }}
    >
      {leftNodes.map((node, index) => {
        const offset = index - (leftNodes.length - 1) / 2;
        const startX = originX + Math.abs(offset) * 10;
        const startY = originY + offset * 7;
        const endX = toX(node.x);
        const endY = toY(node.y);
        const midX = (startX + endX) / 2;

        return (
          <path
            key={`in-${node.y}`}
            d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX + 40} ${endY}, ${endX} ${endY}`}
            fill="none"
            stroke="#7ec8e8"
            strokeWidth="0.9"
            opacity="0.42"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
      {leftNodes.map((node) => (
        <circle
          key={`ln-${node.y}`}
          cx={toX(node.x)}
          cy={toY(node.y)}
          r="2.1"
          fill="#ff4d5e"
        />
      ))}
    </svg>
  );
}

function RightConnectors() {
  const sculpture = 52;
  const iconX = 552;

  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full sm:block"
    >
      {rightNodes.map((node) => {
        const x1 = (sculpture * node.x) / 100;
        const y = node.y * 10;
        return (
          <g key={`out-${node.y}`}>
            <line
              x1={x1}
              y1={y}
              x2={iconX}
              y2={y}
              stroke="#7ec8e8"
              strokeWidth="0.85"
              opacity="0.4"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx={x1} cy={y} r="2.1" fill="#ff4d5e" />
          </g>
        );
      })}
    </svg>
  );
}

function StackFloor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-[-8%] bottom-[2%] z-[5] h-[34%] mix-blend-multiply"
      style={{
        transform: "perspective(680px) rotateX(64deg)",
        transformOrigin: "50% 100%",
        backgroundImage:
          "linear-gradient(rgba(20,159,230,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(20,159,230,0.14) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        WebkitMaskImage:
          "radial-gradient(ellipse 62% 70% at 50% 82%, #000 12%, transparent 74%)",
        maskImage:
          "radial-gradient(ellipse 62% 70% at 50% 82%, #000 12%, transparent 74%)",
      }}
    >
      <span className="absolute left-[28%] top-[72%] h-1.5 w-1.5 rounded-full bg-tech-blue/50" />
      <span className="absolute left-[46%] top-[80%] h-1.5 w-1.5 rounded-full bg-brand/55" />
      <span className="absolute left-[64%] top-[70%] h-1.5 w-1.5 rounded-full bg-navy/35" />
    </div>
  );
}
