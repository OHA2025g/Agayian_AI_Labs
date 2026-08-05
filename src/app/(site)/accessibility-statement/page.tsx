import { LegalDocumentView } from "@/components/cms/LegalDocumentView";
import { accessibilityStatement } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Accessibility Statement",
  description:
    "Agrayian AI Labs accessibility commitments for this website.",
  path: "/accessibility-statement",
});

export default function AccessibilityStatementPage() {
  return (
    <LegalDocumentView
      slug="accessibility-statement"
      fallback={accessibilityStatement}
    />
  );
}
