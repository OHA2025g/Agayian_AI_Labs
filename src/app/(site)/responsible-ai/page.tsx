import { LegalDocumentView } from "@/components/cms/LegalDocumentView";
import { CTASection } from "@/components/sections/CTASection";
import { responsibleAi } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Responsible AI",
  description:
    "Agrayian AI Labs’ commitment to responsible, explainable and governable artificial intelligence for enterprises and governments.",
  path: "/responsible-ai",
});

export default function ResponsibleAIPage() {
  return (
    <>
      <LegalDocumentView slug="responsible-ai" fallback={responsibleAi} />
      <CTASection title="Build AI systems that executives and auditors can trust" />
    </>
  );
}
