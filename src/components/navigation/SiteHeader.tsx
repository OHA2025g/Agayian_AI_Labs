"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { defaultHeaderCta, headerContactItem, mainNavigation } from "@/data/navigation";
import { brandCopy } from "@/config/site";
import { LogoMark } from "@/components/layout/LogoMark";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

type Props = {
  items?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

export function SiteHeader({
  items = mainNavigation,
  ctaLabel = brandCopy.primaryCta,
  ctaHref = defaultHeaderCta.href,
}: Props) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const drawerId = "mobile-navigation";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const navReady = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

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

  const desktopItems = items.filter((item) => item.href !== "/contact");
  const mobileItems = items.some((item) => item.href === "/contact")
    ? items
    : [...items, headerContactItem];

  return (
    <header
      data-nav-ready={navReady ? "true" : "false"}
      className={cn(
        "sticky top-0 z-50 w-full transition-[height,background-color,backdrop-filter,border-color,box-shadow] duration-300",
        scrolled || open
          ? "border-b border-[var(--border-soft)] bg-white shadow-[0_8px_40px_rgba(11,31,58,0.06)]"
          : "border-b border-transparent bg-white",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-[height] duration-300 sm:px-6 lg:px-8",
          scrolled || open ? "h-16" : "h-[4.75rem] lg:h-[5.5rem]",
        )}
      >
        <LogoMark className={cn(scrolled && "scale-[0.96]")} />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-0.5 lg:flex"
        >
          {desktopItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-1.5 py-2 text-[0.68rem] font-medium transition-colors xl:px-2 xl:text-[0.74rem]",
                  active
                    ? "text-navy"
                    : "text-muted-light hover:text-navy",
                )}
              >
                <span className="relative inline-block">
                  <span className="xl:hidden">{item.shortLabel ?? item.label}</span>
                  <span className="hidden xl:inline">{item.label}</span>
                  {active ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-brand"
                    />
                  ) : null}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <PrimaryButton
            href={ctaHref}
            className="hidden h-10 rounded-full px-5 text-xs md:inline-flex"
            showArrow={false}
          >
            {ctaLabel}
          </PrimaryButton>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-soft)] bg-white text-navy lg:hidden"
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
            className="border-t border-[var(--border-soft)] bg-white lg:hidden"
          >
            <nav
              aria-label="Mobile primary"
              className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
            >
              {mobileItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-3 py-3 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-bg-secondary text-navy"
                      : "text-muted-light hover:bg-bg-secondary hover:text-navy",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <PrimaryButton
                href={ctaHref}
                className="mt-3 w-full rounded-full"
              >
                {ctaLabel}
              </PrimaryButton>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
