import type { Industry, IndustryCapabilityItem } from "@/types";

const governmentRelevant: IndustryCapabilityItem[] = [
  { title: "Data Unification & Entity Resolution", icon: "unification" },
  { title: "Intelligent Automation & Orchestration", icon: "automation" },
  { title: "AI/ML for Insight & Prediction", icon: "insight" },
  { title: "Document AI & Knowledge Graphs", icon: "document" },
  { title: "Geospatial Intelligence & Planning", icon: "geospatial" },
  { title: "Natural Language Interfaces", icon: "language" },
  { title: "Fraud, Risk & Anomaly Detection", icon: "fraud" },
  { title: "Monitoring & Impact Analytics", icon: "monitoring" },
  { title: "Interoperability & Open Ecosystems", icon: "interop" },
];

export const industries: Industry[] = [
  {
    id: "ind-government",
    slug: "government",
    name: "Government and Public Sector",
    summary:
      "Decision-intelligence, programme monitoring and responsible AI systems that strengthen public service delivery while remaining auditable and accountable.",
    challenges: [
      "Siloed data and fragmented systems: limit a unified view of citizens and programs.",
      "Manual, paper-heavy workflows: slow service delivery and increase leakage.",
      "Limited real-time visibility: into program performance and ground realities.",
      "Compliance, transparency and auditability: across multiple regulations.",
      "Digital adoption gaps: across geographies and stakeholder groups.",
    ],
    opportunities: [
      "Smart service delivery: Improve last-mile reach and experience",
      "Resource optimisation: Allocate funds and assets where impact is highest",
      "Data-driven policy: Track trends and course-correct with evidence",
      "Trust & accountability: Build transparency across programs and spending",
    ],
    capabilities: [
      "strategy",
      "data",
      "generative-ai",
      "agentic-ai",
      "governance",
      "product-engineering",
      "ai-coe",
      "managed-services",
    ],
    relevantCapabilities: governmentRelevant,
    products: [
      "wcd-intelligence",
      "ai-governance-command-centre",
      "enterprise-decision-intelligence",
      "document-intelligence-copilot",
    ],
    productCards: [
      {
        slug: "wcd-intelligence",
        title: "Women & Child Development Intelligence",
        description:
          "Data-driven programs that enable targeted interventions and measurable impact.",
      },
      {
        slug: "ai-governance-command-centre",
        title: "AI Governance Command Centre",
        description:
          "Real-time visibility, policy enforcement and risk oversight at enterprise scale.",
      },
      {
        slug: "enterprise-decision-intelligence",
        title: "Enterprise Decision Intelligence",
        description:
          "Unify data, models and context to deliver smarter decisions and better outcomes.",
      },
      {
        slug: "document-intelligence-copilot",
        title: "Document Intelligence Copilot",
        description:
          "Extract, classify and summarize unstructured documents with speed and accuracy.",
      },
    ],
    workflows: [
      {
        title: "Intake & Registration",
        description: "Capture requests across channels and touchpoints.",
      },
      {
        title: "Verification & Eligibility",
        description: "Validate identity, documents and entitlements.",
      },
      {
        title: "Case Processing & Orchestration",
        description: "Route cases, trigger tasks and manage approvals.",
      },
      {
        title: "Service Delivery",
        description: "Disburse benefits or services and communicate.",
      },
      {
        title: "Monitoring & Analytics",
        description:
          "Track outcomes, detect anomalies and measure program impact.",
      },
      {
        title: "Feedback & Continuous Improvement",
        description: "Incorporate feedback and refine programs continuously.",
      },
    ],
    governance: [
      "Policy & legal compliance: Align with applicable laws, rules and policy frameworks.",
      "Data privacy & security: Protect citizen data with privacy-by-design controls and encryption.",
      "Ethics & fairness: Ensure unbiased outcomes and inclusive access.",
      "Transparency & explainability: Make decisions traceable and explainable to stakeholders.",
      "Auditability & accountability: Maintain end-to-end audit trails and role-based accountability.",
    ],
    outcomes: [
      "Improved service reach and citizen experience",
      "Higher program efficiency and lower leakage",
      "Better targeting and allocation of resources",
      "Real-time visibility and faster decisions",
      "Stronger trust, compliance and accountability",
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
    relevantCapabilities: [
      { title: "Risk Data Unification", icon: "unification" },
      { title: "Exception Orchestration", icon: "automation" },
      { title: "Credit & Risk Prediction", icon: "insight" },
      { title: "Document AI & Evidence Graphs", icon: "document" },
      { title: "Regulatory Intelligence", icon: "geospatial" },
      { title: "Analyst Assistants", icon: "language" },
      { title: "Fraud & Anomaly Detection", icon: "fraud" },
      { title: "Assurance Analytics", icon: "monitoring" },
      { title: "Control Interoperability", icon: "interop" },
    ],
    products: [
      "onetouch-audit",
      "ai-governance-command-centre",
      "document-intelligence-copilot",
      "enterprise-decision-intelligence",
    ],
    workflows: [
      {
        title: "Exception Intake",
        description: "Capture findings across engagements, systems and reviews.",
      },
      {
        title: "Evidence Verification",
        description: "Link documents and validate the control trail.",
      },
      {
        title: "Case Orchestration",
        description: "Prioritise exceptions and assign remediation owners.",
      },
      {
        title: "Remediation Delivery",
        description: "Close findings with reviewed actions and evidence packs.",
      },
      {
        title: "Monitoring & Analytics",
        description: "Track overdue items, risk concentration and cycle time.",
      },
      {
        title: "Feedback & Improvement",
        description: "Feed closure patterns back into control design.",
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
    relevantCapabilities: [
      { title: "Talent Data Unification", icon: "unification" },
      { title: "Hiring Workflow Orchestration", icon: "automation" },
      { title: "Fit Scoring & Prediction", icon: "insight" },
      { title: "CV & Document Intelligence", icon: "document" },
      { title: "Workforce Planning", icon: "geospatial" },
      { title: "Recruiter Assistants", icon: "language" },
      { title: "Fairness & Bias Detection", icon: "fraud" },
      { title: "Funnel Analytics", icon: "monitoring" },
      { title: "ATS Interoperability", icon: "interop" },
    ],
    products: ["smart-hiring", "document-intelligence-copilot", "ai-governance-command-centre"],
    workflows: [
      {
        title: "Role Intake",
        description: "Capture role criteria and hiring requirements.",
      },
      {
        title: "Candidate Verification",
        description: "Check attributes, consent and eligibility evidence.",
      },
      {
        title: "Matching & Shortlist",
        description: "Score fit and present explainable shortlists.",
      },
      {
        title: "Interview Support",
        description: "Assist panels while humans keep the decision.",
      },
      {
        title: "Funnel Analytics",
        description: "Track conversion, time-to-decision and quality.",
      },
      {
        title: "Feedback & Improvement",
        description: "Refine criteria and process from hiring outcomes.",
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
    relevantCapabilities: [
      { title: "Beneficiary Data Unification", icon: "unification" },
      { title: "Intervention Orchestration", icon: "automation" },
      { title: "Risk Prediction", icon: "insight" },
      { title: "Case Document Intelligence", icon: "document" },
      { title: "Geospatial Coverage Planning", icon: "geospatial" },
      { title: "Programme Assistants", icon: "language" },
      { title: "Leakage & Anomaly Detection", icon: "fraud" },
      { title: "Impact Analytics", icon: "monitoring" },
      { title: "Scheme Interoperability", icon: "interop" },
    ],
    products: [
      "wcd-intelligence",
      "enterprise-decision-intelligence",
      "ai-governance-command-centre",
    ],
    workflows: [
      {
        title: "Indicator Intake",
        description: "Capture approved programme and field indicators.",
      },
      {
        title: "Risk Verification",
        description: "Validate signals against coverage and quality rules.",
      },
      {
        title: "Intervention Orchestration",
        description: "Route priority cases to owners and review forums.",
      },
      {
        title: "Programme Delivery",
        description: "Support coordinated field and administrative action.",
      },
      {
        title: "Monitoring & Analytics",
        description: "Track outcomes, outliers and intervention progress.",
      },
      {
        title: "Feedback & Improvement",
        description: "Feed results back into targeting and briefing cycles.",
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
    relevantCapabilities: [
      { title: "Student Data Unification", icon: "unification" },
      { title: "Service Orchestration", icon: "automation" },
      { title: "Progression Prediction", icon: "insight" },
      { title: "Policy Document Intelligence", icon: "document" },
      { title: "Campus Planning", icon: "geospatial" },
      { title: "Staff & Student Assistants", icon: "language" },
      { title: "Integrity Monitoring", icon: "fraud" },
      { title: "Outcomes Analytics", icon: "monitoring" },
      { title: "Systems Interoperability", icon: "interop" },
    ],
    products: [
      "enterprise-decision-intelligence",
      "document-intelligence-copilot",
      "ai-governance-command-centre",
    ],
    workflows: [
      {
        title: "Request Intake",
        description: "Capture academic, service and policy requests.",
      },
      {
        title: "Source Verification",
        description: "Ground answers in approved handbooks and circulars.",
      },
      {
        title: "Operations Orchestration",
        description: "Route follow-up to academic and service owners.",
      },
      {
        title: "Service Delivery",
        description: "Complete staff and learner support with citations.",
      },
      {
        title: "Monitoring & Analytics",
        description: "Track enrolment, capacity and service quality.",
      },
      {
        title: "Feedback & Improvement",
        description: "Refine institutional knowledge from recurring questions.",
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
    relevantCapabilities: [
      { title: "Plant Data Unification", icon: "unification" },
      { title: "Exception Orchestration", icon: "automation" },
      { title: "Quality Prediction", icon: "insight" },
      { title: "SOP Document Intelligence", icon: "document" },
      { title: "Site & Line Planning", icon: "geospatial" },
      { title: "Operator Assistants", icon: "language" },
      { title: "Defect & Anomaly Detection", icon: "fraud" },
      { title: "Throughput Analytics", icon: "monitoring" },
      { title: "MES/ERP Interoperability", icon: "interop" },
    ],
    products: [
      "enterprise-decision-intelligence",
      "document-intelligence-copilot",
      "onetouch-audit",
      "ai-governance-command-centre",
    ],
    workflows: [
      {
        title: "Signal Intake",
        description: "Capture plant, quality and supply exceptions.",
      },
      {
        title: "Exception Verification",
        description: "Confirm signals against SOP and quality records.",
      },
      {
        title: "Investigation Orchestration",
        description: "Assign ownership and coordinate closure tasks.",
      },
      {
        title: "Corrective Delivery",
        description: "Complete approved actions with procedure evidence.",
      },
      {
        title: "Monitoring & Analytics",
        description: "Track throughput, quality and recurring exceptions.",
      },
      {
        title: "Feedback & Improvement",
        description: "Feed findings back into operating procedures.",
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
    relevantCapabilities: [
      { title: "Function Data Unification", icon: "unification" },
      { title: "Intake Orchestration", icon: "automation" },
      { title: "Value & Risk Scoring", icon: "insight" },
      { title: "Knowledge Graphs", icon: "document" },
      { title: "Portfolio Planning", icon: "geospatial" },
      { title: "Shared-services Assistants", icon: "language" },
      { title: "Control Monitoring", icon: "fraud" },
      { title: "Operating Analytics", icon: "monitoring" },
      { title: "Platform Interoperability", icon: "interop" },
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
        title: "Intake & Prioritisation",
        description: "Capture proposed use cases and score value and risk.",
      },
      {
        title: "Governance Review",
        description: "Route them through CoE and control checkpoints.",
      },
      {
        title: "Delivery Orchestration",
        description: "Coordinate build tasks, owners and stage gates.",
      },
      {
        title: "Service Delivery",
        description: "Release the governed capability to operating teams.",
      },
      {
        title: "Monitoring & Analytics",
        description: "Track adoption, control evidence and operating impact.",
      },
      {
        title: "Feedback & Improvement",
        description: "Feed outcomes back into intake and reuse standards.",
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
