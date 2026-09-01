import Image from "next/image";
import { cn } from "@/lib/utils";
import { mockupAssets } from "@/config/mockup-assets";

const ORIGINAL_SIZE = { width: 1536, height: 1024 } as const;

function resolveOriginalPng(slug: string): string | null {
  if (slug.includes("audit") || slug.includes("onetouch")) {
    return mockupAssets.flagshipOriginalAudit;
  }
  if (
    slug.includes("hiring") ||
    slug.includes("vedhire") ||
    slug.includes("talent")
  ) {
    return mockupAssets.flagshipOriginalVedhire;
  }
  if (slug.includes("wcd") || slug.includes("women") || slug.includes("child")) {
    return mockupAssets.flagshipOriginalWcd;
  }
  if (slug.includes("governance") || slug.includes("command")) {
    return mockupAssets.flagshipOriginalGovernance;
  }
  if (slug.includes("decision") || slug.includes("enterprise-decision")) {
    return mockupAssets.productDecisionRing;
  }
  if (slug.includes("document") || slug.includes("copilot")) {
    return mockupAssets.productDocumentStack;
  }
  return null;
}

type Kind =
  | "audit"
  | "hiring"
  | "governance"
  | "wcd-heart"
  | "wcd-rings"
  | "decision"
  | "document";

function resolveKind(slug: string, variant?: "home" | "products"): Kind {
  if (slug.includes("audit") || slug.includes("onetouch")) return "audit";
  if (
    slug.includes("hiring") ||
    slug.includes("vedhire") ||
    slug.includes("talent")
  ) {
    return "hiring";
  }
  if (slug.includes("wcd") || slug.includes("women") || slug.includes("child")) {
    return variant === "products" ? "wcd-rings" : "wcd-heart";
  }
  if (slug.includes("document") || slug.includes("copilot")) return "document";
  if (slug.includes("decision") || slug.includes("enterprise-decision")) {
    return "decision";
  }
  return "governance";
}

/**
 * Isometric glass sculptures matching mockup objects.
 * Home WCD = heart + orb; products WCD = interlocking rings.
 */
export function ProductGlassArt({
  slug,
  className,
  alt = "",
  variant = "home",
  frame = "plain",
}: {
  slug: string;
  className?: string;
  alt?: string;
  variant?: "home" | "products";
  frame?: "plain" | "card";
}) {
  const kind = resolveKind(slug, variant);
  const home = variant === "home";
  const originalPng = resolveOriginalPng(slug);
  const card = frame === "card";

  if (originalPng) {
    return (
      <div
        className={cn(
          "relative w-full",
          card
            ? "aspect-[4/3] overflow-hidden rounded-xl bg-[#f7fafc]"
            : "bg-white",
          className,
        )}
      >
        <Image
          src={originalPng}
          alt={alt}
          width={ORIGINAL_SIZE.width}
          height={ORIGINAL_SIZE.height}
          quality={100}
          unoptimized
          className={
            card
              ? "h-full w-full scale-[1.08] object-contain"
              : "mx-auto h-auto w-full max-w-[1536px] object-contain"
          }
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt || undefined}
      className={cn(
        "relative flex w-full items-center justify-center",
        card
          ? "aspect-[4/3] overflow-hidden rounded-xl bg-white"
          : home
            ? "h-48 bg-white"
            : "h-44 overflow-hidden rounded-xl",
        className,
      )}
      style={
        home
          ? undefined
          : {
              backgroundImage: `
                linear-gradient(rgba(20,159,230,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(20,159,230,0.05) 1px, transparent 1px),
                linear-gradient(180deg, #f7fbfe, #eef6fb)
              `,
              backgroundSize: "14px 14px, 14px 14px, auto",
            }
      }
    >
      <svg
        viewBox="0 0 240 160"
        className="h-full w-full"
        aria-hidden
        shapeRendering="geometricPrecision"
      >
        <SharedDefs />
        {kind === "audit" ? <AuditArt /> : null}
        {kind === "hiring" ? <HiringArt /> : null}
        {kind === "governance" ? <GovernanceArt /> : null}
        {kind === "wcd-heart" ? <WcdHeartArt /> : null}
        {kind === "wcd-rings" ? <WcdRingsArt /> : null}
        {kind === "decision" ? <DecisionArt /> : null}
        {kind === "document" ? <DocumentArt /> : null}
      </svg>
    </div>
  );
}

