import { Section } from "@/components/layout/Section";
import type { LegalDocument } from "@/data/legal";
import { getPublishedGlobal } from "@/lib/cms/published";

type GlobalSlug =
  | "privacy-policy"
  | "terms-of-use"
  | "responsible-ai"
  | "cookie-policy"
  | "accessibility-statement";

export async function LegalDocumentView({
  slug,
  fallback,
}: {
  slug: GlobalSlug;
  fallback: LegalDocument;
}) {
  const doc = await getPublishedGlobal<{
    title?: string;
    description?: string;
    sections?: { heading: string; body: string }[];
  }>(slug);

  const title = doc?.title || fallback.title;
  const description = doc?.description || fallback.description;
  const sections =
    Array.isArray(doc?.sections) && doc.sections.length > 0
      ? doc.sections
      : fallback.sections;

  return (
    <Section
      eyebrow="Legal"
      title={title}
      description={description}
      className="pt-10 md:pt-16"
      tone="dark"
    >
      <div className="prose-dark max-w-3xl space-y-6 text-sm leading-relaxed text-muted-dark">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-heading text-xl font-semibold text-text-on-dark">
              {section.heading}
            </h2>
            <p className="mt-2">{section.body}</p>
          </section>
        ))}
      </div>
    </Section>
  );
}
