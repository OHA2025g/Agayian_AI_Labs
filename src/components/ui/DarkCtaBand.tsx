import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

type DarkCtaBandProps = {
  title: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
  children?: React.ReactNode;
};

export function DarkCtaBand({
  title,
  description,
  primaryHref = "/contact?interest=consultation",
  primaryLabel = "Book a Consultation",
  secondaryHref,
  secondaryLabel,
  className,
  children,
}: DarkCtaBandProps) {
  return (
    <section
      className={cn(
        "on-dark-surface relative overflow-hidden bg-navy-deep py-14 md:py-16",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(20,159,230,0.18),transparent_55%)]"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-heading text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold tracking-tight text-white text-balance">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
              {description}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {children}
          <PrimaryButton href={primaryHref}>{primaryLabel}</PrimaryButton>
          {secondaryHref && secondaryLabel ? (
            <SecondaryButton
              href={secondaryHref}
              className="border-white/25 bg-white/10 text-white hover:bg-white/15"
            >
              {secondaryLabel}
            </SecondaryButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}

type LightCtaBarProps = {
  title: string;
  description?: string;
  href?: string;
  label?: string;
  className?: string;
};

type LightCtaPanelProps = LightCtaBarProps;

/** Contained rounded CTA matching the capabilities mockup. */
export function LightCtaPanel({
  title,
  href = "/contact?interest=consultation",
  label = "Book a Consultation",
  className,
}: LightCtaPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] bg-[#f3f6f9] px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12",
        className,
      )}
    >
      <CtaWaveField />
      <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <h2 className="max-w-xl font-heading text-[clamp(1.35rem,2.6vw,2rem)] font-semibold leading-tight tracking-tight text-navy text-balance">
          {title}
        </h2>
        <PrimaryButton href={href} showArrow={false} className="shrink-0">
          {label}
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/85">
            <ArrowRight className="h-3 w-3" />
          </span>
        </PrimaryButton>
      </div>
    </div>
  );
}

function CtaWaveField() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 180"
      preserveAspectRatio="none"
    >
      <path
        d="M40 92 C180 48, 280 128, 430 88 S700 40, 860 96 S1080 150, 1180 78"
        fill="none"
        stroke="#c5d3df"
        strokeWidth="1.4"
      />
      <path
        d="M20 118 C200 70, 340 150, 520 108 S820 62, 1000 120 S1140 70, 1190 104"
        fill="none"
        stroke="#d3dde6"
        strokeWidth="1.2"
      />
      <path
        d="M60 70 C220 110, 380 36, 560 78 S860 140, 1040 72"
        fill="none"
        stroke="#d7e0e8"
        strokeWidth="1.1"
      />
      <circle cx="210" cy="64" r="3.2" fill="#149fe6" />
      <circle cx="548" cy="96" r="3" fill="#ff4d5e" />
      <circle cx="892" cy="88" r="3.2" fill="#149fe6" />
      <circle cx="1048" cy="78" r="2.6" fill="#ff4d5e" />
    </svg>
  );
}

export function LightCtaBar({
  title,
  description,
  href = "/contact?interest=consultation",
  label = "Book a Consultation",
  className,
}: LightCtaBarProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-t border-[var(--border-soft)] bg-white py-14 md:py-16",
        className,
      )}
    >
      {/* Mockup wavy glass ribbons */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full opacity-70"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120 C240 40, 480 180, 720 100 S1200 40, 1440 110"
            fill="none"
            stroke="rgba(20,159,230,0.35)"
            strokeWidth="18"
          />
          <path
            d="M0 140 C280 60, 520 170, 760 90 S1180 50, 1440 130"
            fill="none"
            stroke="rgba(20,159,230,0.18)"
            strokeWidth="12"
          />
          <path
            d="M0 90 C200 150, 500 30, 780 120 S1100 160, 1440 80"
            fill="none"
            stroke="rgba(255,77,94,0.14)"
            strokeWidth="8"
          />
        </svg>
        <span className="absolute left-[18%] top-8 h-3 w-3 rounded-full bg-brand/70 shadow-[0_0_12px_rgba(255,77,94,0.45)]" />
        <span className="absolute right-[22%] top-12 h-2.5 w-2.5 rounded-full bg-tech-blue/70 shadow-[0_0_12px_rgba(20,159,230,0.45)]" />
        <span className="absolute right-[40%] bottom-10 h-2 w-2 rounded-full bg-cyan/80" />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-heading text-[clamp(1.45rem,2.8vw,2.15rem)] font-semibold tracking-tight text-navy text-balance">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 text-sm leading-relaxed text-muted-light md:text-base">
              {description}
            </p>
          ) : null}
        </div>
        <PrimaryButton href={href}>{label}</PrimaryButton>
      </div>
    </section>
  );
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-semibold text-tech-blue transition hover:text-navy",
        className,
      )}
    >
      {children}
    </Link>
  );
}
