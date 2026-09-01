import type { CSSProperties } from "react";
import {
  ClipboardList,
  FileSearch,
  MessageCircleMore,
  Share2,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";
import {
  IndustryPanel,
  SectionHeading,
  TechnicalIconCircle,
} from "@/components/industries/primitives";

const icons: LucideIcon[] = [
  ClipboardList,
  ShieldCheck,
  Share2,
  FileSearch,
  Target,
  MessageCircleMore,
];

export function TypicalWorkflows({
  steps,
}: {
  steps: { title: string; description: string }[];
}) {
  const items = steps.slice(0, 6);

  return (
    <IndustryPanel className="industries-workflows industries-main">
      <SectionHeading>Typical workflows</SectionHeading>
      <div
        className="industries-workflow-grid"
        style={{ "--workflow-cols": "6" } as CSSProperties}
      >
        {items.map((step, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div key={step.title} className="industries-workflow-step">
              <div className="industries-workflow-icon-row">
                <TechnicalIconCircle>
                  <Icon strokeWidth={1.5} />
                </TechnicalIconCircle>
                {index < items.length - 1 ? (
                  <span className="industries-workflow-connector" aria-hidden />
                ) : null}
              </div>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          );
        })}
      </div>
    </IndustryPanel>
  );
}
