import type { Industry } from "@/types";

export const industries: Industry[] = [
  {
    id: "ind-government",
    slug: "government",
    name: "Government and Public Sector",
    summary:
      "Decision-intelligence, programme monitoring and responsible AI systems that strengthen public service delivery while remaining auditable and accountable.",
    challenges: [
      "Fragmented programme data across departments, schemes and districts limits timely oversight.",
      "Policy decisions often rely on delayed reports rather than continuous indicator monitoring.",
      "Citizen-facing services need automation without weakening transparency or due process.",
      "AI initiatives stall without clear ownership, procurement pathways and risk controls.",
    ],
    opportunities: [
      "Unify administrative and scheme data into governed decision-intelligence platforms.",
      "Detect emerging service gaps and intervention priorities earlier in the delivery cycle.",
      "Equip leadership with explainable dashboards linked to accountable operating workflows.",
      "Establish department-level AI CoE and governance patterns that scale across programmes.",
    ],
    capabilities: [
      "strategy",
      "ai-coe",
      "governance",
      "data",
      "generative-ai",
      "product-engineering",
    ],
    products: [
      "wcd-intelligence",
      "ai-governance-command-centre",
      "enterprise-decision-intelligence",
      "document-intelligence-copilot",
    ],
    workflows: [
      {
        title: "Programme indicator intelligence",
        description:
          "Ingest scheme and administrative data, validate indicator quality, surface risk signals and route exceptions to designated programme owners.",
      },
      {
        title: "Policy briefing support",
        description:
          "Assemble governed evidence packs from approved data sources so leadership can review options with clear assumptions and audit trails.",
      },
      {
        title: "Citizen service knowledge assistance",
        description:
          "Provide staff with retrieval-grounded answers from official circulars and process manuals, with human review for sensitive actions.",
      },
    ],
    governance: [
      "Public-purpose use-case classification and proportionate oversight.",
      "Data minimisation, access control and retention aligned to government policy.",
      "Explainability for decisions that affect citizens or programme entitlements.",
      "Human accountability for exceptions, escalations and final determinations.",
    ],
    outcomes: [
      "Clearer visibility of programme performance across geographies and schemes.",
      "Faster, better-supported leadership decisions with governed evidence.",
      "Stronger coordination between analytics teams, programme owners and IT.",
      "A reusable pattern for responsible AI adoption across departments.",
    ],
  },
  {
    id: "ind-banking",
    slug: "banking",
    name: "Banking and Financial Services",
    summary:
      "Governed AI for risk, assurance, customer operations and decision support in regulated financial environments.",
    challenges: [
      "Risk, audit and operations teams work from disconnected evidence and reporting systems.",
      "Manual review of documents and exceptions slows assurance and remediation cycles.",
      "Model and GenAI use expands faster than inventory, approval and monitoring discipline.",
      "Regulators and boards expect explainability, control evidence and clear accountability.",
    ],
    opportunities: [
      "Create command centres that unify risk signals, evidence and remediation workflows.",
      "Apply document intelligence to accelerate controlled review without losing oversight.",
      "Stand up AI governance that covers traditional models and generative use cases together.",
      "Improve operating decisions with analytics that are audit-ready by design.",
    ],
    capabilities: [
      "strategy",
      "governance",
      "generative-ai",
      "agentic-ai",
      "data",
      "managed-services",
    ],
    products: [
      "onetouch-audit",
      "ai-governance-command-centre",
      "document-intelligence-copilot",
      "enterprise-decision-intelligence",
    ],
    workflows: [
      {
        title: "Assurance exception management",
        description:
          "Capture findings, link supporting evidence, prioritise exceptions and track remediation ownership through to closure.",
      },
      {
        title: "Controlled document review",
        description:
          "Extract and summarise relevant clauses from policies, contracts and working papers for analyst validation before action.",
      },
      {
        title: "AI use-case lifecycle control",
        description:
          "Inventory proposed AI systems, classify risk, route approvals and monitor production status with governance reporting.",
      },
    ],
    governance: [
      "Risk-tiered approval for customer-impacting and model-assisted decisions.",
      "Evidence retention suitable for internal audit and regulatory review.",
      "Separation of duties between builders, operators and control owners.",
      "Continuous monitoring for drift, misuse and control failures.",
    ],
    outcomes: [
      "Improved visibility of assurance status and remediation progress.",
      "More consistent control evidence for audit and compliance reviews.",
      "Safer scaling of AI use cases under a common governance operating model.",
      "Reduced reliance on ad hoc spreadsheets for critical oversight work.",
    ],
  },
  {
    id: "ind-hr",
    slug: "hr",
    name: "Human Resources",
    summary:
      "Talent intelligence and workforce decision support that improve hiring quality while remaining fair, explainable and privacy-aware.",
    challenges: [
      "High applicant volumes make consistent, evidence-based shortlisting difficult.",
      "Hiring decisions lack transparent rationales that talent and compliance teams can review.",
      "Workforce data is scattered across ATS, assessment and HRIS systems.",
      "Bias, privacy and consent risks rise when AI enters recruitment without controls.",
    ],
    opportunities: [
      "Match candidates to role requirements with explainable scoring and human override.",
      "Give recruiters interview and assessment intelligence grounded in structured criteria.",
      "Create hiring analytics that reveal funnel quality and process bottlenecks.",
      "Embed responsible AI checks into talent workflows from the start.",
    ],
    capabilities: [
      "strategy",
      "governance",
      "generative-ai",
      "data",
      "product-engineering",
    ],
    products: ["smart-hiring", "document-intelligence-copilot", "ai-governance-command-centre"],
    workflows: [
      {
        title: "Role-aligned candidate matching",
        description:
          "Parse role criteria, score candidate fit against structured attributes and present explainable shortlists for recruiter review.",
      },
      {
        title: "Interview intelligence support",
        description:
          "Assist interview panels with competency-linked prompts and structured note capture while keeping final decisions with humans.",
      },
      {
        title: "Hiring funnel analytics",
        description:
          "Monitor stage conversion, time-to-decision and quality indicators so talent leaders can improve process design.",
      },
    ],
    governance: [
      "Fairness review, adverse-impact monitoring and human-in-the-loop selection.",
      "Candidate data minimisation, retention limits and access controls.",
      "Transparent rationale available to authorised talent and compliance users.",
      "Clear policy on where AI may advise and where humans must decide.",
    ],
    outcomes: [
      "More consistent shortlisting against role criteria.",
      "Better visibility of hiring funnel health for talent leadership.",
      "Stronger confidence that AI-assisted hiring remains reviewable and fair.",
      "Reduced administrative burden without removing human accountability.",
    ],
  },
  {
    id: "ind-healthcare-social",
    slug: "healthcare-social",
    name: "Healthcare and Social Development",
    summary:
      "Programme and beneficiary intelligence that helps social-development and health systems prioritise interventions responsibly.",
    challenges: [
      "Outcome indicators arrive late and are hard to compare across districts and schemes.",
      "Frontline and programme teams lack a shared view of risk and intervention status.",
      "Sensitive beneficiary data requires strict privacy and purpose limitation.",
      "Siloed systems make coordinated case and programme action difficult.",
    ],
    opportunities: [
      "Build decision-intelligence platforms for scheme performance and early risk detection.",
      "Support district and state leadership with governed dashboards and exception workflows.",
      "Improve intervention planning through clearer indicator and coverage insights.",
      "Pair analytics with responsible AI controls suited to vulnerable populations.",
    ],
    capabilities: [
      "strategy",
      "governance",
      "data",
      "generative-ai",
      "product-engineering",
      "ai-coe",
    ],
    products: [
      "wcd-intelligence",
      "enterprise-decision-intelligence",
      "ai-governance-command-centre",
    ],
    workflows: [
      {
        title: "District performance monitoring",
        description:
          "Consolidate approved indicators, highlight outliers and support review meetings with consistent, governed views.",
      },
      {
        title: "Intervention prioritisation",
        description:
          "Combine risk signals and coverage gaps so programme teams can focus field action where it is most needed.",
      },
      {
        title: "Evidence-backed programme briefing",
        description:
          "Generate structured briefings from validated data for leadership, with source lineage and review checkpoints.",
      },
    ],
    governance: [
      "Heightened privacy, consent and purpose limitation for beneficiary data.",
      "Risk classification for any automated ranking or alert that affects services.",
      "Human review before actions that influence entitlements or case handling.",
      "Transparent methodology notes for indicators used in public decision settings.",
    ],
    outcomes: [
      "Shared situational awareness across programme and administrative layers.",
      "Earlier identification of districts and schemes needing attention.",
      "More structured intervention planning grounded in governed data.",
      "Stronger trust that analytics respect privacy and public accountability.",
    ],
  },
  {
    id: "ind-education",
    slug: "education",
    name: "Education",
    summary:
      "Institutional intelligence and knowledge systems that support academic operations, learner services and administrative decisions.",
    challenges: [
      "Student, faculty and operations data rarely present a unified decision view.",
      "Administrative staff spend significant time searching policy and process knowledge.",
      "Leadership needs earlier signals on enrolment, progression and service quality.",
      "AI tools appear in teaching and administration without institutional governance.",
    ],
    opportunities: [
      "Create decision dashboards for academic and operational leadership.",
      "Deploy governed knowledge assistants for staff and student services teams.",
      "Improve planning with analytics that connect enrolment, capacity and outcomes.",
      "Establish institutional AI guidelines and CoE practices for responsible adoption.",
    ],
    capabilities: [
      "strategy",
      "ai-coe",
      "governance",
      "generative-ai",
      "data",
      "product-engineering",
    ],
    products: [
      "enterprise-decision-intelligence",
      "document-intelligence-copilot",
      "ai-governance-command-centre",
    ],
    workflows: [
      {
        title: "Academic operations intelligence",
        description:
          "Bring enrolment, capacity and service indicators into leadership dashboards with clear ownership for follow-up.",
      },
      {
        title: "Policy and process assistance",
        description:
          "Help staff retrieve answers from approved handbooks and circulars, with citations and escalation paths for exceptions.",
      },
    ],
    governance: [
      "Student data protection and role-based access for analytical systems.",
      "Institutional review of AI tools used in teaching, assessment or counselling.",
      "Citation and source grounding for knowledge assistants.",
      "Clear boundaries between advisory AI and academic or administrative decisions.",
    ],
    outcomes: [
      "Improved leadership visibility into academic and service operations.",
      "Faster access to authorised institutional knowledge for staff.",
      "A practical foundation for responsible AI use across the institution.",
      "Better coordination between IT, academic leadership and student services.",
    ],
  },
  {
    id: "ind-manufacturing",
    slug: "manufacturing",
    name: "Manufacturing",
    summary:
      "Operational intelligence and document-aware AI that improve plant, quality and supply decisions under clear human control.",
    challenges: [
      "Plant, quality and supply data remain fragmented across MES, ERP and local tools.",
      "Exception handling depends on tribal knowledge and delayed escalation.",
      "Document-heavy quality and compliance processes slow response times.",
      "AI pilots rarely connect to shop-floor ownership and operating procedures.",
    ],
    opportunities: [
      "Surface operational exceptions with decision dashboards linked to accountable roles.",
      "Use document intelligence for SOPs, quality records and supplier documentation.",
      "Support planners with analytics that connect throughput, quality and inventory signals.",
      "Introduce agentic workflows only where steps, approvals and audit trails are explicit.",
    ],
    capabilities: [
      "strategy",
      "data",
      "agentic-ai",
      "generative-ai",
      "product-engineering",
      "managed-services",
    ],
    products: [
      "enterprise-decision-intelligence",
      "document-intelligence-copilot",
      "onetouch-audit",
      "ai-governance-command-centre",
    ],
    workflows: [
      {
        title: "Operations exception command view",
        description:
          "Aggregate plant and quality signals, prioritise exceptions and assign ownership for investigation and closure.",
      },
      {
        title: "Controlled SOP and quality retrieval",
        description:
          "Enable authorised staff to retrieve procedure and quality documentation with citations for operational use.",
      },
      {
        title: "Supplier and compliance evidence support",
        description:
          "Assist assurance teams in assembling document evidence packs for audits and corrective-action reviews.",
      },
    ],
    governance: [
      "Safety-critical actions remain human-approved and procedure-bound.",
      "Operational AI systems require change control and monitoring.",
      "Access to proprietary process data is segmented by role and plant context.",
      "Agentic automations only run within pre-approved task boundaries.",
    ],
    outcomes: [
      "Faster identification and ownership of operational exceptions.",
      "Better use of existing plant and quality data for leadership decisions.",
      "Reduced time spent searching critical operating documentation.",
      "Clearer path from pilot AI use cases to governed production workflows.",
    ],
  },
  {
    id: "ind-enterprise",
    slug: "enterprise",
    name: "Enterprise Functions",
    summary:
      "Cross-functional AI for audit, finance, risk, legal and shared services — designed for control, reuse and measurable operating impact.",
    challenges: [
      "Enterprise functions run parallel AI experiments without a shared operating model.",
      "Knowledge work is slowed by document overload and inconsistent process guidance.",
      "Assurance and finance teams need better evidence visibility without more manual effort.",
      "Boards expect AI governance that spans the whole enterprise, not isolated projects.",
    ],
    opportunities: [
      "Establish an AI CoE that standardises intake, prioritisation and reuse.",
      "Deploy governance command centres for inventory, risk and lifecycle oversight.",
      "Modernise audit, assurance and knowledge workflows with explainable AI support.",
      "Create enterprise decision dashboards that connect function metrics to action.",
    ],
    capabilities: [
      "strategy",
      "ai-coe",
      "governance",
      "generative-ai",
      "agentic-ai",
      "data",
      "product-engineering",
      "managed-services",
    ],
    products: [
      "ai-governance-command-centre",
      "onetouch-audit",
      "document-intelligence-copilot",
      "enterprise-decision-intelligence",
      "smart-hiring",
    ],
    workflows: [
      {
        title: "Enterprise AI intake and prioritisation",
        description:
          "Capture proposed use cases, score value and risk, and route them through CoE and governance checkpoints before build.",
      },
      {
        title: "Assurance and control evidence flow",
        description:
          "Link findings, documents and remediation tasks so audit and risk teams work from a single governed command view.",
      },
      {
        title: "Shared-services knowledge assistance",
        description:
          "Support finance, legal and HR operations with retrieval-grounded answers from approved enterprise knowledge bases.",
      },
    ],
    governance: [
      "Enterprise-wide AI inventory and risk classification.",
      "Standard approval gates for high-impact and customer-facing systems.",
      "Shared evaluation, monitoring and incident-response practices.",
      "Clear accountability between CoE, function owners and technology teams.",
    ],
    outcomes: [
      "A coherent enterprise pathway from AI idea to governed delivery.",
      "Improved control visibility for audit, risk and leadership stakeholders.",
      "Reusable platforms that reduce one-off tool sprawl across functions.",
      "Stronger board confidence through evidence-based AI oversight.",
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
