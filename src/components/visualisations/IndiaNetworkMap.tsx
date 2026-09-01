import { useId } from "react";
import { cn } from "@/lib/utils";

type IndiaNetworkMapProps = {
  className?: string;
  showLegend?: boolean;
  nodeLabels?: string[];
  variant?: "hero" | "panel";
};

type LonLat = readonly [number, number];

const BOUNDS = { minLon: 68.0, maxLon: 97.6, minLat: 7.7, maxLat: 37.2 };
const VIEW = { w: 640, h: 780, padX: 36, padY: 28 };

function project(lon: number, lat: number): [number, number] {
  const x =
    VIEW.padX +
    ((lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)) *
      (VIEW.w - VIEW.padX * 2);
  const y =
    VIEW.padY +
    ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) *
      (VIEW.h - VIEW.padY * 2);
  return [x, y];
}

function toPath(points: readonly LonLat[]): string {
  return `${points
    .map(([lon, lat], index) => {
      const [x, y] = project(lon, lat);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ")} Z`;
}

/** Natural Earth India mainland — kept unskewed so the country stays readable. */
const INDIA: readonly LonLat[] = [
  [77.837, 35.494],
  [78.912, 34.322],
  [78.811, 33.506],
  [79.209, 32.994],
  [79.176, 32.484],
  [78.458, 32.618],
  [78.739, 31.516],
  [79.721, 30.883],
  [81.111, 30.183],
  [80.477, 29.73],
  [80.088, 28.794],
  [81.057, 28.416],
  [82.0, 27.925],
  [83.304, 27.365],
  [84.675, 27.235],
  [85.252, 26.726],
  [86.024, 26.631],
  [87.227, 26.398],
  [88.06, 26.415],
  [88.175, 26.81],
  [88.043, 27.446],
  [88.12, 27.877],
  [88.73, 28.087],
  [88.814, 27.299],
  [88.836, 27.099],
  [89.745, 26.719],
  [90.373, 26.876],
  [91.218, 26.809],
  [92.033, 26.838],
  [92.104, 27.453],
  [91.697, 27.772],
  [92.503, 27.897],
  [93.413, 28.641],
  [94.566, 29.277],
  [95.405, 29.032],
  [96.118, 29.453],
  [96.587, 28.831],
  [96.249, 28.411],
  [97.327, 28.262],
  [97.403, 27.883],
  [97.052, 27.699],
  [97.134, 27.084],
  [96.419, 27.265],
  [95.125, 26.574],
  [95.155, 26.001],
  [94.603, 25.162],
  [94.553, 24.675],
  [94.107, 23.851],
  [93.325, 24.079],
  [93.286, 23.044],
  [93.06, 22.703],
  [93.166, 22.278],
  [92.673, 22.041],
  [92.146, 23.627],
  [91.87, 23.624],
  [91.706, 22.985],
  [91.159, 23.504],
  [91.468, 24.073],
  [91.915, 24.13],
  [92.376, 24.977],
  [91.8, 25.147],
  [90.872, 25.133],
  [89.921, 25.27],
  [89.832, 25.965],
  [89.355, 26.014],
  [88.563, 26.447],
  [88.21, 25.768],
  [88.932, 25.239],
  [88.306, 24.866],
  [88.084, 24.502],
  [88.7, 24.234],
  [88.53, 23.631],
  [88.876, 22.879],
  [89.032, 22.056],
  [88.889, 21.691],
  [88.208, 21.703],
  [86.976, 21.496],
  [87.033, 20.743],
  [86.499, 20.152],
  [85.06, 19.479],
  [83.941, 18.302],
  [83.189, 17.671],
  [82.193, 17.017],
  [82.191, 16.557],
  [81.693, 16.31],
  [80.792, 15.952],
  [80.325, 15.899],
  [80.025, 15.136],
  [80.233, 13.836],
  [80.286, 13.006],
  [79.863, 12.056],
  [79.858, 10.357],
  [79.341, 10.309],
  [78.885, 9.546],
  [79.19, 9.217],
  [78.278, 8.933],
  [77.941, 8.253],
  [77.54, 7.966],
  [76.593, 8.899],
  [76.13, 10.3],
  [75.746, 11.308],
  [75.396, 11.781],
  [74.865, 12.742],
  [74.617, 13.993],
  [74.444, 14.617],
  [73.534, 15.991],
  [73.12, 17.929],
  [72.821, 19.208],
  [72.824, 20.42],
  [72.631, 21.356],
  [71.175, 20.757],
  [70.47, 20.877],
  [69.164, 22.089],
  [69.645, 22.451],
  [69.35, 22.843],
  [68.177, 23.692],
  [68.843, 24.359],
  [71.043, 24.357],
  [70.845, 25.215],
  [70.283, 25.722],
  [70.169, 26.492],
  [69.514, 26.941],
  [70.616, 27.989],
  [71.778, 27.913],
  [72.824, 28.962],
  [73.451, 29.976],
  [74.421, 30.98],
  [74.406, 31.693],
  [75.259, 32.271],
  [74.452, 32.765],
  [74.104, 33.441],
  [73.75, 34.318],
  [74.24, 34.749],
  [75.757, 34.505],
  [76.872, 34.654],
  [77.837, 35.494],
];

