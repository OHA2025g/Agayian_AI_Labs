import { CapabilityMark } from "@/components/visualisations/glass/CapabilityMarks";
import type { Capability } from "@/types";

type JourneyCopy = {
  title: string;
  railTitle: string;
  challenge: string;
  deliver: string;
  typical: readonly string[];
  uses: string;
  outcomes: string;
};

const cards: Record<string, JourneyCopy> = {
  strategy: {
    title: "AI Strategy & Consulting",
    railTitle: "AI Strategy &\nConsulting",
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
    railTitle: "Data &\nAnalytics",
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
    railTitle: "Generative AI",
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
    railTitle: "Agentic AI",
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
    railTitle: "AI\nGovernance",
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
    railTitle: "AI Product\nEngineering",
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
    railTitle: "AI Managed\nServices",
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
    <ol className="capabilities-journey capabilities-rows relative space-y-10 min-[1200px]:space-y-0">
      <JourneyFrame count={layers.length} />
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
  const railTitle = copy?.railTitle ?? title;

  return (
    <li id={capability.slug} className="capabilities-row relative scroll-mt-28">
      <div className="capabilities-rail relative z-10">
        <span className="capabilities-index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="capabilities-icon">
          <CapabilityMark name={capability.slug} className="h-6 w-6" />
        </span>
        <h2 className="capabilities-rail-title">
          {railTitle.split("\n").map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
      </div>

      <span aria-hidden className="capabilities-anchor" />

      <article className="capabilities-card">
        <CopyCol title={["Business", "challenge"]} body={copy?.challenge} />
        <CopyCol title={["What we", "deliver"]} body={copy?.deliver} />
        <CopyCol title={["Typical", "deliverables"]} items={copy?.typical} />
        <CopyCol title={["Use cases"]} body={copy?.uses} />
        <CopyCol title={["Outcomes"]} body={copy?.outcomes} />
      </article>
    </li>
  );
}

function CopyCol({
  title,
  body,
  items,
}: {
  title: readonly string[];
  body?: string;
  items?: readonly string[];
}) {
  return (
    <div className="capabilities-col min-w-0">
      <h3 className="capabilities-col-title">
        {title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h3>
      {body ? <p className="capabilities-col-body">{body}</p> : null}
      {items ? (
        <ul className="capabilities-col-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

const JOURNEY_ROW = 232;
const JOURNEY_GAP = 18;
const JOURNEY_WIDTH = 1105;
const WAVE_PEAK_X = 124;
const WAVE_VALLEY_X = 92;
const FRAME_RADIUS = 22;
const FRAME_INSET = 3;
const DOT_OFFSET_Y = 28;

function journeyHeight(count: number) {
  return count * JOURNEY_ROW + Math.max(0, count - 1) * JOURNEY_GAP;
}

function waveX(t: number) {
  return (
    WAVE_PEAK_X +
    (WAVE_VALLEY_X - WAVE_PEAK_X) * 0.5 * (1 - Math.cos(t * Math.PI * 2))
  );
}

function peakY(index: number) {
  return index * (JOURNEY_ROW + JOURNEY_GAP) + DOT_OFFSET_Y;
}

/** Dotted frame: wavy left spine, rounded turns at 01 and 07, box around all rows. */
function journeyFramePath(count: number) {
  const height = journeyHeight(count);
  const top = FRAME_INSET;
  const bottom = height - FRAME_INSET;
  const right = JOURNEY_WIDTH - FRAME_INSET;
  const r = FRAME_RADIUS;
  const firstY = peakY(0);
  const steps = 24;

  const pts: string[] = [];
  pts.push(`M ${WAVE_PEAK_X + r} ${top}`);
  pts.push(
    `C ${WAVE_PEAK_X} ${top}, ${WAVE_PEAK_X} ${top + r}, ${WAVE_PEAK_X} ${firstY}`,
  );

  for (let i = 0; i < count - 1; i += 1) {
    const y0 = peakY(i);
    const y1 = peakY(i + 1);
    for (let s = 1; s <= steps; s += 1) {
      const t = s / steps;
      pts.push(`L ${waveX(t).toFixed(2)} ${(y0 + (y1 - y0) * t).toFixed(2)}`);
    }
  }

  pts.push(
    `C ${WAVE_PEAK_X} ${bottom - r}, ${WAVE_PEAK_X} ${bottom}, ${WAVE_PEAK_X + r} ${bottom}`,
  );
  pts.push(`L ${right - r} ${bottom}`);
  pts.push(`Q ${right} ${bottom} ${right} ${bottom - r}`);
  pts.push(`L ${right} ${top + r}`);
  pts.push(`Q ${right} ${top} ${right - r} ${top}`);
  pts.push("Z");
  return pts.join(" ");
}

function JourneyFrame({ count }: { count: number }) {
  const height = journeyHeight(count);
  const path = journeyFramePath(count);
  const dots = Array.from({ length: count }, (_, index) => ({
    cx: WAVE_PEAK_X,
    cy: peakY(index),
  }));

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${JOURNEY_WIDTH} ${height}`}
      preserveAspectRatio="none"
      className="capabilities-frame pointer-events-none absolute inset-0 hidden min-[1200px]:block"
    >
      <path
        d={path}
        fill="#fff"
        stroke="#7ad2f2"
        strokeWidth="1.15"
        strokeDasharray="1.7 5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {dots.map((dot) => (
        <circle
          key={dot.cy}
          cx={dot.cx}
          cy={dot.cy}
          r="4.5"
          fill="#ff4f5e"
        />
      ))}
    </svg>
  );
}
