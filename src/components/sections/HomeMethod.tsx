import { Reveal } from "@/components/motion/Reveal";
import { MockupCard } from "@/components/ui/MockupCard";

export type HomeMethodStep = { title: string; body: string };

const DEFAULT_STEPS: HomeMethodStep[] = [
  {
    title: "Discover",
    body: "Identify the operational workflow, buyers, constraints and the evidence needed to act.",
  },
  {
    title: "Design",
    body: "Specify the system, human approval points, data sources and measurable outcomes.",
  },
  {
    title: "Pilot",
    body: "Prove the workflow in a bounded production-like setting with reviewable results.",
  },
  {
    title: "Scale",
    body: "Move from a governed pilot to a production system with monitoring and ownership.",
  },
];

export function HomeMethod({ items = DEFAULT_STEPS }: { items?: HomeMethodStep[] }) {
  return (
    <Reveal>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <li key={item.title}>
            <MockupCard className="h-full px-5 py-6 hover:translate-y-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-blue">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-heading text-lg font-semibold text-navy">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-light">{item.body}</p>
            </MockupCard>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
