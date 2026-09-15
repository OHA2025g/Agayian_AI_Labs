import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { MockupCard } from "@/components/ui/MockupCard";
import type { ImpactStory } from "@/types";

export function HomeProof({ stories }: { stories: ImpactStory[] }) {
  if (!stories.length) return null;

  return (
    <Reveal>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <Link key={story.slug} href={`/impact-stories/${story.slug}`} className="block h-full">
            <MockupCard className="flex h-full flex-col p-5 hover:translate-y-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tech-blue">
                {story.deliveryStage ?? "Demonstration"}
              </p>
              <h3 className="mt-3 font-heading text-base font-semibold text-navy">
                {story.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-light">
                {story.challenge}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-tech-blue">
                Read the story
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </MockupCard>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
