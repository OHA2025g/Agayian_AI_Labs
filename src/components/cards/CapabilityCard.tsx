import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Boxes,
  Building2,
  Compass,
  Database,
  Headset,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Capability } from "@/types";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  Compass,
  Building2,
  Shield,
  Sparkles,
  Bot,
  Database,
  Boxes,
  Headset,
};

export function CapabilityCard({
  capability,
  className,
}: {
  capability: Capability;
  className?: string;
}) {
  const Icon = icons[capability.icon] ?? Compass;

  return (
    <Link
      href={`/capabilities#${capability.slug}`}
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-white/10 bg-bg-elevated/50 p-6 transition hover:-translate-y-1 hover:border-cyan/35 hover:shadow-[0_0_0_1px_rgba(25,195,211,0.15)]",
        className,
      )}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan transition group-hover:translate-y-[-2px]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-text-on-dark">
        {capability.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-dark">
        {capability.summary}
      </p>
      <ul className="mt-4 space-y-1.5 text-xs text-muted-dark">
        {capability.deliverables.slice(0, 3).map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs font-medium text-cyan/90">
        Outcome: {capability.outcomes[0]}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-text-on-dark">
        Explore
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