function SharedDefs() {
  return (
    <defs>
      <linearGradient id="pg-slab-top" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="55%" stopColor="#d7eefb" />
        <stop offset="100%" stopColor="#9fd4f5" />
      </linearGradient>
      <linearGradient id="pg-shield" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7ed0f7" />
        <stop offset="55%" stopColor="#149fe6" />
        <stop offset="100%" stopColor="#0b6fa8" />
      </linearGradient>
      <linearGradient id="pg-cube-top" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#bfe4f8" stopOpacity="0.75" />
      </linearGradient>
      <linearGradient id="pg-cube-left" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e7f5fc" />
        <stop offset="100%" stopColor="#7ec8f0" />
      </linearGradient>
      <linearGradient id="pg-cube-right" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f7fcff" />
        <stop offset="100%" stopColor="#9fd4f5" />
      </linearGradient>
      <radialGradient id="pg-orb" cx="32%" cy="28%" r="70%">
        <stop offset="0%" stopColor="#ff8a94" />
        <stop offset="60%" stopColor="#ff4d5e" />
        <stop offset="100%" stopColor="#c81e3a" />
      </radialGradient>
    </defs>
  );
}

function GlassSlab() {
  return (
    <g strokeLinejoin="miter" strokeLinecap="square">
      <path d="M40 126 L120 108 L200 126 L120 144 Z" fill="url(#pg-slab-top)" />
      <path d="M40 126 L40 138 L120 156 L120 144 Z" fill="#8ec4e6" />
      <path d="M200 126 L200 138 L120 156 L120 144 Z" fill="#5eafd4" />
      <path
        d="M40 126 L120 108 L200 126 L120 144 Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.4"
      />
      <path
        d="M40 126 L40 138 L120 156 L200 138 L200 126"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1"
      />
    </g>
  );
}