const HUBS = [
  { lon: 77.21, lat: 28.61, kind: "blue", r: 7.6 },
  { lon: 72.88, lat: 19.08, kind: "blue", r: 7.2 },
  { lon: 77.59, lat: 12.97, kind: "blue", r: 7.0 },
  { lon: 78.49, lat: 17.39, kind: "blue", r: 4.8 },
  { lon: 80.27, lat: 13.08, kind: "blue", r: 4.6 },
  { lon: 80.95, lat: 26.85, kind: "red", r: 6.8 },
  { lon: 88.36, lat: 22.57, kind: "red", r: 6.6 },
] as const;

const JUNCTIONS: readonly LonLat[] = [
  [75.79, 26.91],
  [72.57, 23.02],
  [73.86, 18.52],
  [76.27, 9.93],
  [77.41, 23.26],
  [85.14, 25.61],
  [91.74, 26.14],
  [76.78, 30.73],
  [78.03, 30.32],
  [79.09, 21.15],
  [83.3, 17.73],
  [74.8, 34.08],
  [80.33, 26.45],
  [85.82, 20.27],
  [75.12, 15.36],
  [75.86, 22.72],
  [72.83, 21.17],
  [76.96, 11.02],
  [85.33, 23.34],
  [81.63, 21.25],
];

const MESH: readonly LonLat[][] = [
  [
    [77.21, 28.61],
    [75.79, 26.91],
    [72.57, 23.02],
    [72.88, 19.08],
  ],
  [
    [77.21, 28.61],
    [80.95, 26.85],
    [85.14, 25.61],
    [88.36, 22.57],
  ],
  [
    [77.21, 28.61],
    [77.41, 23.26],
    [78.49, 17.39],
    [77.59, 12.97],
  ],
  [
    [72.88, 19.08],
    [75.12, 15.36],
    [77.59, 12.97],
    [80.27, 13.08],
  ],
  [
    [88.36, 22.57],
    [85.82, 20.27],
    [83.3, 17.73],
    [80.27, 13.08],
  ],
  [
    [88.36, 22.57],
    [91.74, 26.14],
  ],
  [
    [80.95, 26.85],
    [79.09, 21.15],
    [72.88, 19.08],
  ],
  [
    [76.78, 30.73],
    [77.21, 28.61],
    [80.33, 26.45],
    [85.14, 25.61],
  ],
  [
    [72.57, 23.02],
    [75.86, 22.72],
    [81.63, 21.25],
    [85.33, 23.34],
    [88.36, 22.57],
  ],
];

function projectedCentroid(points: readonly LonLat[]): [number, number] {
  let sx = 0;
  let sy = 0;
  for (const [lon, lat] of points) {
    const [x, y] = project(lon, lat);
    sx += x;
    sy += y;
  }
  return [sx / points.length, sy / points.length];
}

function insetRings(points: readonly LonLat[], count: number): string[] {
  const [cx, cy] = projectedCentroid(points);
  return Array.from({ length: count }, (_, i) => {
    const t = 0.92 - i * 0.055;
    return `${points
      .map(([lon, lat], index) => {
        const [x, y] = project(lon, lat);
        return `${index === 0 ? "M" : "L"} ${(cx + (x - cx) * t).toFixed(2)} ${(cy + (y - cy) * t).toFixed(2)}`;
      })
      .join(" ")} Z`;
  });
}

function topoLines(): string[] {
  const lines: string[] = [];
  for (let i = 0; i < 28; i += 1) {
    const y0 = 40 + i * 26;
    const parts: string[] = [];
    for (let x = 20; x <= 620; x += 16) {
      const wave = Math.sin(x * 0.035 + i * 0.7) * 4.2;
      const point = `${x.toFixed(1)} ${(y0 + wave).toFixed(1)}`;
      parts.push(parts.length === 0 ? `M ${point}` : `L ${point}`);
    }
    lines.push(parts.join(" "));
  }
  return lines;
}

