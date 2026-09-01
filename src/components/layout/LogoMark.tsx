import Link from "next/link";
import { AgrayianMark } from "@/components/layout/AgrayianMark";
import { brandCopy } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  compact?: boolean;
  /** light = dark mark on light UI; dark = light mark on navy footer */
  tone?: "light" | "dark";
};

export function LogoMark({
  className,
  compact = false,
  tone = "light",
}: LogoMarkProps) {
  const onDark = tone === "dark";

  return (
    <Link
      href="/"
      className={cn(
        "group flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tech-blue focus-visible:ring-offset-2",
        onDark
          ? "focus-visible:ring-offset-navy-deep"
          : "focus-visible:ring-offset-white",
        className,
      )}
      aria-label="Agrayian AI Labs home"
    >
      <span className="relative flex h-9 w-[4rem] shrink-0 items-center md:h-10 md:w-[4.5rem]">
        <AgrayianMark
          variant={onDark ? "dark" : "light"}
          className={
            onDark
              ? "drop-shadow-[0_0_12px_rgba(25,195,211,0.18)]"
              : undefined
          }
        />
      </span>
      {!compact && (
        <span className="flex min-w-0 flex-col leading-none">
          <span
            className={cn(
              "truncate font-heading text-[0.95rem] font-semibold tracking-tight transition",
              onDark
                ? "text-text-on-dark group-hover:text-white"
                : "text-navy group-hover:text-navy",
            )}
          >
            Agrayian AI Labs
          </span>
          <span
            className={cn(
              "mt-1.5 truncate text-[0.65rem] tracking-[0.02em]",
              onDark ? "text-cyan/90" : "text-cyan",
            )}
          >
            {brandCopy.tagline}
          </span>
        </span>
      )}
    </Link>
  );
}
