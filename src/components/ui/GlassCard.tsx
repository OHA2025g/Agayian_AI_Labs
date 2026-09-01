import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "strong" | "soft" | "glow" | "dark";
  hover?: boolean;
  as?: "div" | "article" | "li" | "section";
};

const variants = {
  default: "glass",
  strong: "glass-strong",
  soft: "glass-soft",
  glow: "glass glass-glow",
  dark: "glass-dark",
} as const;

/**
 * Frosted glass panel with specular highlight — core mockup material.
 * Layout classes (flex, h-full, etc.) apply to the root so children layout correctly.
 */
export function GlassCard({
  children,
  className,
  variant = "default",
  hover = false,
  as: Comp = "div",
}: GlassCardProps) {
  return (
    <Comp
      className={cn(
        "glass-card relative isolate overflow-hidden rounded-2xl",
        variants[variant],
        hover &&
          "transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(59,130,246,0.16)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-1/4 -top-1/2 z-0 h-[80%] w-[70%] rotate-12 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55),transparent_65%)] opacity-70"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] ring-1 ring-inset ring-white/60"
      />
      {children}
    </Comp>
  );
}
