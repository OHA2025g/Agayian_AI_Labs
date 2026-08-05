import { LegalDocumentView } from "@/components/cms/LegalDocumentView";
import { termsOfUse } from "@/data/legal";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms of Use for ${siteConfig.name}.`,
  path: "/terms-of-use",
});

export default function TermsOfUsePage() {
  return <LegalDocumentView slug="terms-of-use" fallback={termsOfUse} />;
}
