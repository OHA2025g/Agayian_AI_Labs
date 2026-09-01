import {
  FilePlus2,
  GitFork,
  Scale,
  Shield,
  Target,
  type LucideIcon,
} from "lucide-react";
import {
  IndustryPanel,
  SectionHeading,
  TechnicalIconCircle,
  splitLabeled,
} from "@/components/industries/primitives";

const icons: LucideIcon[] = [FilePlus2, Shield, Scale, GitFork, Target];

export function GovernanceConsiderations({ items }: { items: string[] }) {
  return (
    <IndustryPanel className="industries-governance">
      <SectionHeading>Governance considerations</SectionHeading>
      <ul className="industries-gov-list">
        {items.slice(0, 5).map((item, index) => {
          const { title, description } = splitLabeled(item);
          const Icon = icons[index] ?? Shield;
          return (
            <li key={item} className="industries-gov-item">
              <TechnicalIconCircle>
                <Icon strokeWidth={1.6} />
              </TechnicalIconCircle>
              <div>
                <h4>{title}</h4>
                {description ? <p>{description}</p> : null}
              </div>
            </li>
          );
        })}
      </ul>
    </IndustryPanel>
  );
}
