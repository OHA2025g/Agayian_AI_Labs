import { LegalDocumentView } from "@/components/cms/LegalDocumentView";
import { cookiePolicy } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description: "How Agrayian AI Labs uses cookies and similar technologies.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return <LegalDocumentView slug="cookie-policy" fallback={cookiePolicy} />;
}
