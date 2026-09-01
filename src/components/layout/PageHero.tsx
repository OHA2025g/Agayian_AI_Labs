import Image from "next/image";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Eyebrow } from "@/components/ui/Eyebrow";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  visual?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  imageClassName?: string;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt = "",
  children,
  visual,
  className,
  contentClassName,
  imageClassName,
}: PageHeroProps) {
  const hasVisual = Boolean(visual || imageSrc);

  return (
    <section
      className={cn(
        "scene-hero relative overflow-hidden border-b border-[var(--border-soft)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-texture opacity-40"
      />
      <div
        className={cn(
          "relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:gap-12 lg:px-8 lg:py-20",
          hasVisual && "lg:grid-cols-[1.02fr_0.98fr]",
        )}
      >
        <div className={cn("max-w-xl", contentClassName)}>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="mt-3 font-heading text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold leading-[1.05] tracking-tight text-navy text-balance">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 text-lg font-semibold text-navy md:text-xl">
              {subtitle}
            </p>
          ) : null}
          {description ? (
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-light md:text-lg">
              {description}
            </p>
          ) : null}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta ? (
                <PrimaryButton href={primaryCta.href}>
                  {primaryCta.label}
                </PrimaryButton>
              ) : null}
              {secondaryCta ? (
                <SecondaryButton href={secondaryCta.href}>
                  {secondaryCta.label}
                </SecondaryButton>
              ) : null}
            </div>
          )}
          {children}
        </div>
        {visual ? (
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(20,159,230,0.1),transparent_70%)]"
            />
            <div className="relative z-10">{visual}</div>
          </div>
        ) : imageSrc ? (
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[14%] rounded-full bg-[radial-gradient(circle,rgba(20,159,230,0.08),transparent_70%)]"
            />
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1100}
              height={900}
              priority
              className={cn(
                "relative z-10 h-auto w-full drop-shadow-[0_24px_50px_rgba(20,159,230,0.14)]",
                imageClassName,
              )}
              sizes="(max-width: 1024px) 90vw, 48vw"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
