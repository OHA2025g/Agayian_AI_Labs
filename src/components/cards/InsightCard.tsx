import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InsightGlassThumb } from "@/components/visualisations/glass/InsightGlassThumb";
import type { Insight } from "@/types";
import { cn } from "@/lib/utils";

export function InsightCard({
  insight,
  className,
  index = 0,
}: {
  insight: Insight;
  className?: string;
  index?: number;
}) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-[var(--border-soft)] bg-white/80 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-tech-blue/30 hover:shadow-[0_18px_40px_rgba(7,26,61,0.08)]",
        className,
      )}
    >
      <InsightGlassThumb variant={index} />
      <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-tech-blue">
        {insight.category}
      </p>
      <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-navy group-hover:text-tech-blue">
        {insight.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-light">
        {insight.excerpt}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-tech-blue">
        Read article
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
