import Link from "next/link";
import type { ImpactStory } from "@/types";
import { Badge } from "@/components/ui/badge";
import { industries } from "@/data/industries";
import { cn } from "@/lib/utils";

function industryLabel(value: string) {
  return industries.find((item) => item.slug === value)?.name ?? value;
}

export function ImpactStoryCard({
  story,
  className,
}: {
  story: ImpactStory;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border border-white/10 bg-bg-elevated/40 p-6 transition hover:border-violet/35",
        className,
      )}
    >
      <div className="flex flex-wrap gap-2">
        <Badge variant="violet">{industryLabel(story.industry)}</Badge>
        <Badge>{story.clientLabel}</Badge>
      </div>
      <h3 className="mt-4 font-heading text-xl font-semibold text-text-on-dark">
        {story.title}
      </h3>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-wider text-muted-dark">
            Challenge
          </dt>
          <dd className="mt-1 text-muted-dark">{story.challenge}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-muted-dark">
            Intervention
          </dt>
          <dd className="mt-1 text-muted-dark">{story.approach}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-muted-dark">
            Outcome category
          </dt>
          <dd className="mt-1 text-cyan">{story.outcomeCategory}</dd>
        </div>
      </dl>
      <Link
        href={`/impact-stories#${story.slug}`}
        className="mt-5 text-sm font-semibold text-text-on-dark hover:text-cyan"
      >
        Read story
      </Link>
    </article>
  );
}
