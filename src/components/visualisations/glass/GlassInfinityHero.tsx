import { cn } from "@/lib/utils";

/**
 * Sharp glass infinity for the home hero — interlocking glass loops,
 * coral/cyan nodes and a technical grid, without baked depth-of-field.
 */
export function GlassInfinityHero({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative aspect-[4/3] w-full", className)}
      role="img"
      aria-label="Glass infinity — governed intelligence"
    >
      <svg viewBox="0 0 640 480" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="inf-tube" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="32%" stopColor="#e8f6fd" />
            <stop offset="68%" stopColor="#7ec8f0" />
            <stop offset="100%" stopColor="#149fe6" />
          </linearGradient>
          <linearGradient id="inf-tube-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#d4eefb" />
            <stop offset="100%" stopColor="#3baee8" />
          </linearGradient>
          <radialGradient id="inf-orb-coral" cx="32%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#ff9aa3" />
            <stop offset="55%" stopColor="#ff4d5e" />
            <stop offset="100%" stopColor="#c81e3a" />
          </radialGradient>
          <radialGradient id="inf-orb-cyan" cx="32%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#c9edfb" />
            <stop offset="55%" stopColor="#149fe6" />
            <stop offset="100%" stopColor="#0b6fa8" />
          </radialGradient>
        </defs>

        <g opacity="0.28" stroke="#8aa3bb" strokeWidth="0.7" fill="none">
          {Array.from({ length: 11 }, (_, i) => (
            <line
              key={`h${i}`}
              x1="48"
              y1={90 + i * 28}
              x2="592"
              y2={90 + i * 28}
            />
          ))}
          {Array.from({ length: 15 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={48 + i * 36}
              y1="90"
              x2={48 + i * 36}
              y2="398"
            />
          ))}
        </g>

        <ellipse
          cx="320"
          cy="408"
          rx="170"
          ry="14"
          fill="rgba(20,159,230,0.14)"
        />

        {/* Right glass loop */}
        <ellipse
          cx="392"
          cy="232"
          rx="128"
          ry="78"
          transform="rotate(28 392 232)"
          fill="none"
          stroke="url(#inf-tube-b)"
          strokeWidth="36"
        />
        <ellipse
          cx="392"
          cy="232"
          rx="128"
          ry="78"
          transform="rotate(28 392 232)"
          fill="none"
          stroke="#ffffff"
          strokeWidth="10"
          opacity="0.55"
        />
        <ellipse
          cx="392"
          cy="232"
          rx="128"
          ry="78"
          transform="rotate(28 392 232)"
          fill="none"
          stroke="#149fe6"
          strokeWidth="2"
        />

        {/* Left glass loop */}
        <ellipse
          cx="248"
          cy="236"
          rx="128"
          ry="78"
          transform="rotate(-28 248 236)"
          fill="none"
          stroke="url(#inf-tube)"
          strokeWidth="36"
        />
        <ellipse
          cx="248"
          cy="236"
          rx="128"
          ry="78"
          transform="rotate(-28 248 236)"
          fill="none"
          stroke="#ffffff"
          strokeWidth="10"
          opacity="0.55"
        />
        <ellipse
          cx="248"
          cy="236"
          rx="128"
          ry="78"
          transform="rotate(-28 248 236)"
          fill="none"
          stroke="#149fe6"
          strokeWidth="2"
        />

        <path
          d="M96 200 C 50 150, 84 88, 168 112"
          fill="none"
          stroke="#149fe6"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <path
          d="M548 168 C 600 128, 592 84, 508 102"
          fill="none"
          stroke="#149fe6"
          strokeWidth="1.5"
          opacity="0.5"
        />

        <Orb cx={176} cy={168} r={10} fill="url(#inf-orb-coral)" />
        <Orb cx={320} cy={228} r={12} fill="url(#inf-orb-coral)" />
        <Orb cx={464} cy={172} r={9} fill="url(#inf-orb-coral)" />
        <Orb cx={232} cy={268} r={6} fill="url(#inf-orb-cyan)" />
        <Orb cx={404} cy={262} r={7} fill="url(#inf-orb-cyan)" />
        <Orb cx={508} cy={236} r={5} fill="url(#inf-orb-cyan)" />
        <Orb cx={132} cy={214} r={4.5} fill="url(#inf-orb-cyan)" />
      </svg>
    </div>
  );
}

function Orb({
  cx,
  cy,
  r,
  fill,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <circle
        cx={cx - r * 0.28}
        cy={cy - r * 0.32}
        r={r * 0.34}
        fill="#ffffff"
        opacity="0.75"
      />
    </g>
  );
}
