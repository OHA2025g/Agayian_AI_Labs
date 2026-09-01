import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function splitLabeled(text: string): {
  title: string;
  description: string;
} {
  const colon = text.indexOf(": ");
  if (colon > 0 && colon <= 72) {
    return {
      title: text.slice(0, colon),
      description: text.slice(colon + 2),
    };
  }
  const period = text.indexOf(". ");
  if (period > 8 && period <= 72) {
    return {
      title: text.slice(0, period),
      description: text.slice(period + 2),
    };
  }
  return { title: text, description: "" };
}

export function SectionHeading({
  children,
  rule = true,
  className,
}: {
  children: ReactNode;
  rule?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="industries-heading">{children}</h3>
      {rule ? (
        <div className="industries-heading-rule" aria-hidden>
          <span />
          <span />
        </div>
      ) : null}
    </div>
  );
}

export function IndustryPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("industries-panel", className)}>{children}</div>;
}

export function TechnicalIconCircle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("industries-icon", className)} aria-hidden>
      {children}
    </span>
  );
}
