import Link from "next/link";
import type { LegalDocument } from "@/data/legal";
import { getPublishedGlobal } from "@/lib/cms/published";
import { getResolvedNav } from "@/lib/cms/site";
import { cn } from "@/lib/utils";

type GlobalSlug =
  | "privacy-policy"
  | "terms-of-use"
  | "responsible-ai"
  | "cookie-policy"
  | "accessibility-statement";

export async function LegalDocumentView({
  slug,
  fallback,
  eyebrow = "Legal",
}: {
  slug: GlobalSlug;
  fallback: LegalDocument;
  eyebrow?: string;
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

  const nav = await getResolvedNav();
  const legalLinks = nav.footerLegal;
  const currentPath =
    slug === "responsible-ai" ? "/responsible-ai" : `/${slug}`;

  return (
    <article className="bg-white">
      <header className="border-b border-[var(--border-light)] bg-[#f3f8fc]/60">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="font-tech text-[0.65rem] uppercase tracking-[0.18em] text-tech-blue">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-heading text-[clamp(1.85rem,3.5vw,2.75rem)] font-semibold tracking-tight text-navy">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-muted-light md:text-lg">
              {description}
            </p>
          ) : null}
          <nav
            aria-label="Trust and legal documents"
            className="mt-8 flex flex-wrap gap-2"
          >
            {legalLinks
              .filter((item) => item.href.startsWith("/"))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                    item.href === currentPath
                      ? "border-tech-blue/40 bg-tech-blue/10 text-navy"
                      : "border-[var(--border-light)] bg-white text-muted-light hover:text-navy",
                  )}
                >
                  {item.label}
                </Link>
              ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-heading text-xl font-semibold text-navy">
              {section.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-light md:text-base">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
