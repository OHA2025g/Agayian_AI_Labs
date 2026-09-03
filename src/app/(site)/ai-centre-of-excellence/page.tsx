import { CmsBlocksOrFallback } from "@/components/cms/CmsBlocksOrFallback";
import { getCoePageContent } from "@/lib/cms/page-content";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { CoeExperience } from "./CoeExperience";

export async function generateMetadata() {
  const copy = await getCoePageContent();
  return buildMetadata({
    title: copy.seo.title,
    description: copy.seo.description,
    path: "/ai-centre-of-excellence",
  });
}

export default async function AICentreOfExcellencePage() {
  const copy = await getCoePageContent();
  return (
    <CmsBlocksOrFallback slug="coe-page" preferCms={false}>
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbSchema([
                { name: "Home", path: "/" },
                {
                  name: "AI Centre of Excellence",
                  path: "/ai-centre-of-excellence",
                },
              ]),
            ),
          }}
        />
        <CoeExperience copy={copy} />
      </>
    </CmsBlocksOrFallback>
  );
}
