import Link from "next/link";
import type { ImpactStory } from "@/types";
import { Badge } from "@/components/ui/badge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { capabilities } from "@/data/capabilities";
import { industries } from "@/data/industries";
import { products } from "@/data/products";

function industryLabel(slug: string) {
  return industries.find((item) => item.slug === slug)?.name ?? slug;
}

function capabilityLabel(slug: string) {
  return (
    capabilities.find((item) => item.slug === slug)?.shortName ??
    capabilities.find((item) => item.slug === slug)?.name ??
    slug
  );
}

function productLabel(slug: string) {
  return products.find((item) => item.slug === slug)?.name ?? slug;
}

export function ImpactStoryDetailView({ story }: { story: ImpactStory }) {
  return (
    <div className="space-y-6 text-sm text-muted-dark">
      <div className="flex flex-wrap gap-2">
        <Badge variant="violet">{industryLabel(story.industry)}</Badge>
        <Badge>{story.clientLabel}</Badge>
        <Badge variant="cyan">{story.solutionType}</Badge>
      </div>

      <div>
        <h1 className="font-heading text-[clamp(1.8rem,3.5vw,3rem)] font-semibold text-balance text-text-on-dark">
          {story.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed">
          Anonymised sector pattern. Client identity is not disclosed. Outcome
          language describes qualitative operating improvements only — no
          invented metrics.
        </p>
      </div>

      <Block title="Challenge" body={story.challenge} />
      <Block title="Context" body={story.context} />
      <Block title="Agrayian approach" body={story.approach} />
      <Block title="Solution architecture" body={story.architecture} />
      <Block title="Governance approach" body={story.governance} />

      <div>
        <h2 className="font-heading text-base font-semibold text-text-on-dark">
          Outcome category — {story.outcomeCategory}
        </h2>
        <ul className="mt-2 space-y-1">
          {story.outcomes.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-heading text-base font-semibold text-text-on-dark">
          Related products
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {story.relatedProducts.map((item) => (
            <Link key={item} href={`/products/${item}`}>
              <Badge className="hover:border-cyan/40">{productLabel(item)}</Badge>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-heading text-base font-semibold text-text-on-dark">
          Related capabilities
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {story.relatedCapabilities.map((item) => (
            <Badge key={item} variant="violet">
              {capabilityLabel(item)}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <PrimaryButton href="/contact?interest=consultation">
          Discuss a similar engagement
        </PrimaryButton>
      </div>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-heading text-base font-semibold text-text-on-dark">
        {title}
      </h2>
      <p className="mt-1 leading-relaxed">{body}</p>
    </div>
  );
}
