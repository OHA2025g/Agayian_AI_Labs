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
        "group flex h-full flex-col rounded-2xl border border-[#e4ebf2] bg-white px-5 pb-5 pt-4 shadow-[0_8px_22px_rgba(11,31,58,0.05)] transition hover:border-tech-blue/25 hover:shadow-[0_12px_28px_rgba(11,31,58,0.08)]",
        className,
      )}
    >
      <InsightGlassThumb slug={insight.slug} variant={index} />
      <h3 className="mt-5 line-clamp-2 font-heading text-lg font-semibold leading-snug text-navy group-hover:text-tech-blue">
        {insight.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-light">
        {insight.excerpt}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-tech-blue">
        Read article
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
