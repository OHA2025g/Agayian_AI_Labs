import type { ReactNode } from "react";
import type { IndustryCapabilityIcon } from "@/types";

const blue = "#1B7AB3";
const red = "#FF5360";

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width="40"
      height="40"
      fill="none"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function IndustryCapabilityIconMark({
  name,
}: {
  name: IndustryCapabilityIcon;
}) {
  switch (name) {
    case "unification":
      return (
        <Svg>
          <circle cx="14" cy="18" r="8" stroke={blue} strokeWidth="1.5" />
          <circle cx="26" cy="18" r="8" stroke={blue} strokeWidth="1.5" />
          <circle cx="20" cy="26" r="8" stroke={blue} strokeWidth="1.5" />
          <circle cx="14" cy="18" r="1.4" fill={red} />
          <circle cx="26" cy="18" r="1.4" fill={blue} />
          <circle cx="20" cy="26" r="1.4" fill={red} />
        </Svg>
      );
    case "automation":
      return (
        <Svg>
          <path
            d="M20 8 L32 20 L20 32 L8 20 Z"
            stroke={blue}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="20" r="2.2" fill={red} />
          <circle cx="20" cy="8" r="1.4" fill={blue} />
          <circle cx="32" cy="20" r="1.4" fill={blue} />
          <circle cx="20" cy="32" r="1.4" fill={blue} />
          <circle cx="8" cy="20" r="1.4" fill={blue} />
        </Svg>
      );
    case "insight":
      return (
        <Svg>
          <path
            d="M20 10c-2.8-4-8.5-2.2-8.5 2.8 0 6.2 8.5 12.4 8.5 12.4s8.5-6.2 8.5-12.4c0-5-5.7-6.8-8.5-2.8Z"
            stroke={blue}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M13 22c-4.2 1.2-6.4 6.2-2.4 8.8 4.8 3.1 9.4-2 9.4-2"
            stroke={blue}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M27 22c4.2 1.2 6.4 6.2 2.4 8.8-4.8 3.1-9.4-2-9.4-2"
            stroke={blue}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="18" r="1.3" fill={red} />
        </Svg>
      );
    case "document":
      return (
        <Svg>
          <path
            d="M10 8h12l6 6v16a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z"
            stroke={blue}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M22 8v6h6" stroke={blue} strokeWidth="1.5" />
          <path d="M13 20h8M13 24h5" stroke={blue} strokeWidth="1.5" />
          <circle cx="27" cy="27" r="5" stroke={red} strokeWidth="1.5" />
          <path d="M30.6 30.6 34 34" stroke={red} strokeWidth="1.5" />
        </Svg>
      );
    case "geospatial":
      return (
        <Svg>
          <path d="M8 28h24M12 22h16M16 16h8" stroke={blue} strokeWidth="1.2" />
          <path d="M10 12h20v18H10Z" stroke={blue} strokeWidth="1.3" />
          <path
            d="M20 11c-3.2 0-5.2 2.4-5.2 5.2 0 3.8 5.2 9.3 5.2 9.3s5.2-5.5 5.2-9.3c0-2.8-2-5.2-5.2-5.2Z"
            stroke={red}
            strokeWidth="1.5"
          />
          <circle cx="20" cy="16.2" r="1.5" fill={red} />
        </Svg>
      );
    case "language":
      return (
        <Svg>
          <rect
            x="7"
            y="9"
            width="26"
            height="18"
            rx="2"
            stroke={blue}
            strokeWidth="1.5"
          />
          <path d="M15 31h10" stroke={blue} strokeWidth="1.5" />
          <path d="M20 27v4" stroke={blue} strokeWidth="1.5" />
          <path
            d="M12 22c2.4-5 5.2-7.2 8-7.2S25.6 17 28 22"
            stroke={blue}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="24.5" cy="16.5" r="1.4" fill={red} />
        </Svg>
      );
    case "fraud":
      return (
        <Svg>
          <path
            d="M20 6 32 11v9.5c0 7.4-5.2 11.8-12 13.5-6.8-1.7-12-6.1-12-13.5V11L20 6Z"
            stroke={blue}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="19" r="4.2" stroke={red} strokeWidth="1.5" />
          <circle cx="20" cy="19" r="1.4" fill={red} />
        </Svg>
      );
    case "monitoring":
      return (
        <Svg>
          <path d="M8 30h24" stroke={blue} strokeWidth="1.5" />
          <path d="M12 30V22" stroke={blue} strokeWidth="3" strokeLinecap="round" />
          <path d="M18 30V18" stroke={blue} strokeWidth="3" strokeLinecap="round" />
          <path d="M24 30V14" stroke={blue} strokeWidth="3" strokeLinecap="round" />
          <path d="M30 30V11" stroke={blue} strokeWidth="3" strokeLinecap="round" />
          <path
            d="M11 20c4-1.5 7.5-7 13-8.5 3-.8 5.4-1 7.6-.6"
            stroke={red}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="31.5" cy="11" r="1.4" fill={red} />
        </Svg>
      );
    case "interop":
      return (
        <Svg>
          <circle cx="20" cy="20" r="11" stroke={blue} strokeWidth="1.5" />
          <path
            d="M20 7.5v3.2M20 29.3v3.2M7.5 20h3.2M29.3 20h3.2"
            stroke={blue}
            strokeWidth="1.5"
          />
          <path
            d="M20 13.5 24.6 20 20 26.5 15.4 20Z"
            stroke={red}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="20" r="1.3" fill={red} />
        </Svg>
      );
    default: {
      const _exhaustive: never = name;
      throw new Error(`Unhandled capability icon: ${String(_exhaustive)}`);
    }
  }
}
