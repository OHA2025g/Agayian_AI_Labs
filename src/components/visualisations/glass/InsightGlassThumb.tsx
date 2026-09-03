import { InsightsGlowSculpture } from "@/components/visualisations/insights/InsightsGlowSculpture";
import { insightSculptureForSlug } from "@/config/insight-sculptures";
import { cn } from "@/lib/utils";

export function InsightGlassThumb({
  slug,
  variant = 0,
  className,
  priority = false,
}: {
  slug?: string;
  variant?: number;
  className?: string;
  priority?: boolean;
}) {
  const asset = insightSculptureForSlug(slug, variant);

  return (
    <div className={cn("relative aspect-[5/4] w-full", className)}>
      <InsightsGlowSculpture
        asset={asset}
        priority={priority}
        sizes="(max-width: 640px) 92vw, (max-width: 1280px) 44vw, 22vw"
        className="h-full w-full"
      />
    </div>
  );
}
