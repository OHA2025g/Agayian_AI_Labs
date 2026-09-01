import {
  BarChart3,
  Monitor,
  Orbit,
  Share2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  IndustryPanel,
  SectionHeading,
  TechnicalIconCircle,
} from "@/components/industries/primitives";

const icons: LucideIcon[] = [Share2, Orbit, BarChart3, Monitor, ShieldCheck];

export function ExpectedOutcomes({ items }: { items: string[] }) {
  return (
    <IndustryPanel className="industries-outcomes">
      <SectionHeading>Expected outcomes</SectionHeading>
      <div className="industries-outcomes-grid">
        <ul className="industries-outcome-list">
          {items.slice(0, 5).map((item, index) => {
            const Icon = icons[index] ?? Share2;
            return (
              <li key={item} className="industries-outcome-item">
                <TechnicalIconCircle>
                  <Icon strokeWidth={1.6} />
                </TechnicalIconCircle>
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
        <div className="industries-outcomes-art-wrap" aria-hidden>
          <img
            src="/visuals/industries-outcomes-sculpture.png"
            alt=""
            width={1536}
            height={1024}
            className="industries-outcomes-art"
          />
        </div>
      </div>
    </IndustryPanel>
  );
}
