export type IconName =
  | "assess"
  | "blocks"
  | "capture"
  | "chart"
  | "control"
  | "data"
  | "decide"
  | "deliver"
  | "design"
  | "direct"
  | "factory"
  | "governance"
  | "idea"
  | "mandate"
  | "model"
  | "monitor"
  | "people"
  | "platform"
  | "portfolio"
  | "reuse"
  | "risk"
  | "scale"
  | "score"
  | "standards"
  | "talent"
  | "triage"
  | "value";

export type Layer = {
  number: string;
  title: string;
  description: string;
  icon: IconName;
};

export const layers: Layer[] = [
  {
    number: "01",
    title: "Business Strategy",
    description:
      "Align AI to business goals, value streams and investment priorities.",
    icon: "chart",
  },
  {
    number: "02",
    title: "Governance",
    description: "Set policies, guardrails, risk controls and decision rights.",
    icon: "governance",
  },
  {
    number: "03",
    title: "Use-case Portfolio",
    description:
      "Maintain a dynamic portfolio of high-value, feasible and compliant use cases.",
    icon: "portfolio",
  },
  {
    number: "04",
    title: "Data Foundation",
    description:
      "Ensure quality, access, lineage and security for trustworthy AI.",
    icon: "data",
  },
  {
    number: "05",
    title: "AI Platform",
    description:
      "Provide secure, scalable platforms, tools and model services.",
    icon: "platform",
  },
  {
    number: "06",
    title: "Delivery Factory",
    description:
      "Industrialise delivery with reusable components, templates and pipelines.",
    icon: "factory",
  },
  {
    number: "07",
    title: "Talent & Capability",
    description:
      "Build skills, scale and a culture of responsible innovation.",
    icon: "talent",
  },
  {
    number: "08",
    title: "Operations & Monitoring",
    description:
      "Run, monitor and continuously improve models and data in production.",
    icon: "monitor",
  },
  {
    number: "09",
    title: "Value Realisation",
    description:
      "Measure impact, drive adoption and reinvest in what works.",
    icon: "value",
  },
];

export const outcomes = [
  "Aligned strategy and priorities",
  "Governed AI by design",
  "Reusable platforms and assets",
  "Faster, safer delivery",
  "Measurable business impact",
] as const;

export const whatFeatures = [
  { icon: "mandate" as const, title: "Enterprise mandate", detail: "and resourcing" },
  { icon: "standards" as const, title: "Standards, patterns", detail: "and guardrails" },
  { icon: "reuse" as const, title: "Reusable assets", detail: "and platforms" },
  { icon: "governance" as const, title: "Outcomes-focused", detail: "delivery" },
];

export const whyFeatures = [
  {
    icon: "people" as const,
    title: "Fragmented ownership",
    detail:
      "Different teams, different standards and no single point of accountability.",
  },
  {
    icon: "risk" as const,
    title: "Pilot sprawl",
    detail: "Too many disconnected pilots with no clear path to scale.",
  },
  {
    icon: "control" as const,
    title: "Uneven risk control",
    detail: "Inconsistent governance creates exposure and limits confidence.",
  },
  {
    icon: "model" as const,
    title: "Weak reuse",
    detail: "Solutions are rebuilt repeatedly; knowledge and IP are lost.",
  },
];

export const intakeSteps = [
  {
    title: "Capture",
    description: "Collect ideas from across the organisation.",
    icon: "capture" as const,
  },
  {
    title: "Score",
    description: "Assess value, feasibility, risk and readiness.",
    icon: "score" as const,
  },
  {
    title: "Triage",
    description: "Prioritise and shape promising opportunities.",
    icon: "triage" as const,
  },
  {
    title: "Decide",
    description: "Fund, build, iterate or retire with confidence.",
    icon: "decide" as const,
  },
];

export const pillars = [
  {
    title: "Direct",
    description:
      "Set strategy, portfolio and standards. Ensure alignment to business outcomes.",
    icon: "direct" as const,
  },
  {
    title: "Control",
    description:
      "Manage risk, compliance and quality. Enable safe and responsible AI.",
    icon: "control" as const,
  },
  {
    title: "Deliver",
    description:
      "Accelerate delivery and adoption. Drive measurable business value.",
    icon: "deliver" as const,
  },
];

