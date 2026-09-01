import { cn } from "@/lib/utils";

type IndiaNetworkMapProps = {
  className?: string;
  showLegend?: boolean;
  /** Soft labels for opportunity overlay nodes */
  nodeLabels?: string[];
};

/**
 * Stylised India silhouette + delivery mesh — SVG/CSS only (no page mockups).
 */
export function IndiaNetworkMap({
  className,
  showLegend = true,
  nodeLabels = [],
}: IndiaNetworkMapProps) {
  const labels = nodeLabels.slice(0, 4);
  const labelPositions = [
    { top: "16%", left: "8%" },
    { top: "20%", right: "6%" },
    { bottom: "20%", left: "10%" },
    { bottom: "16%", right: "8%" },
  ] as const;

  return (
    <div
      className={cn(
        "relative min-h-[17rem] overflow-hidden rounded-2xl border border-white/80 bg-gradient-to-br from-[#eef5fc] via-white to-[#f4f8fc] md:min-h-[20rem]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_55%_42%,rgba(20,159,230,0.14),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(7,26,61,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(7,26,61,0.04) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <svg
        aria-hidden
        viewBox="0 0 400 320"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="indiaFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#bfdbfe" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="indiaMesh" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(20,159,230,0.45)" />
            <stop offset="100%" stopColor="rgba(255,77,94,0.35)" />
          </linearGradient>
          <filter id="indiaSoft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* Soft floor */}
        <ellipse
          cx="210"
          cy="285"
          rx="110"
          ry="14"
          fill="rgba(20,159,230,0.12)"
        />

        {/* Simplified India outline (stylised, not survey-grade) */}
        <path
          d="M198 28
            C214 30, 228 38, 238 52
            C248 66, 252 78, 258 92
            C266 110, 278 118, 292 124
            C304 130, 312 142, 308 156
            C304 170, 292 176, 280 184
            C268 192, 262 206, 258 222
            C254 238, 246 250, 232 258
            C218 266, 206 272, 198 286
            C190 272, 178 264, 164 254
            C150 244, 142 230, 138 214
            C134 198, 128 186, 118 176
            C106 164, 98 152, 102 136
            C106 120, 118 114, 132 106
            C146 98, 152 86, 156 70
            C160 54, 170 40, 182 32
            C188 28, 192 28, 198 28 Z"
          fill="url(#indiaFill)"
          stroke="rgba(20,159,230,0.55)"
          strokeWidth="1.6"
        />
        <path
          d="M198 28
            C214 30, 228 38, 238 52
            C248 66, 252 78, 258 92
            C266 110, 278 118, 292 124
            C304 130, 312 142, 308 156
            C304 170, 292 176, 280 184
            C268 192, 262 206, 258 222
            C254 238, 246 250, 232 258
            C218 266, 206 272, 198 286
            C190 272, 178 264, 164 254
            C150 244, 142 230, 138 214
            C134 198, 128 186, 118 176
            C106 164, 98 152, 102 136
            C106 120, 118 114, 132 106
            C146 98, 152 86, 156 70
            C160 54, 170 40, 182 32
            C188 28, 192 28, 198 28 Z"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="0.8"
        />

        {/* Delivery mesh */}
        <g
          stroke="url(#indiaMesh)"
          strokeWidth="1.05"
          strokeDasharray="3 4.5"
          fill="none"
          opacity="0.88"
        >
          <path d="M150 120 L180 150 L210 140 L240 160 L270 145" />
          <path d="M165 175 L195 165 L220 190 L250 175" />
          <path d="M180 150 L195 165 L210 140" />
          <path d="M210 140 L220 190 L240 160" />
          <path d="M200 210 L225 200 L245 220" />
          <path d="M142 148 L165 175 L180 150" />
          <path d="M198 108 L210 140 L232 118" />
          <path d="M232 118 L270 145 L250 175" />
          <path d="M165 175 L200 210 L220 190" />
          <path d="M240 160 L245 220 L210 230" />
          <path d="M132 132 L150 120 L168 104" />
        </g>

        {[
          [180, 150, "#149fe6"],
          [210, 140, "#ff4d5e"],
          [240, 160, "#149fe6"],
          [195, 165, "#149fe6"],
          [250, 175, "#ff4d5e"],
          [225, 200, "#149fe6"],
          [165, 175, "#149fe6"],
          [142, 148, "#149fe6"],
          [232, 118, "#ff4d5e"],
          [200, 210, "#149fe6"],
          [168, 104, "#149fe6"],
          [270, 145, "#ff4d5e"],
        ].map(([x, y, color], i) => (
          <g key={i} filter="url(#indiaSoft)">
            <circle cx={x} cy={y} r={i % 3 === 0 ? 5.5 : 4} fill={String(color)} />
            <circle
              cx={x}
              cy={y}
              r={i % 3 === 0 ? 9 : 7}
              fill={String(color)}
              opacity="0.18"
            />
          </g>
        ))}
      </svg>

      {showLegend ? (
        <div className="absolute right-3 top-3 z-10 rounded-xl border border-white/80 bg-white/90 px-3 py-2 text-[0.65rem] shadow-sm backdrop-blur-md sm:right-4 sm:top-4">
          <p className="flex items-center gap-2 text-navy">
            <span className="h-2 w-2 rounded-full bg-tech-blue" />
            Service delivery nodes
          </p>
          <p className="mt-1.5 flex items-center gap-2 text-navy">
            <span className="h-2 w-2 rounded-full bg-brand" />
            Priority focus areas
          </p>
          <p className="mt-1.5 flex items-center gap-2 text-muted-light">
            <span className="h-px w-3 border-t border-dashed border-tech-blue/50" />
            Delivery systems mesh
          </p>
        </div>
      ) : null}

      {labels.map((label, index) => {
        const pos = labelPositions[index];
        return (
          <div key={label} className="absolute z-10 max-w-[11rem]" style={pos}>
            <div className="rounded-xl border border-white/90 bg-white/90 px-3 py-2 shadow-[0_12px_28px_rgba(11,31,58,0.1)] backdrop-blur-md">
              <p className="text-xs font-semibold leading-snug text-navy line-clamp-2">
                {label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
