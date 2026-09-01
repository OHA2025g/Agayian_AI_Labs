import {
  FileCog,
  ShieldCheck,
  Stethoscope,
  UserCog,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  IndustryPanel,
  SectionHeading,
  TechnicalIconCircle,
  splitLabeled,
} from "@/components/industries/primitives";

const challengeIcons: LucideIcon[] = [
  Stethoscope,
  FileCog,
  Zap,
  ShieldCheck,
  UserCog,
];

export function PriorityChallenges({ items }: { items: string[] }) {
  return (
    <IndustryPanel className="industries-challenges">
      <SectionHeading>Priority challenges</SectionHeading>
      <ul className="industries-challenge-list">
        {items.slice(0, 5).map((item, index) => {
          const { title, description } = splitLabeled(item);
          const Icon = challengeIcons[index] ?? Stethoscope;
          return (
            <li key={item} className="industries-challenge-item">
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
