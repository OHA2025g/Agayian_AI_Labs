import { MockupCard } from "@/components/ui/MockupCard";
import { CapabilityMark } from "@/components/visualisations/glass/CapabilityMarks";
import type { Capability } from "@/types";

type JourneyCopy = {
  title: string;
  challenge: string;
  deliver: string;
  typical: readonly string[];
  uses: string;
  outcomes: string;
};

const cards: Record<string, JourneyCopy> = {
  strategy: {
    title: "AI Strategy & Consulting",
    challenge:
      "Unclear AI direction, fragmented initiatives and uncertain ROI.",
    deliver:
      "Executive alignment, use-case prioritisation, ROI business case and investment roadmap.",
    typical: [
      "AI strategy & vision",
      "Use-case portfolio",
      "Value & ROI model",
      "Roadmap & funding plan",
    ],
    uses: "AI strategy & operating model, opportunity assessment, value prioritisation.",
    outcomes:
      "Aligned leadership, prioritised use cases and a funded roadmap ready for execution.",
  },
  data: {
    title: "Data & Analytics",
    challenge:
      "Siloed, inconsistent and low-quality data limits trusted AI.",
    deliver:
      "Data foundation, platforms and analytics to make data trusted, accessible and actionable.",
    typical: [
      "Data strategy & blueprint",
      "Data platform & pipelines",
      "Data quality & catalogue",
      "KPI dashboards",
    ],
    uses: "Customer 360, operational analytics, forecasting, real-time dashboards.",
    outcomes:
      "Trusted data foundation, self-serve analytics and better business decisions.",
  },
  "generative-ai": {
    title: "Generative AI",
    challenge:
      "Manual content workflows and knowledge silos slow productivity.",
    deliver:
      "Secure, enterprise-grade GenAI for content, knowledge and productivity at scale.",
    typical: [
      "GenAI solution design",
      "Prompt & knowledge layer",
      "Guardrails & safety",
      "Adoption & training",
    ],
    uses: "Content generation, summarisation, knowledge search, code and document automation.",
    outcomes:
      "Higher productivity, consistent quality and faster time to value.",
  },
  "agentic-ai": {
    title: "Agentic AI",
    challenge:
      "Complex processes need autonomy and coordination across systems.",
    deliver:
      "Intelligent agents that plan, act and orchestrate work with human oversight.",
    typical: [
      "Agent design & orchestration",
      "Tool & system integration",
      "Human-in-the-loop",
      "Observability & control",
    ],
    uses: "Workflow automation, case management, intelligent triage, exception handling.",
    outcomes:
      "Autonomous workflows, reduced cycle time and improved operational agility.",
  },
  governance: {
    title: "AI Governance",
    challenge:
      "AI risks, compliance and uncontrolled use create exposure.",
    deliver:
      "Governance frameworks, policies and controls for responsible and compliant AI.",
    typical: [
      "AI governance framework",
      "Risk & impact assessments",
      "Policy & guardrails",
      "Audit & compliance pack",
    ],
    uses: "Model risk management, bias & fairness, explainability, audit readiness.",
    outcomes:
      "Reduced risk, regulatory compliance and trustworthy AI adoption.",
  },
  "product-engineering": {
    title: "AI Product Engineering",
    challenge:
      "Prototypes don't transition to scalable, secure production products.",
    deliver:
      "End-to-end engineering to build, integrate and ship AI products at scale.",
    typical: [
      "Solution architecture",
      "Development & integration",
      "Testing & MLOps",
      "Release & scale",
    ],
    uses: "AI-powered applications, APIs, copilots, search and recommendation systems.",
    outcomes:
      "Production-ready AI products with performance, security and scale.",
  },
  "managed-services": {
    title: "AI Managed Services",
    challenge:
      "Systems need continuous support, monitoring and optimisation.",
    deliver:
      "Managed operations for reliability, performance and continuous improvement.",
    typical: [
      "Monitoring & support",
      "Performance & cost mgmt",
      "Model monitoring & drift",
      "Continuous improvement",
    ],
    uses: "Production operations, drift monitoring, incident management, cost optimisation.",
    outcomes:
      "Reliable AI in production, optimised performance and lower total cost of ownership.",
  },
};

export function CapabilityJourney({ layers }: { layers: Capability[] }) {
  return (
    <ol className="relative space-y-12 md:space-y-16">
      <JourneyWave />
      {layers.map((capability, index) => (
        <CapabilityRow
          key={capability.id}
          capability={capability}
          index={index}
        />
      ))}
    </ol>
  );
}

function CapabilityRow({
  capability,
  index,
}: {
  capability: Capability;
  index: number;
}) {
  const copy = cards[capability.slug];
  const title = copy?.title ?? capability.name;

  return (
    <li id={capability.slug} className="relative scroll-mt-36">
      <div className="grid items-center gap-5 md:grid-cols-[10.5rem_minmax(0,1fr)] md:gap-7 xl:grid-cols-[11.5rem_minmax(0,1fr)] xl:gap-10">
        <div className="relative z-10 flex items-center gap-3 md:flex-col md:items-center md:gap-3 md:text-center">
          <span className="relative font-heading text-[2.35rem] font-semibold leading-none text-[#8fd4ee] md:text-[2.85rem]">
            <span
              aria-hidden
              className="absolute -left-3.5 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-[#ff4d5e] md:block"
            />
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex h-[3.6rem] w-[3.6rem] shrink-0 items-center justify-center rounded-full border border-[#c5e4f5] bg-white text-navy shadow-[0_8px_20px_rgba(20,159,230,0.12)]">
            <CapabilityMark name={capability.slug} className="h-7 w-7" />
          </span>
          <h2 className="font-heading text-[1.05rem] font-semibold leading-snug text-navy md:max-w-[11rem] md:text-[1.12rem]">
            {title}
          </h2>
        </div>

        <MockupCard className="px-5 py-6 shadow-[0_12px_34px_rgba(11,31,58,0.06)] hover:translate-y-0 hover:shadow-[0_12px_34px_rgba(11,31,58,0.06)] sm:px-7 sm:py-8 xl:px-8">
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            <CopyCol title="Business challenge" body={copy?.challenge} />
            <CopyCol title="What we deliver" body={copy?.deliver} />
            <CopyCol title="Typical deliverables" items={copy?.typical} />
            <CopyCol title="Use cases" body={copy?.uses} />
            <CopyCol title="Outcomes" body={copy?.outcomes} />
          </div>
        </MockupCard>
      </div>
    </li>
  );
}

function CopyCol({
  title,
  body,
  items,
}: {
  title: string;
  body?: string;
  items?: readonly string[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="font-heading text-[0.98rem] font-semibold leading-snug text-navy">
        {title}
      </h3>
      {body ? (
        <p className="mt-3 text-[0.9rem] leading-[1.65] text-navy/60">
          {body}
        </p>
      ) : null}
      {items ? (
        <ul className="mt-3 space-y-2.5">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 text-[0.9rem] leading-[1.55] text-navy/60"
            >
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tech-blue"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function JourneyWave() {
  const height = 840;
  const mid = 22;
  const amp = 9;
  const samples = 96;
  const points: string[] = [];

  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const x = mid + Math.sin(t * Math.PI * 6) * amp;
    const y = 8 + t * (height - 16);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return (
    <svg
      aria-hidden
      viewBox={`0 0 44 ${height}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute -left-1 top-4 hidden h-[calc(100%-1.5rem)] w-11 md:block"
    >
      <path
        d={`M ${points.join(" L ")}`}
        fill="none"
        stroke="#149fe6"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeDasharray="1.6 6.4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
