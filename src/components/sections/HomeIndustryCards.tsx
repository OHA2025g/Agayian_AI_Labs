import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { MockupCard } from "@/components/ui/MockupCard";
import { getIndustryBySlug } from "@/data/industries";

type IconProps = { className?: string };

const industries: {
  slug: string;
  label: string;
  blurb: string;
  icon: (props: IconProps) => ReactNode;
}[] = [
  {
    slug: "government",
    label: "Government",
    blurb: "Modernize public systems with responsible AI and data trust.",
    icon: IconGovernment,
  },
  {
    slug: "enterprise",
    label: "Public Sector Undertakings",
    blurb: "Drive operational excellence and citizen outcomes.",
    icon: IconPsu,
  },
  {
    slug: "banking",
    label: "Financial Services",
    blurb: "Strengthen risk, compliance and customer experiences with AI.",
    icon: IconFinance,
  },
  {
    slug: "healthcare-social",
    label: "Healthcare",
    blurb: "Improve access, outcomes and operational efficiency.",
    icon: IconHealth,
  },
  {
    slug: "manufacturing",
    label: "Manufacturing",
    blurb: "Optimize operations, predict outcomes and build resiliency.",
    icon: IconManufacture,
  },
  {
    slug: "education",
    label: "Education",
    blurb: "Personalize learning and improve institutional effectiveness.",
    icon: IconEducation,
  },
];

export function HomeIndustryCards() {
  return (
    <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {industries.map((item) => {
        const Icon = item.icon;
        const industry = getIndustryBySlug(item.slug);
        return (
          <RevealItem key={item.label} className="h-full">
            <Link href={`/industries/${item.slug}`} className="block h-full">
              <MockupCard className="flex h-full min-h-[22rem] flex-col px-4 pb-4 pt-4 hover:translate-y-0 xl:min-h-[24rem]">
                <div
                  className="relative mb-5 flex min-h-[10.5rem] flex-[1.15] items-center justify-center overflow-hidden rounded-xl"
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse at 50% 44%, rgba(20,159,230,0.2), transparent 64%)",
                  }}
                >
                  <DottedMapField />
                  <Icon className="relative z-10 h-[92%] w-[92%]" />
                </div>
                <h3 className="font-heading text-[0.95rem] font-semibold leading-snug text-navy">
                  {item.label}
                </h3>
                <p className="mt-2 text-[0.75rem] leading-relaxed text-navy/58">
                  {item.blurb}
                </p>
                <span className="mt-5 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#e4ebf3] text-navy">
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span className="sr-only">
                    Explore {industry?.name ?? item.label}
                  </span>
                </span>
              </MockupCard>
            </Link>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}

function DottedMapField() {
  const dots: { cx: number; cy: number }[] = [];
  const rows = 11;
  const cols = 13;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = 8 + col * 12;
      const cy = 10 + row * 10;
      const nx = (col - 6) / 6;
      const ny = (row - 5) / 5;
      const inGlobe = nx * nx * 0.85 + ny * ny * 1.15 < 1;
      if (inGlobe && (row + col) % 2 === 0) {
        dots.push({ cx, cy });
      }
    }
  }

  return (
    <svg
      viewBox="0 0 160 120"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      {dots.map((dot) => (
        <circle
          key={`${dot.cx}-${dot.cy}`}
          cx={dot.cx}
          cy={dot.cy}
          r="1.15"
          fill="#149fe6"
          opacity="0.28"
        />
      ))}
    </svg>
  );
}

function IconGovernment({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path d="M4 60 H60" stroke="#071a3d" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M8 60 V34 H56 V60" stroke="#071a3d" strokeWidth="2.1" />
      <path d="M16 34 V60" stroke="#149fe6" strokeWidth="2" />
      <path d="M25 34 V60" stroke="#071a3d" strokeWidth="2" />
      <path d="M39 34 V60" stroke="#071a3d" strokeWidth="2" />
      <path d="M48 34 V60" stroke="#149fe6" strokeWidth="2" />
      <path d="M6 34 L32 16 L58 34" stroke="#071a3d" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M24 18 C26.4 10, 32 6, 32 6 C32 6, 37.6 10, 40 18" stroke="#149fe6" strokeWidth="2" />
      <path d="M32 6 V2" stroke="#071a3d" strokeWidth="2" strokeLinecap="round" />
      <circle cx="36.4" cy="2.4" r="2" fill="#ff4d5e" />
    </svg>
  );
}

function IconPsu({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path d="M4 60 H60" stroke="#071a3d" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M8 60 V28 H26 V60" stroke="#071a3d" strokeWidth="2.1" />
      <path d="M26 60 V20 H56 V60" stroke="#071a3d" strokeWidth="2.1" />
      <path d="M13 28 V12 H21 V28" stroke="#149fe6" strokeWidth="2" />
      <path d="M33 20 V8 H40 V20" stroke="#149fe6" strokeWidth="2" />
      <path d="M44 20 V6 H51 V20" stroke="#149fe6" strokeWidth="2" />
      <circle cx="42" cy="40" r="8" stroke="#071a3d" strokeWidth="2" />
      <circle cx="42" cy="40" r="2.4" fill="#ff4d5e" />
      <path
        d="M42 30.6 V28.6 M42 51.4 V49.4 M32.6 40 H30.6 M53.4 40 H51.4"
        stroke="#149fe6"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconFinance({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <circle cx="32" cy="32" r="28" stroke="#149fe6" strokeWidth="2" />
      <circle cx="32" cy="32" r="23.5" stroke="#071a3d" strokeWidth="2" />
      <path d="M16 48 H48" stroke="#071a3d" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M20 48 V30 H25 V48" stroke="#071a3d" strokeWidth="2" />
      <path d="M29.5 48 V30 H34.5 V48" stroke="#149fe6" strokeWidth="2" />
      <path d="M39 48 V30 H44 V48" stroke="#071a3d" strokeWidth="2" />
      <path d="M17 30 L32 16 L47 30" stroke="#071a3d" strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="32" cy="23" r="2" fill="#ff4d5e" />
    </svg>
  );
}

function IconHealth({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <circle cx="32" cy="32" r="28" stroke="#071a3d" strokeWidth="2.1" />
      <circle cx="32" cy="32" r="22" stroke="#149fe6" strokeWidth="2" />
      <path
        d="M32 16 V48 M16 32 H48"
        stroke="#071a3d"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="2.3" fill="#ff4d5e" />
    </svg>
  );
}

function IconManufacture({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path d="M4 58 H60" stroke="#071a3d" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M16 58 L20 48 H44 L48 58"
        stroke="#071a3d"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <rect x="24" y="40" width="16" height="8" rx="1.2" stroke="#149fe6" strokeWidth="2" />
      <path
        d="M32 40 V26 L46 14"
        stroke="#071a3d"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M46 14 L54 20" stroke="#149fe6" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M54 16 V24 M50 20 H58"
        stroke="#071a3d"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <circle cx="32" cy="26" r="2.2" fill="#ff4d5e" />
      <circle cx="46" cy="14" r="2.1" fill="#ff4d5e" />
    </svg>
  );
}

function IconEducation({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path
        d="M6 28 L32 12 L58 28 L32 44 Z"
        stroke="#071a3d"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M14 32 V46 C20 52, 44 52, 50 46 V32"
        stroke="#149fe6"
        strokeWidth="2.1"
      />
      <path d="M58 28 V48" stroke="#071a3d" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M58 48 C60.4 51.2, 64 52, 64 48.2"
        stroke="#ff4d5e"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="32" cy="28" r="2.2" fill="#ff4d5e" />
    </svg>
  );
}
