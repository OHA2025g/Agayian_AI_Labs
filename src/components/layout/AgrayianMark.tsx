import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Dark site chrome — light mark + brand red accent */
  variant?: "dark" | "light";
  title?: string;
};

/**
 * Official Agrayian mark: two linked loops with a flat gap in the left
 * loop and a red play seated in that opening. Light UI uses the source
 * PNG so the geometry matches logo.png exactly.
 */
export function AgrayianMark({
  className,
  variant = "light",
  title = "Agrayian AI Labs",
}: Props) {
  if (variant === "light") {
    return (
      <Image
        src="/logo.png"
        alt=""
        width={1024}
        height={576}
        className={cn("h-full w-full object-contain object-left", className)}
        quality={100}
      />
    );
  }

  return <AgrayianMarkSvg className={className} title={title} loop="#F1F5F9" />;
}

function AgrayianMarkSvg({
  className,
  title,
  loop,
}: {
  className?: string;
  title: string;
  loop: string;
}) {
  const playId = "ag-play-dark";

  return (
    <svg
      viewBox="170 90 690 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* Right loop — complete */}
      <circle
        cx="654"
        cy="297"
        r="144"
        stroke={loop}
        strokeWidth="70"
      />
      {/* Left loop — flat-cut gap at 12–2 o'clock for the play */}
      <path
        d="M494.7 225 A144 144 0 1 1 370 153"
        stroke={loop}
        strokeWidth="70"
        strokeLinecap="butt"
      />
      <path d="M412 118 L506 153 L412 188 Z" fill={`url(#${playId})`} />
      <defs>
        <linearGradient
          id={playId}
          x1="412"
          y1="118"
          x2="506"
          y2="188"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF4D5A" />
          <stop offset="1" stopColor="#E63946" />
        </linearGradient>
      </defs>
    </svg>
  );
}
