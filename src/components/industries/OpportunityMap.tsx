import {
  Building2,
  FileSearch,
  PieChart,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  IndustryPanel,
  SectionHeading,
  splitLabeled,
} from "@/components/industries/primitives";

const calloutIcons: LucideIcon[] = [
  Building2,
  PieChart,
  FileSearch,
  ShieldCheck,
];

const calloutSlots = [
  { top: "6%", left: "2%" },
  { top: "8%", right: "2%" },
  { bottom: "10%", left: "10%" },
  { bottom: "8%", right: "2%" },
] as const;

export function OpportunityMap({ items }: { items: string[] }) {
  const callouts = items.slice(0, 4).map((item, index) => ({
    ...splitLabeled(item),
    pos: calloutSlots[index],
    Icon: calloutIcons[index] ?? Building2,
  }));

  return (
    <IndustryPanel className="industries-opportunity">
      <div className="industries-opportunity-head">
        <SectionHeading>Opportunity map</SectionHeading>
        <div className="industries-impact-legend" aria-label="Strategic impact">
          <span className="industries-impact-legend-label">Strategic impact</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5360]" />
            High
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38b7eb]" />
            Moderate
          </span>
        </div>
      </div>
      <div className="industries-opportunity-stage">
        <img
          src="/visuals/industries-opportunity-map.png"
          alt=""
          width={1536}
          height={1024}
          className="industries-opportunity-art"
        />
        {callouts.map((callout) => {
          const Icon = callout.Icon;
          return (
            <article
              key={callout.title}
              className="industries-callout"
              style={callout.pos}
            >
              <Icon className="industries-callout-icon" strokeWidth={1.6} />
              <h4>{callout.title}</h4>
              {callout.description ? <p>{callout.description}</p> : null}
            </article>
          );
        })}
      </div>
    </IndustryPanel>
  );
}
