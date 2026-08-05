import { BlockRenderer } from "@/components/cms/BlockRenderer";
import { getPublishedGlobal } from "@/lib/cms/published";

type BlockGlobal =
  | "home-page"
  | "coe-page"
  | "governance-page"
  | "company-page"
  | "contact-page";

type Block = {
  blockType: string;
  [key: string]: unknown;
};

/**
 * Renders CMS layout blocks when present; otherwise the existing page JSX.
 * Prefer keeping brand-critical heroes in code (e.g. HomeHero) and using this
 * for CoE / governance / supplemental layouts.
 */
export async function CmsBlocksOrFallback({
  slug,
  children,
  preferCms = true,
}: {
  slug: BlockGlobal;
  children: React.ReactNode;
  preferCms?: boolean;
}) {
  if (!preferCms) return children;
  const doc = await getPublishedGlobal<{ layout?: Block[] }>(slug);
  if (doc?.layout?.length) {
    return <BlockRenderer blocks={doc.layout} />;
  }
  return children;
}
