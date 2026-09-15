import { Reveal } from "@/components/motion/Reveal";
import { MockupCard } from "@/components/ui/MockupCard";

const DEFAULT_ITEMS = [
  "Government and public sector",
  "Banking and financial services",
  "Enterprise operations",
  "Data, AI and automation",
  "Secure and governed AI",
];

export function HomeTrustStrip({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  return (
    <Reveal>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <li key={item}>
            <MockupCard className="flex h-full items-center px-4 py-4 hover:translate-y-0">
              <p className="text-sm font-semibold leading-snug text-navy">{item}</p>
            </MockupCard>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
