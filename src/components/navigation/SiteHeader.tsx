"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { brandCopy } from "@/config/site";
import { LogoMark } from "@/components/layout/LogoMark";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

type Props = {
  items?: NavItem[];
};

export function SiteHeader({ items = mainNavigation }: Props) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const drawerId = "mobile-navigation";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[height,background-color,backdrop-filter,border-color] duration-300",
        scrolled || open
          ? "border-b border-white/10 bg-bg-primary/80 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[90rem] items-center justify-between gap-3 px-4 transition-[height] duration-300 sm:px-6 lg:px-8",
          scrolled ? "h-14 lg:h-14" : "h-16 lg:h-[4.5rem]",
        )}
      >
        <LogoMark className={cn(scrolled && "scale-[0.96]")} />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-0.5 lg:flex"
        >
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-2 py-2 text-[0.72rem] font-medium transition-colors xl:px-2.5 xl:text-[0.78rem]",
                  active ? "text-white" : "text-muted-dark hover:text-white",
                )}
              >
                <span className="xl:hidden">{item.shortLabel ?? item.label}</span>
                <span className="hidden xl:inline">{item.label}</span>
                {active ? (
                  <motion.span
                    layoutId={reduce ? undefined : "nav-active"}
                    className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-brand via-cyan to-transparent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <PrimaryButton
            href="/contact?interest=consultation"
            className="hidden h-10 px-4 text-xs md:inline-flex"
            showArrow={false}
          >
            {brandCopy.primaryCta}
          </PrimaryButton>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-text-on-dark lg:hidden"
            aria-expanded={open}
            aria-controls={drawerId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">
              {open ? "Close menu" : "Open menu"}
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={drawerId}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            className="border-t border-white/10 bg-bg-primary/95 backdrop-blur-xl lg:hidden"
          >
            <nav
              aria-label="Mobile primary"
              className="mx-auto flex max-w-[90rem] flex-col gap-1 px-4 py-4 sm:px-6"
            >
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-white/5 text-white"
                      : "text-muted-dark hover:bg-white/5 hover:text-white",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <PrimaryButton
                href="/contact?interest=consultation"
                className="mt-3"
                onClick={() => setOpen(false)}
              >
                {brandCopy.primaryCta}
              </PrimaryButton>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