export const foundations = [
  {
    title: "Governance structure",
    description:
      "Clear roles, forums and decision rights across the enterprise.",
    items: [
      "CoE charter and mandate",
      "Decision rights and RACI",
      "Risk, compliance and ethics",
      "Architecture review board",
    ],
    icon: "governance" as const,
    sculpture: "governance" as const,
  },
  {
    title: "Delivery factory",
    description:
      "Industrialised ways of working for consistent, high-quality delivery.",
    items: [
      "Reference architectures",
      "Reusable components",
      "Solution templates",
      "CI/CD and MLOps pipelines",
    ],
    icon: "factory" as const,
    sculpture: "factory" as const,
  },
  {
    title: "Platform components",
    description:
      "Shared services that accelerate builders and protect the business.",
    items: [
      "Data platform & feature store",
      "Model registry & serving",
      "Prompt & model hub",
      "Observability & monitoring",
    ],
    icon: "blocks" as const,
    sculpture: "platform" as const,
  },
  {
    title: "Talent model",
    description:
      "Right roles, skills and enablement to build and scale AI.",
    items: [
      "Roles and career paths",
      "Skills and certifications",
      "Communities of practice",
      "Learning and enablement",
    ],
    icon: "talent" as const,
    sculpture: "talent" as const,
  },
  {
    title: "Value measurement",
    description:
      "Outcome-focused measurement that proves and improves value.",
    items: [
      "Value metrics & KPIs",
      "Adoption & usage",
      "Impact tracking",
      "ROI and benefit realisation",
    ],
    icon: "value" as const,
    sculpture: "value" as const,
  },
];

export const maturity = [
  {
    name: "Experimental",
    description: "Ad-hoc efforts, limited governance and reuse.",
    icon: "idea" as const,
  },
  {
    name: "Emerging",
    description: "Initial CoE formed, standards and first platforms.",
    icon: "governance" as const,
  },
  {
    name: "Established",
    description: "Repeatable delivery, strong governance and reuse.",
    icon: "people" as const,
  },
  {
    name: "Scaled",
    description: "Enterprise-wide adoption, measurable impact.",
    icon: "scale" as const,
  },
  {
    name: "Optimised",
    description: "Continuous optimisation, autonomous improvement.",
    icon: "blocks" as const,
  },
];

export const roadmap = [
  {
    name: "Assess",
    description: "Evaluate current state, opportunities and risks.",
    icon: "assess" as const,
  },
  {
    name: "Design",
    description: "Define target operating model and priorities.",
    icon: "design" as const,
  },
  {
    name: "Mobilise",
    description: "Stand up the CoE, teams, platforms and guardrails.",
    icon: "people" as const,
  },
  {
    name: "Industrialise",
    description: "Deliver at scale with reusable assets and MLOps.",
    icon: "factory" as const,
  },
  {
    name: "Scale",
    description: "Expand adoption and compound business value.",
    icon: "scale" as const,
  },
];

export const faqItems = [
  {
    question: "What is an AI Centre of Excellence?",
    answer:
      "A cross-functional operating capability that sets direction, governs investment, provides shared platforms and accelerates measurable AI delivery.",
  },
  {
    question: "How is the CoE different from a data or analytics team?",
    answer:
      "A data team delivers analysis. The CoE establishes the enterprise-wide operating system — strategy, governance, portfolio, platforms, talent, delivery and value management — that helps many teams deliver AI consistently.",
  },
  {
    question: "How do you measure CoE success?",
    answer:
      "Through adoption, realised business value, time-to-production, reuse, control effectiveness, model performance, delivery quality and portfolio health.",
  },
  {
    question: "What is the typical time to see value?",
    answer:
      "A focused first wave can establish governance and deliver priority use cases in 8-16 weeks. Enterprise capability matures through successive delivery waves.",
  },
  {
    question: "Who should lead the AI CoE?",
    answer:
      "An accountable enterprise leader with authority across strategy, data, technology, risk and business operations, supported by a cross-functional steering body.",
  },
] as const;
