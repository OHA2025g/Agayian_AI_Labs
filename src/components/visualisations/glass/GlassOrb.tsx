import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type GlassOrbProps = {
  icon?: LucideIcon;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  iconClassName?: string;
  children?: React.ReactNode;
};

const sizes = {
  sm: "h-10 w-10",
  md: "h-14 w-14",
  lg: "h-[4.25rem] w-[4.25rem]",
  xl: "h-24 w-24",
} as const;

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-[1.35rem] w-[1.35rem]",
  xl: "h-8 w-8",
} as const;

/**
 * Frosted 3D glass orb — specular highlight + cyan refraction.
 */
export function GlassOrb({
  icon: Icon,
  size = "md",
  className,
  iconClassName,
  children,
}: GlassOrbProps) {
  return (
    <span
      className={cn(
        "glass-orb-el relative inline-flex shrink-0 items-center justify-center rounded-full",
        sizes[size],
        className,
      )}
    >
      {/* Outer glow ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.22), transparent 68%)",
        }}
      />
      {/* Glass body */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.97) 0%, rgba(236,244,252,0.78) 38%, rgba(147,197,253,0.38) 78%, rgba(255,255,255,0.65) 100%)",
          border: "1.5px solid rgba(255,255,255,0.95)",
          boxShadow: `
            0 12px 28px rgba(59,130,246,0.18),
            0 4px 10px rgba(11,31,58,0.08),
            inset 0 2px 4px rgba(255,255,255,1),
            inset 0 -8px 16px rgba(59,130,246,0.16),
            inset 1px 0 0 rgba(255,255,255,0.7)
          `,
        }}
      />
      {/* Specular catch light */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-[18%] top-[14%] h-[28%] w-[42%] rounded-full bg-white/90"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.9),transparent_55%)]"
      />
      {Icon ? (
        <Icon
          className={cn(
            "relative z-10 text-navy",
            iconSizes[size],
            iconClassName,
          )}
          strokeWidth={1.55}
        />
      ) : null}
      {children ? <span className="relative z-10">{children}</span> : null}
    </span>
  );
}
