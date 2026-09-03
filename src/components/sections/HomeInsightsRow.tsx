import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { MockupCard } from "@/components/ui/MockupCard";
import { InsightGlassThumb } from "@/components/visualisations/glass/InsightGlassThumb";
import type { Insight } from "@/types";

const insightLabels = ["Insight", "Article", "Perspective", "Blog"] as const;

export function HomeInsightsRow({ insights }: { insights: Insight[] }) {
  return (
    <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {insights.map((insight, index) => (
        <RevealItem key={insight.id}>
          <Link href={`/insights/${insight.slug}`} className="block h-full">
            <MockupCard className="flex h-full flex-col overflow-hidden p-4 hover:translate-y-0">
              <InsightGlassThumb slug={insight.slug} variant={index} />
              <span className="mt-4 inline-flex w-fit rounded-full bg-[#dceef8] px-2.5 py-0.5 text-[0.72rem] font-medium text-navy">
                {insightLabels[index % insightLabels.length]}
              </span>
              <h3 className="mt-3 font-heading text-base font-semibold leading-snug text-navy">
                {insight.title}
              </h3>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-tech-blue">
                Read more
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current">
                  <ArrowRight className="h-3 w-3" />
                </span>
              </span>
            </MockupCard>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
