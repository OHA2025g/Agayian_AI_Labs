import Link from "next/link";
import { AgrayianMark } from "@/components/layout/AgrayianMark";
import { brandCopy } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  compact?: boolean;
};

export function LogoMark({ className, compact = false }: LogoMarkProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
        className,
      )}
      aria-label="Agrayian AI Labs home"
    >
      <span className="relative flex h-9 w-[3.35rem] shrink-0 items-center justify-center transition group-hover:opacity-95 md:h-10 md:w-16">
        <AgrayianMark variant="dark" className="drop-shadow-[0_0_12px_rgba(25,195,211,0.18)]" />
      </span>
      {!compact && (
        <span className="flex min-w-0 flex-col leading-none">
          <span className="truncate font-heading text-[0.95rem] font-semibold tracking-tight text-text-on-dark transition group-hover:text-white">
            Agrayian AI Labs
          </span>
          <span className="mt-1.5 truncate text-[0.65rem] tracking-[0.02em] text-cyan/90">
            {brandCopy.tagline}
          </span>
        </span>
      )}
    </Link>
  );
}