function linePath(points: readonly LonLat[]): string {
  return points
    .map(([lon, lat], index) => {
      const [x, y] = project(lon, lat);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export function IndiaNetworkMap({
  className,
  showLegend = true,
  nodeLabels = [],
  variant = "panel",
}: IndiaNetworkMapProps) {
  const uid = useId().replace(/:/g, "");
  const hero = variant === "hero";
  const labels = nodeLabels.slice(0, 4);
  const labelPositions = [
    { top: "10%", left: "0%" },
    { top: "14%", right: "0%" },
    { bottom: "16%", left: "2%" },
    { bottom: "12%", right: "2%" },
  ] as const;

  const indiaPath = toPath(INDIA);
  const rings = insetRings(INDIA, 10);
  const relief = topoLines();

  return (
    <div
      role="img"
      aria-label="Map of India with service delivery nodes, priority focus areas and a data mesh"
      className={cn(
        "relative overflow-visible bg-transparent",
        hero ? "min-h-[24rem] md:min-h-[30rem]" : "min-h-[17rem] md:min-h-[20rem]",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        className="h-full w-full bg-transparent"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id={`${uid}-top`} x1="18%" y1="6%" x2="82%" y2="94%">
            <stop offset="0%" stopColor="#f4faff" />
            <stop offset="45%" stopColor="#e4f2fb" />
            <stop offset="100%" stopColor="#c5e0f0" />
          </linearGradient>
          <linearGradient id={`${uid}-side`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8fbed8" />
            <stop offset="100%" stopColor="#6a9db8" />
          </linearGradient>
          <radialGradient id={`${uid}-blue`} cx="34%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#6ed0ff" />
            <stop offset="100%" stopColor="#0d7ab8" />
          </radialGradient>
          <radialGradient id={`${uid}-red`} cx="34%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="28%" stopColor="#ff8a96" />
            <stop offset="100%" stopColor="#c81d30" />
          </radialGradient>
          <filter id={`${uid}-glow`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`${uid}-soft`} x="-25%" y="-15%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <clipPath id={`${uid}-clip`}>
            <path d={indiaPath} />
          </clipPath>
        </defs>

        <ellipse
          cx="330"
          cy="730"
          rx="168"
          ry="22"
          fill="rgba(20, 80, 130, 0.1)"
          filter={`url(#${uid}-soft)`}
        />

        {Array.from({ length: 5 }, (_, layer) => (
          <path
            key={layer}
            d={indiaPath}
            transform={`translate(${(layer + 1) * 1.4} ${(layer + 1) * 1.8})`}
            fill={`url(#${uid}-side)`}
          />
        ))}

        <path d={indiaPath} fill={`url(#${uid}-top)`} />

        <g clipPath={`url(#${uid}-clip)`}>
          {relief.map((d, index) => (
            <path
              key={`relief-${index}`}
              d={d}
              fill="none"
              stroke="#149fe6"
              strokeWidth="0.7"
              opacity="0.22"
            />
          ))}
          {rings.map((d, index) => (
            <path
              key={`ring-${index}`}
              d={d}
              fill="none"
              stroke="#149fe6"
              strokeWidth="0.85"
              opacity="0.28"
            />
          ))}
        </g>

        <path
          d={indiaPath}
          fill="none"
          stroke="#5a9ec0"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d={indiaPath}
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="0.8"
          transform="translate(-0.5 -0.5)"
        />

        <g
          fill="none"
          stroke="#4eb6dc"
          strokeWidth="1.05"
          strokeDasharray="3.2 4.4"
          strokeLinecap="round"
          opacity="0.85"
        >
          {MESH.map((segment) => (
            <path
              key={segment.map((point) => point.join(",")).join("-")}
              d={linePath(segment)}
            />
          ))}
        </g>

        {JUNCTIONS.map(([lon, lat]) => {
          const [x, y] = project(lon, lat);
          return (
            <circle key={`${lon}-${lat}`} cx={x} cy={y} r="2" fill="#0f6ea3" />
          );
        })}

        {HUBS.map((hub) => {
          const [x, y] = project(hub.lon, hub.lat);
          const color = hub.kind === "red" ? "#ff4d5e" : "#149fe6";
          const fill =
            hub.kind === "red" ? `url(#${uid}-red)` : `url(#${uid}-blue)`;
          return (
            <g key={`${hub.lon}-${hub.lat}`} filter={`url(#${uid}-glow)`}>
              <circle
                cx={x}
                cy={y}
                r={hub.r + 10}
                fill="none"
                stroke={color}
                strokeWidth="1"
                opacity="0.28"
              />
              <circle cx={x} cy={y} r={hub.r + 5} fill={color} opacity="0.1" />
              <circle cx={x} cy={y} r={hub.r} fill={fill} />
            </g>
          );
        })}
      </svg>

      {showLegend ? (
        <div className="absolute right-0 top-0 z-10 rounded-xl border border-[#e4edf4] bg-white/95 px-3 py-2 text-[0.65rem] shadow-[0_10px_24px_rgba(20,45,75,0.06)] sm:right-1 sm:top-1">
          <p className="flex items-center gap-2 text-[#071b40]">
            <span className="h-2 w-2 rounded-full bg-[#149fe6]" />
            Service delivery nodes
          </p>
          <p className="mt-1.5 flex items-center gap-2 text-[#071b40]">
            <span className="h-2 w-2 rounded-full bg-[#ff4d5e]" />
            Priority focus areas
          </p>
          <p className="mt-1.5 flex items-center gap-2 text-[#5d7394]">
            <span className="inline-block h-px w-3.5 border-t border-dashed border-[#149fe6]/80" />
            Data & systems mesh
          </p>
        </div>
      ) : null}

      {labels.map((label, index) => {
        const pos = labelPositions[index];
        return (
          <div key={label} className="absolute z-10 max-w-[11rem]" style={pos}>
            <div className="rounded-xl border border-white/90 bg-white/90 px-3 py-2 shadow-[0_12px_28px_rgba(11,31,58,0.1)]">
              <p className="line-clamp-2 text-xs font-semibold leading-snug text-navy">
                {label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
