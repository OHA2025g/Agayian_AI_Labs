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
    <article className="bg-white">
      <header className="border-b border-[var(--border-soft)] bg-[#f5f8fb]/70">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <nav className="text-sm text-muted-light">
            <Link href="/" className="hover:text-navy">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link href="/impact-stories" className="hover:text-navy">
              Impact Stories
            </Link>
          </nav>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="violet">{industryLabel(story.industry)}</Badge>
            <Badge>{story.clientLabel}</Badge>
            <Badge variant="cyan">{story.solutionType}</Badge>
          </div>
          <h1 className="mt-5 font-heading text-[clamp(1.8rem,3.5vw,3rem)] font-semibold text-balance text-navy">
            {story.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-light">
            Anonymised sector pattern. Client identity is not disclosed. Outcome
            language describes qualitative operating improvements only — no
            invented metrics.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm sm:px-6 md:py-16 lg:px-8">
        <Block title="Challenge" body={story.challenge} />
        <Block title="Context" body={story.context} />
        <Block title="Agrayian approach" body={story.approach} />
        <Block title="Solution architecture" body={story.architecture} />
        <Block title="Governance approach" body={story.governance} />

        <div>
          <h2 className="font-heading text-base font-semibold text-navy">
            Outcome category — {story.outcomeCategory}
          </h2>
          <ul className="mt-2 space-y-1 text-muted-light">
            {story.outcomes.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-base font-semibold text-navy">
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
          <h2 className="font-heading text-base font-semibold text-navy">
            Related capabilities
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {story.relatedCapabilities.map((item) => (
              <Link key={item} href={`/capabilities#${item}`}>
                <Badge variant="violet">{capabilityLabel(item)}</Badge>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <PrimaryButton href="/contact?interest=consultation">
            Discuss a similar engagement
          </PrimaryButton>
        </div>
      </div>
    </article>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-heading text-base font-semibold text-navy">{title}</h2>
      <p className="mt-1 leading-relaxed text-muted-light">{body}</p>
    </div>
  );
}
