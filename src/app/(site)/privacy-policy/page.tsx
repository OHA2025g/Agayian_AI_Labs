import { LegalDocumentView } from "@/components/cms/LegalDocumentView";
import { privacyPolicy } from "@/data/legal";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <LegalDocumentView slug="privacy-policy" fallback={privacyPolicy} />;
}
