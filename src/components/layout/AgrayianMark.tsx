import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Dark site chrome — light mark + brand red accent */
  variant?: "dark" | "light";
  title?: string;
};

/**
 * Agrayian mark for UI: linked loops + red play accent.
 * Dark variant uses light loops so it reads on navy without a white plate.
 */
export function AgrayianMark({
  className,
  variant = "dark",
  title = "Agrayian AI Labs",
}: Props) {
  const loop = variant === "dark" ? "#F1F5F9" : "#111111";
  const playTop = "#FF4D5A";
  const playBot = "#E63946";
  const gradId = `ag-play-${variant}`;

  return (
    <svg
      viewBox="0 0 140 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* Continuous infinity-style body */}
      <path
        d="M72 40
           C72 22 86 12 100 12
           C118 12 130 24 130 40
           C130 56 118 68 100 68
           C86 68 72 58 72 40
           C72 58 58 68 44 68
           C26 68 14 56 14 40
           C14 24 26 12 44 12
           C52 12 59 15 64 20"
        stroke={loop}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Red play in the open top of the left loop */}
      <path d="M58 8 L76 20 L58 32 Z" fill={`url(#${gradId})`} />
      <defs>
        <linearGradient
          id={gradId}
          x1="58"
          y1="8"
          x2="76"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={playTop} />
          <stop offset="1" stopColor={playBot} />
        </linearGradient>
      </defs>
    </svg>
  );
}
