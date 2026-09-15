import { Reveal } from "@/components/motion/Reveal";
import { MockupCard } from "@/components/ui/MockupCard";

const DEFAULT_ITEMS = [
  "Manual audit",
  "Fragmented operations",
  "Slow document review",
  "Revenue leakage",
  "Fraud risk",
  "Poor cross-department visibility",
];

export function HomeProblemStatement({
  items = DEFAULT_ITEMS,
}: {
  items?: string[];
}) {
  return (
    <Reveal>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item}>
            <MockupCard className="px-5 py-5 hover:translate-y-0">
              <p className="font-heading text-base font-semibold text-navy">{item}</p>
            </MockupCard>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
