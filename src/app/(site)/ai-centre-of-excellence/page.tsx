import { CmsBlocksOrFallback } from "@/components/cms/CmsBlocksOrFallback";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { CoeExperience } from "./CoeExperience";

export const metadata = buildMetadata({
  title: "AI Centre of Excellence",
  description:
    "An operating model that makes AI repeatable — connect strategy, governance, platforms, talent and delivery so every use case stops restarting from zero.",
  path: "/ai-centre-of-excellence",
});

export default function AICentreOfExcellencePage() {
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
        <CoeExperience />
      </>
    </CmsBlocksOrFallback>
  );
}