function AuditArt() {
  return (
    <g strokeLinejoin="miter">
      <GlassSlab />
      <path
        d="M88 30 l34 12 v34 c0 20-14 36-34 44 c-20-8-34-24-34-44 v-34 z"
        fill="#0d8fd4"
      />
      <path
        d="M88 30 l34 12 v34 c0 20-14 36-34 44 c-20-8-34-24-34-44 v-34 z"
        fill="url(#pg-shield)"
        stroke="#ffffff"
        strokeWidth="2.8"
      />
      <circle cx="88" cy="64" r="13" fill="#071a3d" />
      <path
        d="M81.5 64.5 l5 5 9.5-11"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="124"
        y="36"
        width="54"
        height="68"
        rx="4"
        fill="#ffffff"
        stroke="#c5d7e6"
        strokeWidth="1.5"
      />
      <rect x="124" y="36" width="54" height="14" rx="4" fill="#149fe6" />
      <path
        d="M134 62 h30 M134 72 h26 M134 82 h28 M134 92 h18"
        stroke="#149fe6"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="164" cy="50" r="8" fill="#ff4d5e" />
      <path
        d="M160.2 50.2 l2.4 2.4 5-5.4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function HiringArt() {
  const cx = 120;
  const cy = 22;
  const s = 56;
  const h = 62;
  const iso = s * 0.56;

  return (
    <g strokeLinejoin="miter">
      <path
        d={`M${cx} ${cy} L${cx + s} ${cy + iso} L${cx} ${cy + iso * 2} L${cx - s} ${cy + iso} Z`}
        fill="url(#pg-cube-top)"
        stroke="#ffffff"
        strokeWidth="1.5"
      />
      <path
        d={`M${cx - s} ${cy + iso} L${cx} ${cy + iso * 2} L${cx} ${cy + iso * 2 + h} L${cx - s} ${cy + iso + h} Z`}
        fill="url(#pg-cube-left)"
        stroke="#ffffff"
        strokeWidth="1.4"
      />
      <path
        d={`M${cx + s} ${cy + iso} L${cx} ${cy + iso * 2} L${cx} ${cy + iso * 2 + h} L${cx + s} ${cy + iso + h} Z`}
        fill="url(#pg-cube-right)"
        stroke="#ffffff"
        strokeWidth="1.4"
      />
      <path
        d={`M${cx} ${cy + 16} L${cx + 24} ${cy + 16 + 13} L${cx} ${cy + 16 + 26} L${cx - 24} ${cy + 16 + 13} Z`}
        fill="none"
        stroke="#149fe6"
        strokeWidth="1.7"
      />
      <path
        d={`M${cx} ${cy + 28} L${cx + 14} ${cy + 28 + 8} L${cx} ${cy + 28 + 16} L${cx - 14} ${cy + 28 + 8} Z`}
        fill="none"
        stroke="#149fe6"
        strokeWidth="1.4"
      />
      <text
        x={cx + 16}
        y={cy + iso + 40}
        fill="#071a3d"
        fontSize="12"
        fontWeight="700"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        transform={`rotate(-32 ${cx + 16} ${cy + iso + 40})`}
      >
        vedhire.ai
      </text>
    </g>
  );
}

function GovernanceArt() {
  return (
    <g strokeLinejoin="miter">
      <GlassSlab />
      <path
        d="M52 38 L188 28 L196 98 L60 108 Z"
        fill="#f7fbfe"
        stroke="#149fe6"
        strokeWidth="1.6"
      />
      <path d="M52 38 L188 28 L188 34 L52 44 Z" fill="#d6eefb" />
      <rect x="62" y="78" width="9" height="18" fill="#149fe6" />
      <rect x="74" y="70" width="9" height="26" fill="#5cbcf0" />
      <rect x="86" y="62" width="9" height="34" fill="#ff4d5e" />
      <rect x="98" y="68" width="9" height="28" fill="#149fe6" />
      <path
        d="M150 40
          C158 41, 166 46, 170 54
          C174 62, 178 68, 182 76
          C178 84, 170 88, 162 94
          C154 100, 150 106, 146 114
          C142 106, 134 100, 126 94
          C118 88, 114 80, 116 70
          C118 60, 126 56, 134 50
          C140 45, 146 40, 150 40 Z"
        fill="#149fe6"
        fillOpacity="0.22"
        stroke="#149fe6"
        strokeWidth="1.5"
      />
      <circle cx="164" cy="68" r="3.2" fill="#ff4d5e" />
      <circle cx="138" cy="80" r="2.6" fill="#149fe6" />
      <circle cx="152" cy="90" r="2.2" fill="#071a3d" />
    </g>
  );
}

function WcdHeartArt() {
  return (
    <g strokeLinejoin="round">
      <GlassSlab />
      <circle cx="152" cy="56" r="18" fill="url(#pg-orb)" />
      <circle cx="145" cy="49" r="5.5" fill="#ffffff" opacity="0.5" />
      <path
        d="M118 50
          C118 36, 100 32, 90 46
          C80 60, 90 76, 118 102
          C146 76, 156 60, 146 46
          C136 32, 118 36, 118 50 Z"
        fill="url(#pg-slab-top)"
        stroke="#149fe6"
        strokeWidth="2.4"
      />
      <path
        d="M118 58 C108 48, 98 50, 98 60 C98 72, 118 86, 118 86"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.8"
      />
    </g>
  );
}

function WcdRingsArt() {
  return (
    <g>
      <GlassSlab />
      <circle
        cx="102"
        cy="70"
        r="30"
        fill="none"
        stroke="#ff4d5e"
        strokeWidth="10"
      />
      <circle
        cx="138"
        cy="70"
        r="30"
        fill="none"
        stroke="#149fe6"
        strokeWidth="10"
      />
      <circle
        cx="102"
        cy="70"
        r="30"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        opacity="0.45"
      />
      <circle
        cx="138"
        cy="70"
        r="30"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        opacity="0.45"
      />
    </g>
  );
}

function DecisionArt() {
  return (
    <g>
      <GlassSlab />
      <ellipse
        cx="120"
        cy="78"
        rx="48"
        ry="18"
        fill="none"
        stroke="#149fe6"
        strokeWidth="10"
        transform="rotate(-18 120 78)"
      />
      <ellipse
        cx="120"
        cy="78"
        rx="48"
        ry="18"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        opacity="0.5"
        transform="rotate(-18 120 78)"
      />
      <rect x="168" y="48" width="8" height="28" rx="1" fill="#149fe6" opacity="0.7" />
      <rect x="180" y="56" width="8" height="20" rx="1" fill="#ff4d5e" opacity="0.8" />
      <rect x="192" y="42" width="8" height="34" rx="1" fill="#149fe6" opacity="0.55" />
    </g>
  );
}

function DocumentArt() {
  return (
    <g>
      <GlassSlab />
      <rect
        x="78"
        y="36"
        width="52"
        height="68"
        rx="5"
        fill="rgba(255,255,255,0.55)"
        stroke="#149fe6"
        strokeOpacity="0.25"
        transform="rotate(-10 104 70)"
      />
      <rect
        x="88"
        y="40"
        width="52"
        height="68"
        rx="5"
        fill="rgba(255,255,255,0.75)"
        stroke="#149fe6"
        strokeOpacity="0.35"
        transform="rotate(-4 114 74)"
      />
      <rect
        x="98"
        y="42"
        width="52"
        height="68"
        rx="5"
        fill="#ffffff"
        stroke="#d5e4f0"
      />
      <path
        d="M108 58 h32 M108 68 h28 M108 78 h30 M108 88 h18"
        stroke="#149fe6"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </g>
  );
}
