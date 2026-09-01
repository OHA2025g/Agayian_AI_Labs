"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type OnThisPageItem = {
  id: string;
  label: string;
  href: string;
};

type OnThisPageNavProps = {
  title?: string;
  items: OnThisPageItem[];
  className?: string;
  footer?: React.ReactNode;
  variant?: "toc" | "layers";
};

export function OnThisPageNav({
  title = "On this page",
  items,
  className,
  footer,
  variant = "toc",
}: OnThisPageNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const ids = items.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={title}
      className={cn(
        "sticky top-24 rounded-2xl border border-[var(--border-light)] bg-white shadow-[0_12px_32px_rgba(7,26,61,0.06)]",
        variant === "layers" ? "px-3.5 py-6" : "p-4",
        className,
      )}
    >
      <p
        className={cn(
          variant === "layers"
            ? "font-heading text-sm font-semibold text-navy"
            : "text-xs font-semibold uppercase tracking-[0.16em] text-muted-light",
        )}
      >
        {title}
      </p>
      <ol className={cn("mt-3", variant === "layers" ? "space-y-2.5" : "space-y-1.5")}>
        {items.map((item, index) => {
          const active = item.id === activeId;
          const indexLabel = String(index + 1).padStart(2, "0");
          return (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "flex items-start gap-2.5 rounded-lg px-1.5 py-1.5 text-sm transition",
                  variant === "layers" && "relative py-2 text-[0.82rem] leading-snug",
                  active && variant === "layers" && "bg-transparent font-medium text-navy",
                  active && variant === "toc" && "bg-sky/15 font-medium text-navy",
                  !active && "text-muted-light hover:text-tech-blue",
                )}
              >
                {variant === "layers" && active ? (
                  <span
                    aria-hidden
                    className="absolute -left-3.5 top-2 bottom-2 w-[3px] rounded-full bg-cyan"
                  />
                ) : null}
                <span
                  className={cn(
                    variant === "layers"
                      ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.62rem] font-semibold"
                      : "font-tech text-[0.65rem]",
                    variant === "layers" && active
                      ? "border-cyan/50 bg-[#e8f5fc] text-navy"
                      : variant === "layers"
                        ? "border-[#dce8f2] text-cyan"
                        : active
                          ? "text-brand"
                          : "text-cyan",
                  )}
                >
                  {indexLabel}
                </span>
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
      {footer ? (
        <div
          className={cn(
            "border-t border-[var(--border-soft)]",
            variant === "layers" ? "mt-auto pt-5" : "mt-4 pt-3",
          )}
        >
          {footer}
        </div>
      ) : null}
    </nav>
  );
}
