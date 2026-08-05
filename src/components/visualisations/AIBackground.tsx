"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AIBackgroundProps = {
  className?: string;
  variant?: "hero" | "subtle" | "cta";
};

export function AIBackground({
  className,
  variant = "hero",
}: AIBackgroundProps) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute inset-0 grid-texture opacity-60" />
      <div
        className={cn(
          "absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet/25 blur-3xl",
          !reduce && variant === "hero" && "animate-pulse",
        )}
      />
      <div className="absolute -right-16 top-32 h-80 w-80 rounded-full bg-cyan/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-brand/15 blur-3xl" />
      {variant === "cta" && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(25,195,211,0.15), transparent 40%), radial-gradient(circle at 80% 60%, rgba(230,57,70,0.12), transparent 35%)",
          }}
        />
      )}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg-primary to-transparent" />
    </div>
  );
}
