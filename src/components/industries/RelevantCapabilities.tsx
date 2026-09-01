import { IndustryCapabilityIconMark } from "@/components/industries/IndustryCapabilityIcons";
import { IndustryPanel, SectionHeading } from "@/components/industries/primitives";
import type { IndustryCapabilityItem } from "@/types";

export function RelevantCapabilities({
  items,
}: {
  items: IndustryCapabilityItem[];
}) {
  return (
    <IndustryPanel className="industries-capabilities">
      <SectionHeading>Relevant capabilities</SectionHeading>
      <ul className="industries-cap-grid">
        {items.slice(0, 9).map((item) => (
          <li key={item.title} className="industries-cap-item">
            <IndustryCapabilityIconMark name={item.icon} />
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </IndustryPanel>
  );
}
