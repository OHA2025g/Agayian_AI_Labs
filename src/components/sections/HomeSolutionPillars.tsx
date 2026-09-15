import { Reveal } from "@/components/motion/Reveal";
import { MockupCard } from "@/components/ui/MockupCard";

export type HomePillar = { title: string; body: string };

const DEFAULT_PILLARS: HomePillar[] = [
  {
    title: "AI Strategy and Advisory",
    body: "Define the operational problem, the decision that must improve and the governed path from pilot to production.",
  },
  {
    title: "Agentic Process Automation",
    body: "Deploy workflow-integrated agents that act inside high-value processes with human approval at the critical steps.",
  },
  {
    title: "Data and Decision Intelligence",
    body: "Turn fragmented operational data into timely, reviewable intelligence for executives and programme owners.",
  },
  {
    title: "AI Governance, Risk and Compliance",
    body: "Make AI audit-ready with access control, explainability, monitoring, data residency and incident management.",
  },
];

export function HomeSolutionPillars({
  items = DEFAULT_PILLARS,
}: {
  items?: HomePillar[];
}) {
  return (
    <Reveal>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <MockupCard key={item.title} className="px-5 py-6 hover:translate-y-0">
            <h3 className="font-heading text-lg font-semibold text-navy">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-light">{item.body}</p>
          </MockupCard>
        ))}
      </div>
    </Reveal>
  );
}
