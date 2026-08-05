import Image from "next/image";
import Link from "next/link";
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
        "group flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
        className,
      )}
      aria-label="Agrayian AI Labs home"
    >
      <span className="relative flex h-9 w-9 overflow-hidden rounded-lg border border-white/15 bg-bg-elevated shadow-inner transition group-hover:border-cyan/40">
        <Image
          src="/icon.png"
          alt=""
          width={36}
          height={36}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-[0.95rem] font-semibold tracking-tight text-text-on-dark transition group-hover:text-white">
            Agrayian AI Labs
          </span>
          <span className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-muted-dark">
            Responsible AI
          </span>
        </span>
      )}
    </Link>
  );
}
