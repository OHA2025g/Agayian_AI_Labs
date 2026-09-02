import type { CSSProperties, ReactNode, SVGProps } from "react";
import Link from "next/link";
import { WhiteSculpture } from "@/components/visualisations/glass/WhiteSculpture";
import { mockupAssets } from "@/config/mockup-assets";
import type { IconName, Layer } from "./coe-content";
import styles from "./ai-coe.module.css";

const foundationSculptures = {
  governance: mockupAssets.coeSculptGovernance,
  factory: mockupAssets.coeSculptFactory,
  platform: mockupAssets.coeSculptPlatform,
  talent: mockupAssets.coeSculptTalent,
  value: mockupAssets.coeSculptValue,
} as const;

type SvgProps = SVGProps<SVGSVGElement>;

function iconProps(size: number): SvgProps {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
}

export function CoeIcon({
  name,
  size = 24,
}: {
  name: IconName;
  size?: number;
}) {
  const p = iconProps(size);

  switch (name) {
    case "chart":
    case "value":
      return (
        <svg {...p}>
          <path d="M4 20V10M10 20V5M16 20v-8M22 20H2" />
          <path d="m4 8 5-4 6 5 6-6" />
        </svg>
      );
    case "governance":
    case "control":
    case "risk":
    case "decide":
      return (
        <svg {...p}>
          <path d="M12 2 20 6v6c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-4Z" />
          <path d="m8.5 12 2.2 2.2 4.8-5" />
        </svg>
      );
    case "portfolio":
      return (
        <svg {...p}>
          <rect x="3" y="6" width="18" height="14" rx="2" />
          <path d="M8 6V4h8v2M8 11h8M8 15h5" />
        </svg>
      );
    case "data":
      return (
        <svg {...p}>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
        </svg>
      );
    case "platform":
    case "blocks":
    case "reuse":
      return (
        <svg {...p}>
          <path d="m12 2 5 3-5 3-5-3 5-3ZM7 9l5 3 5-3M7 14l5 3 5-3M7 5v13l5 3 5-3V5" />
        </svg>
      );
    case "factory":
      return (
        <svg {...p}>
          <path d="M3 21V9l6 3V8l6 4V4h4v17H3Z" />
          <path d="M7 17h2M12 17h2M17 17h2" />
        </svg>
      );
    case "talent":
    case "people":
      return (
        <svg {...p}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.2" />
          <path d="M3 20c.4-4 2.5-6 6-6s5.6 2 6 6M15 14c3.4.1 5.3 2 5.8 5" />
        </svg>
      );
    case "monitor":
      return (
        <svg {...p}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4M6 11h3l2-4 3 7 2-3h2" />
        </svg>
      );
    case "mandate":
    case "direct":
      return (
        <svg {...p}>
          <path d="M5 21V3M6 4h11l-2 4 2 4H6" />
        </svg>
      );
    case "standards":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8" />
          <path d="m9 12 2 2 4-5M12 2v2M12 20v2M2 12h2M20 12h2" />
        </svg>
      );
    case "model":
      return (
        <svg {...p}>
          <circle cx="8" cy="8" r="3" />
          <circle cx="16" cy="8" r="3" />
          <circle cx="12" cy="16" r="3" />
          <path d="m10 10 1 3M14 10l-1 3M11 8h2" />
        </svg>
      );
    case "deliver":
    case "scale":
      return (
        <svg {...p}>
          <path d="M14 3c4 1 6 3 7 7l-6 6-7-7 6-6Z" />
          <circle cx="15" cy="9" r="2" />
          <path d="m8 14-4 1-2 4 7-2M10 16l-1 6 4-2 1-4" />
        </svg>
      );
    case "capture":
      return (
        <svg {...p}>
          <circle cx="10" cy="10" r="6" />
          <path d="m14 14 6 6M7 10h6M10 7v6" />
        </svg>
      );
    case "score":
      return (
        <svg {...p}>
          <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "triage":
      return (
        <svg {...p}>
          <circle cx="8" cy="7" r="3" />
          <circle cx="17" cy="8" r="2" />
          <path d="M2 20c.5-5 2.5-7 6-7s5.5 2 6 7M14 14c3.8 0 6 2 7 6" />
        </svg>
      );
    case "idea":
      return (
        <svg {...p}>
          <path d="M9 18h6M10 22h4M8 14c-2-1.4-3-3.3-3-5.5a7 7 0 0 1 14 0c0 2.2-1 4.1-3 5.5-1 .8-1 1.5-1 2H9c0-.5 0-1.2-1-2Z" />
        </svg>
      );
    case "assess":
      return (
        <svg {...p}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4M8 11l2 2 4-5" />
        </svg>
      );
    case "design":
      return (
        <svg {...p}>
          <path d="m14 4 6 6L9 21H3v-6L14 4Z" />
          <path d="m12 6 6 6M3 15l6 6" />
        </svg>
      );
    default: {
      const _exhaustive: never = name;
      return _exhaustive;
    }
  }
}

