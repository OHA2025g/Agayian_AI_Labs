"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type PrimaryButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function PrimaryButton({
  href,
  children,
  className,
  showArrow = true,
  type = "button",
  onClick,
  disabled,
}: PrimaryButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();

  const classes = cn(
    "group relative inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand px-6 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition will-change-transform hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50",
    className,
  );

  const onMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reduce || !ref.current || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {content}
    </button>
  );
}
