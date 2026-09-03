"use client";

import {
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { TechnicalIconCircle } from "@/components/industries/primitives";
import { cn } from "@/lib/utils";

function SelectorArrow({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const className =
    "flex h-10 w-10 items-center justify-center text-[#314b6f]";

  if (!ready) {
    return <span className={className} aria-hidden />;
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={className}
      suppressHydrationWarning
    >
      {children}
    </button>
  );
}

export type SelectorItem = {
  slug: string;
  name: string;
  lines: readonly [string, string?];
  icon: LucideIcon;
};

export function IndustrySelector({
  items,
  active,
  hrefFor,
  onPrev,
  onNext,
  scrollerRef,
  onKeyDown,
}: {
  items: SelectorItem[];
  active: string;
  hrefFor: (slug: string) => string;
  onPrev: () => void;
  onNext: () => void;
  scrollerRef: RefObject<HTMLDivElement | null>;
  onKeyDown: (event: KeyboardEvent<HTMLAnchorElement>, index: number) => void;
}) {
  return (
    <div className="industries-selector-wrap industries-main">
      <div className="industries-selector">
        <SelectorArrow label="Previous industries" onClick={onPrev}>
          <ChevronLeft className="h-5 w-5" />
        </SelectorArrow>
        <div
          ref={scrollerRef}
          role="tablist"
          aria-label="Select industry"
          aria-orientation="horizontal"
          className="industries-selector-track"
        >
          {items.map((item, index) => {
            const isActive = item.slug === active;
            const Icon = item.icon;
            return (
              <Link
                key={item.slug}
                href={hrefFor(item.slug)}
                replace
                scroll={false}
                role="tab"
                id={`industry-tab-${item.slug}`}
                aria-controls={`industry-panel-${item.slug}`}
                aria-selected={isActive}
                aria-label={item.name}
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  "industries-selector-item",
                  isActive && "is-active",
                )}
              >
                <TechnicalIconCircle>
                  <Icon strokeWidth={1.5} />
                </TechnicalIconCircle>
                <span>
                  {item.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
                {isActive ? (
                  <span className="industries-selector-pill" aria-hidden />
                ) : null}
              </Link>
            );
          })}
        </div>
        <SelectorArrow label="Next industries" onClick={onNext}>
          <ChevronRight className="h-5 w-5" />
        </SelectorArrow>
      </div>
    </div>
  );
}