export function ArrowLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${styles.button} ${secondary ? styles.buttonSecondary : ""}`}
    >
      <span>{children}</span>
      <span className={styles.arrow} aria-hidden>
        →
      </span>
    </Link>
  );
}

export function OutcomeCheck() {
  return (
    <i aria-hidden>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="m6 12 4 4 8-8"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </i>
  );
}

export function CoeTower({
  compact = false,
  priority = false,
}: {
  compact?: boolean;
  priority?: boolean;
}) {
  return (
    <WhiteSculpture
      src={mockupAssets.coeStackNine}
      alt="Nine-layer CoE glass stack"
      width={1024}
      height={1536}
      priority={priority}
      multiply={false}
      className={`${styles.tower} ${compact ? styles.towerCompact : ""} bg-transparent`}
    />
  );
}

export function CoeCubeCluster() {
  return (
    <WhiteSculpture
      src={mockupAssets.coeModelCubes}
      alt=""
      width={768}
      height={768}
      multiply={false}
      className={`${styles.cubeCluster} bg-transparent`}
    />
  );
}

export function FoundationSculpture({
  name,
}: {
  name: keyof typeof foundationSculptures;
}) {
  return (
    <WhiteSculpture
      src={foundationSculptures[name]}
      alt=""
      width={768}
      height={768}
      multiply={false}
      className={`${styles.foundationVisual} bg-transparent`}
    />
  );
}

/** Plate attach points as a share of the stack image (node Y, plate-right X). */
const PLATE_ANCHORS = [
  { top: "16.67%", plateX: 0.601 },
  { top: "24.87%", plateX: 0.599 },
  { top: "32.88%", plateX: 0.599 },
  { top: "40.82%", plateX: 0.601 },
  { top: "48.63%", plateX: 0.61 },
  { top: "56.32%", plateX: 0.63 },
  { top: "64%", plateX: 0.673 },
  { top: "71.48%", plateX: 0.691 },
  { top: "79.1%", plateX: 0.702 },
] as const;

export function HeroStack({
  items,
  priority = false,
}: {
  items: readonly Layer[];
  priority?: boolean;
}) {
  return (
    <div className={styles.heroStack}>
      <CoeTower priority={priority} />
      <ol className={styles.layerLabels}>
        {items.map((layer, index) => {
          const anchor =
            PLATE_ANCHORS[index] ?? PLATE_ANCHORS[PLATE_ANCHORS.length - 1];
          return (
            <li
              key={layer.number}
              style={
                {
                  top: anchor.top,
                  "--plate-x": String(anchor.plateX),
                } as CSSProperties
              }
            >
              <span className={styles.layerLead} aria-hidden />
              <b>{layer.number}</b>
              <span>{layer.title}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function LayerItem({ layer }: { layer: Layer }) {
  return (
    <div className={styles.layerItem}>
      <b>{layer.number}</b>
      <span>
        <strong>{layer.title}</strong>
        <small>{layer.description}</small>
      </span>
    </div>
  );
}
