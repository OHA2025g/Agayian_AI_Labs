import Link from "next/link";
import type { Insight } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function InsightCard({
  insight,
  className,
}: {
  insight: Insight;
  className?: string;
}) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className={cn(
        "flex h-full flex-col rounded-xl border border-white/10 bg-bg-elevated/40 p-6 transition hover:border-cyan/30",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="cyan">{insight.type}</Badge>
        <Badge>{insight.category}</Badge>
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-text-on-dark">
        {insight.title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-muted-dark">{insight.excerpt}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-dark">
        <span>{insight.author}</span>
        <span>{insight.readingTime}</span>
      </div>
    </Link>
  );
}
