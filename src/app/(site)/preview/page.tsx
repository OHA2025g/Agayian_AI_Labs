import { notFound } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import { BlockRenderer } from "@/components/cms/BlockRenderer";
import { Section } from "@/components/layout/Section";

type Search = {
  collection?: string;
  slug?: string;
  global?: string;
  secret?: string;
};

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const params = await searchParams;
  if (!process.env.PREVIEW_SECRET || params.secret !== process.env.PREVIEW_SECRET) {
    notFound();
  }

  const payload = await getPayloadClient();

  if (params.global) {
    const doc = await payload.findGlobal({
      slug: params.global as "home-page",
      draft: true,
      overrideAccess: true,
    });
    const layout = (doc as { layout?: unknown[] }).layout as never;
    return (
      <Section title={`Preview · ${params.global}`} className="pt-10">
        <BlockRenderer blocks={layout} />
      </Section>
    );
  }

  if (params.collection && params.slug) {
    const result = await payload.find({
      collection: params.collection as "insights",
      draft: true,
      overrideAccess: true,
      limit: 1,
      where: { slug: { equals: params.slug } },
    });
    const doc = result.docs[0] as
      | { title?: string; excerpt?: string; bodyParagraphs?: { text: string }[] }
      | undefined;
    if (!doc) notFound();
    return (
      <Section title={doc.title || "Draft preview"} className="pt-10">
        <p className="text-muted-dark">{doc.excerpt}</p>
        <div className="mt-6 space-y-4 text-muted-dark">
          {doc.bodyParagraphs?.map((paragraph) => (
            <p key={paragraph.text.slice(0, 24)}>{paragraph.text}</p>
          ))}
        </div>
      </Section>
    );
  }

  notFound();
}
