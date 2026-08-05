import type { Product } from "@/types";

export const productTypeFilters = [
  "All",
  "AI Products",
  "Enterprise Solutions",
  "Government Solutions",
  "Social Impact",
  "Governance",
  "Analytics",
  "Agentic AI",
  "Proofs of Concept",
] as const;

export const industryFilters = [
  "Government",
  "Human Resources",
  "Finance",
  "Audit and Compliance",
  "Healthcare",
  "Social Development",
  "Education",
  "Manufacturing",
  "Enterprise Operations",
] as const;

export const technologyFilters = [
  "Generative AI",
  "Agentic AI",
  "Machine Learning",
  "NLP",
  "Computer Vision",
  "Data Analytics",
  "Dashboards",
  "Document Intelligence",
  "Knowledge Graphs",
] as const;

export const products: Product[] = [
  {
    id: "smart-hiring",
    name: "Smart Hiring System",
    slug: "smart-hiring",
    category: "AI Products",
    industries: ["Human Resources"],
    technologies: ["Machine Learning", "NLP", "Dashboards"],
    shortDescription:
      "AI-powered recruitment intelligence for candidate matching, assessments, interview intelligence, hiring analytics and explainable selection support.",
    valueProposition:
      "Give talent leaders a governed hiring system that improves match quality, shortens decision cycles and keeps every shortlist recommendation explainable to hiring managers and auditors.",
    businessProblem:
      "High-volume recruitment teams struggle with inconsistent screening, fragmented assessment evidence and limited visibility into why candidates advance. Manual shortlisting creates delay, bias risk and weak audit trails across roles and business units.",
    solutionOverview:
      "Smart Hiring System unifies requisition intake, candidate matching, structured assessments, interview intelligence and hiring analytics into one decision workflow. Models surface ranked shortlists with transparent rationale, while recruiters and hiring managers retain control over selection, exceptions and final offers.",
    targetUsers: [
      "CHRO and talent leadership",
      "Recruitment operations leads",
      "Hiring managers",
      "HR analytics and people-science teams",
      "Internal audit and HR compliance stakeholders",
    ],
    modules: [
      {
        title: "Requisition and role intelligence",
        description:
          "Capture role requirements, competencies and success criteria so matching and assessment stay aligned to the business need.",
      },
      {
        title: "Candidate matching and shortlisting",
        description:
          "Rank applicants against role signals with explainable match factors recruiters can review, override and document.",
      },
      {
        title: "Assessments and interview intelligence",
        description:
          "Structure evaluation evidence from assessments and interviews so selection decisions rest on comparable, reviewable inputs.",
      },
      {
        title: "Hiring analytics and pipeline visibility",
        description:
          "Monitor funnel health, stage conversion and decision patterns across roles, teams and hiring programmes.",
      },
      {
        title: "Explainable selection support",
        description:
          "Present rationale, evidence trails and exception notes so shortlists and recommendations can withstand leadership and audit review.",
      },
    ],
    capabilities: [
      "Explainable shortlisting",
      "Structured assessments",
      "Interview intelligence",
      "Hiring funnel analytics",
      "Governed selection workflows",
    ],
    workflow: [
      {
        title: "Define the role",
        description:
          "Hiring managers and talent partners capture competencies, must-have criteria and evaluation weights for the requisition.",
      },
      {
        title: "Ingest and enrich candidates",
        description:
          "Applications and profiles are normalised, scored against role signals and prepared for review with match evidence.",
      },
      {
        title: "Assess and interview",
        description:
          "Structured assessments and interview notes feed a consistent evaluation record across candidates.",
      },
      {
        title: "Review recommended shortlists",
        description:
          "Recruiters examine ranked recommendations, rationale and exceptions before advancing candidates.",
      },
      {
        title: "Decide with accountability",
        description:
          "Hiring managers confirm selections with documented overrides, ensuring a clear trail from shortlist to offer.",
      },
      {
        title: "Monitor and improve",
        description:
          "Analytics teams track pipeline outcomes and refine criteria, prompts and evaluation models under governance.",
      },
    ],
    dataSources: [
      "Applicant tracking system records",
      "Job descriptions and competency frameworks",
      "Assessment and interview feedback",
      "Workforce and organisational hierarchy data",
      "Policy and compliance reference material",
    ],
    aiCapabilities: [
      "NLP-based profile and JD matching",
      "Machine learning ranking for shortlists",
      "Interview and assessment signal summarisation",
      "Explainability overlays for selection factors",
      "Anomaly detection for pipeline irregularities",
    ],
    governance: [
      "Human-in-the-loop shortlist and offer decisions",
      "Bias and fairness review checkpoints",
      "Evidence retention for selection rationale",
      "Role-based access for candidate and assessment data",
      "Model and criteria change control",
    ],
    architecture: [
      "Secure integration layer to ATS and HR systems",
      "Matching and ranking services with evaluation stores",
      "Explainability and evidence services",
      "Analytics and dashboard layer for talent leaders",
      "Audit logging and access control plane",
    ],
    deploymentOptions: [
      "Private cloud or VPC deployment",
      "Hybrid integration with existing ATS platforms",
      "Demonstration and pilot environments for controlled evaluation",
    ],
    outcomes: [
      "More consistent, evidence-backed shortlists across roles and business units",
      "Clearer accountability for overrides and final hiring decisions",
      "Stronger audit readiness for selection rationale and process integrity",
      "Improved visibility into hiring pipeline health for talent leadership",
    ],
    featured: true,
    status: "Available for demonstration",
    relatedCapabilities: [
      "ai-strategy",
      "responsible-ai",
      "data-platforms",
      "mlops",
    ],
  },
  {
    id: "wcd-intelligence",
    name: "Women and Child Development Intelligence Platform",
    slug: "wcd-intelligence",
    category: "Government Solutions",
    industries: ["Government", "Social Development"],
    technologies: ["Data Analytics", "Dashboards", "Machine Learning"],
    shortDescription:
      "State, district and programme decision-intelligence for social-development data, indicators, risk detection and interventions.",
    valueProposition:
      "Equip government and programme leadership with a single intelligence layer that turns fragmented social-development data into timely indicators, risk signals and intervention priorities.",
    businessProblem:
      "Women and child development programmes often operate across siloed MIS feeds, delayed field reporting and inconsistent district indicators. Leadership lacks a shared view of coverage, risk and intervention effectiveness, which slows response and weakens accountability.",
    solutionOverview:
      "The platform consolidates programme, administrative and field data into decision dashboards for state and district leadership. Machine learning and analytics surface indicator trends, risk clusters and intervention opportunities, while workflows keep ownership, escalation and follow-through clear.",
    targetUsers: [
      "State and district programme administrators",
      "Social development and WCD department leadership",
      "Monitoring and evaluation teams",
      "Field programme coordinators",
      "Planning and policy units",
    ],
    modules: [
      {
        title: "Programme and indicator cockpit",
        description:
          "Present coverage, outcome and service indicators across schemes, geographies and time periods in one governed view.",
      },
      {
        title: "Risk detection and early warning",
        description:
          "Highlight districts, facilities or cohorts showing deteriorating indicators or emerging service gaps.",
      },
      {
        title: "Intervention planning support",
        description:
          "Connect risk signals to recommended intervention pathways, owners and follow-up checkpoints.",
      },
      {
        title: "Field-to-leadership reporting",
        description:
          "Reduce reporting lag by consolidating field inputs into review-ready summaries for administrative cycles.",
      },
      {
        title: "Accountability and review packs",
        description:
          "Generate structured review materials for governance meetings, reviews and programme steering forums.",
      },
    ],
    capabilities: [
      "Multi-level indicator intelligence",
      "Risk and early-warning analytics",
      "Intervention prioritisation",
      "District and programme dashboards",
      "Review-ready reporting packs",
    ],
    workflow: [
      {
        title: "Integrate programme data",
        description:
          "Connect MIS, administrative registers and approved field reporting sources under defined data contracts.",
      },
      {
        title: "Validate and harmonise indicators",
        description:
          "Normalise metrics across schemes and geographies so leaders compare like-for-like performance.",
      },
      {
        title: "Detect risk and variation",
        description:
          "Analytics highlight outlier districts, declining indicators and service coverage gaps for attention.",
      },
      {
        title: "Prioritise interventions",
        description:
          "Programme teams review recommended focus areas and assign owners with clear follow-up actions.",
      },
      {
        title: "Track progress in reviews",
        description:
          "Leadership monitors intervention status, indicator movement and unresolved escalations in recurring reviews.",
      },
    ],
    dataSources: [
      "Scheme and programme MIS systems",
      "Administrative and facility registers",
      "Approved field reporting channels",
      "Demographic and geographic reference data",
      "Historical indicator and review archives",
    ],
    aiCapabilities: [
      "Indicator trend and anomaly detection",
      "Risk clustering across districts and cohorts",
      "Prioritisation models for intervention focus",
      "Narrative summarisation for review packs",
      "Data quality and completeness alerts",
    ],
    governance: [
      "Role-based views for state, district and programme roles",
      "Approved indicator definitions and change control",
      "Data privacy controls for sensitive beneficiary information",
      "Human ownership of intervention decisions",
      "Audit trails for escalations and review outcomes",
    ],
    architecture: [
      "Secure data ingestion and harmonisation layer",
      "Indicator and analytics services",
      "Risk and prioritisation models",
      "Decision dashboards for multi-level leadership",
      "Workflow and review-pack generation services",
    ],
    deploymentOptions: [
      "Government cloud or dedicated secure infrastructure",
      "On-premises or air-gapped variants where mandated",
      "Demonstration environments with synthetic or approved sample data",
    ],
    outcomes: [
      "Shared, timely visibility of programme indicators across leadership levels",
      "Faster identification of districts and cohorts requiring intervention",
      "Clearer ownership of follow-up actions from risk signal to review",
      "Stronger evidence base for planning, monitoring and accountability forums",
    ],
    featured: true,
    status: "Available for demonstration",
    relatedCapabilities: [
      "government-ai",
      "data-platforms",
      "analytics",
      "responsible-ai",
    ],
  },
  {
    id: "onetouch-audit",
    name: "OneTouch Audit",
    slug: "onetouch-audit",
    category: "Enterprise Solutions",
    industries: ["Audit and Compliance", "Finance"],
    technologies: ["Document Intelligence", "Dashboards", "Generative AI"],
    shortDescription:
      "AI-enabled audit and assurance command centre for risk visibility, evidence tracking, exception management and remediation.",
    valueProposition:
      "Give audit, risk and assurance leaders a command centre that connects risk signals, evidence, exceptions and remediation into one governed operating rhythm.",
    businessProblem:
      "Audit and assurance teams spend disproportionate effort assembling evidence, chasing exceptions and reconciling status across tools, workpapers and email. Fragmented visibility weakens risk coverage, slows remediation and makes leadership reporting labour-intensive.",
    solutionOverview:
      "OneTouch Audit brings risk visibility, document intelligence, exception workflows and remediation tracking into a single assurance command centre. Generative AI accelerates evidence review and narrative preparation, while dashboards keep engagement status, findings and ownership continuously visible.",
    targetUsers: [
      "Chief audit executives",
      "Internal audit managers and engagement leads",
      "Risk and compliance officers",
      "Finance control owners",
      "Remediation and process owners",
    ],
    modules: [
      {
        title: "Assurance command centre",
        description:
          "Provide a unified view of engagements, risk coverage, open findings and remediation status for leadership oversight.",
      },
      {
        title: "Evidence intelligence",
        description:
          "Ingest and analyse workpapers, policies and supporting documents to accelerate review and evidence completeness checks.",
      },
      {
        title: "Exception and finding management",
        description:
          "Capture exceptions, classify severity and route ownership with clear due dates and escalation paths.",
      },
      {
        title: "Remediation tracking",
        description:
          "Monitor corrective actions from assignment through closure with evidence of completion and reviewer sign-off.",
      },
      {
        title: "Leadership and committee reporting",
        description:
          "Generate structured status narratives and dashboards suitable for audit committees and executive forums.",
      },
    ],
    capabilities: [
      "Risk and engagement visibility",
      "Document intelligence for evidence",
      "Exception lifecycle management",
      "Remediation tracking",
      "Committee-ready reporting",
    ],
    workflow: [
      {
        title: "Plan assurance coverage",
        description:
          "Define engagements, risk focus areas and evidence requirements for the audit cycle.",
      },
      {
        title: "Assemble and analyse evidence",
        description:
          "Document intelligence supports review of workpapers and supporting artefacts for completeness and relevance.",
      },
      {
        title: "Identify and classify exceptions",
        description:
          "Findings and exceptions are logged with severity, owners and recommended next steps.",
      },
      {
        title: "Drive remediation",
        description:
          "Process owners act on assigned items while audit teams track progress and evidence of closure.",
      },
      {
        title: "Report to leadership",
        description:
          "Dashboards and generated narratives summarise coverage, open risks and remediation posture for governance forums.",
      },
    ],
    dataSources: [
      "Audit management and workpaper repositories",
      "Policy, control and procedure libraries",
      "ERP and finance system extracts where approved",
      "Issue and remediation trackers",
      "Prior engagement findings and recommendations",
    ],
    aiCapabilities: [
      "Document intelligence for evidence extraction and review support",
      "Generative summarisation for findings and committee narratives",
      "Exception classification assistance",
      "Similarity detection across recurring control issues",
      "Completeness checks against engagement checklists",
    ],
    governance: [
      "Segregation of duties between auditors, owners and reviewers",
      "Immutable audit trails for finding and closure actions",
      "Controlled access to sensitive assurance artefacts",
      "Human approval for finding severity and closure decisions",
      "Retention policies aligned to assurance standards",
    ],
    architecture: [
      "Secure document and evidence ingestion services",
      "Document intelligence and generative review assistants",
      "Exception and remediation workflow engine",
      "Assurance analytics and leadership dashboards",
      "Identity, access and audit-logging controls",
    ],
    deploymentOptions: [
      "Enterprise private cloud deployment",
      "Integration with existing audit management platforms",
      "Controlled demonstration environments for assurance stakeholders",
    ],
    outcomes: [
      "Clearer leadership visibility of engagement status and open exceptions",
      "Faster, more consistent evidence review supported by document intelligence",
      "Stronger ownership and follow-through on remediation actions",
      "Reduced effort to prepare committee-ready assurance narratives",
    ],
    featured: true,
    status: "Available for demonstration",
    relatedCapabilities: [
      "responsible-ai",
      "enterprise-ai",
      "document-intelligence",
      "governance",
    ],
  },
  {
    id: "ai-governance-command-centre",
    name: "AI Governance Command Centre",
    slug: "ai-governance-command-centre",
    category: "Governance",
    industries: ["Enterprise Operations", "Government"],
    technologies: ["Dashboards", "Knowledge Graphs", "Agentic AI"],
    shortDescription:
      "Platform for AI use-case inventory, risk classification, approval workflows, lifecycle monitoring and governance reporting.",
    valueProposition:
      "Establish an operating system for AI oversight that inventories use cases, classifies risk, governs approvals and monitors lifecycle posture across the enterprise or public institution.",
    businessProblem:
      "Organisations adopt AI faster than they can inventory systems, classify risk and evidence oversight. Shadow use cases, inconsistent approvals and weak lifecycle monitoring create regulatory, operational and reputational exposure for boards and executives.",
    solutionOverview:
      "AI Governance Command Centre provides a living inventory of AI use cases linked to risk classification, approval workflows, controls and lifecycle status. Knowledge graphs relate models, data sources, owners and policies, while agentic assistants help prepare reviews and surface overdue governance actions.",
    targetUsers: [
      "Chief risk, compliance and AI officers",
      "AI CoE and platform leadership",
      "Model risk and responsible AI teams",
      "Business use-case owners",
      "Internal audit and oversight committees",
    ],
    modules: [
      {
        title: "AI use-case inventory",
        description:
          "Maintain a governed catalogue of AI systems, owners, data dependencies and operating status across the organisation.",
      },
      {
        title: "Risk classification and controls",
        description:
          "Classify use cases by risk tier and map required controls, evaluations and oversight obligations.",
      },
      {
        title: "Approval and change workflows",
        description:
          "Route intake, go-live and material-change decisions through accountable approvers with documented rationale.",
      },
      {
        title: "Lifecycle monitoring",
        description:
          "Track evaluation, drift, incidents, access changes and retirement readiness across the AI portfolio.",
      },
      {
        title: "Governance reporting",
        description:
          "Produce board-, committee- and regulator-ready views of inventory coverage, risk posture and outstanding actions.",
      },
    ],
    capabilities: [
      "Enterprise AI inventory",
      "Risk-tiered approval workflows",
      "Lifecycle and control monitoring",
      "Knowledge-graph lineage views",
      "Governance reporting packs",
    ],
    workflow: [
      {
        title: "Register the use case",
        description:
          "Owners submit purpose, data sources, model approach, stakeholders and intended operating context.",
      },
      {
        title: "Classify risk and map controls",
        description:
          "Governance teams assign risk tier, required evaluations and oversight controls before advancement.",
      },
      {
        title: "Approve for build or production",
        description:
          "Accountable approvers review evidence packages and record decisions, conditions and exceptions.",
      },
      {
        title: "Monitor the lifecycle",
        description:
          "Ongoing evaluation status, incidents, ownership changes and control attestations are tracked centrally.",
      },
      {
        title: "Report and remediate",
        description:
          "Leadership reviews portfolio posture, overdue actions and retirement or escalation needs.",
      },
    ],
    dataSources: [
      "AI and model registries",
      "Data catalogue and lineage systems",
      "Policy, control and standard libraries",
      "Evaluation and monitoring telemetry",
      "Identity, ownership and organisational directories",
    ],
    aiCapabilities: [
      "Agentic assistants for review-pack preparation",
      "Knowledge-graph reasoning across systems, data and owners",
      "Control-gap and overdue-action detection",
      "Similarity detection across related use cases",
      "Narrative generation for governance committees",
    ],
    governance: [
      "RACI for intake, approval, monitoring and retirement",
      "Evidence requirements by risk tier",
      "Separation between build teams and independent oversight",
      "Immutable decision and exception logs",
      "Policy versioning and control attestation history",
    ],
    architecture: [
      "Use-case and model registry services",
      "Knowledge graph of systems, data, owners and policies",
      "Workflow engine for approvals and attestations",
      "Monitoring connectors for evaluation and incident signals",
      "Governance dashboards and reporting services",
    ],
    deploymentOptions: [
      "Enterprise private cloud or government-secure deployment",
      "Phased rollout starting with inventory and approval workflows",
      "Demonstration environments for CoE and risk stakeholders",
    ],
    outcomes: [
      "Complete, current visibility of AI use cases and ownership",
      "Consistent risk classification and approval evidence across the portfolio",
      "Earlier detection of control gaps, overdue actions and lifecycle drift",
      "Board- and committee-ready governance reporting without manual assembly",
    ],
    featured: true,
    status: "Available for demonstration",
    relatedCapabilities: [
      "responsible-ai",
      "ai-strategy",
      "ai-coe",
      "governance",
    ],
  },
  {
    id: "enterprise-decision-intelligence",
    name: "Enterprise Decision Intelligence Dashboard",
    slug: "enterprise-decision-intelligence",
    category: "Analytics",
    industries: ["Enterprise Operations", "Finance", "Manufacturing"],
    technologies: ["Data Analytics", "Dashboards", "Machine Learning", "Generative AI"],
    shortDescription:
      "Executive decision intelligence that unifies operational, financial and risk signals into governed dashboards and narrative briefings.",
    valueProposition:
      "Help enterprise leaders move from fragmented reports to a decision cockpit that surfaces priorities, exceptions and recommended focus areas with clear ownership.",
    businessProblem:
      "Executives receive conflicting operational and financial reports from multiple teams, often too late to act. Exception handling is manual, narrative preparation consumes analyst time, and decision owners lack a shared, trusted view of what matters now.",
    solutionOverview:
      "Enterprise Decision Intelligence Dashboard consolidates approved metrics, exception signals and contextual narratives into a leadership cockpit. Analytics and machine learning highlight material variation, while generative briefings help prepare decision forums without replacing accountable human judgment.",
    targetUsers: [
      "CXO and business-unit leadership",
      "Strategy and performance management teams",
      "Finance and operations controllers",
      "Enterprise PMO and transformation offices",
      "Risk and performance analytics teams",
    ],
    modules: [
      {
        title: "Leadership decision cockpit",
        description:
          "Present priority KPIs, exceptions and decision queues in a single governed interface for executive forums.",
      },
      {
        title: "Exception and variance intelligence",
        description:
          "Detect material deviations across operations, finance and delivery metrics that require leadership attention.",
      },
      {
        title: "Narrative briefing assistant",
        description:
          "Generate structured management briefings grounded in approved metrics and exception evidence.",
      },
      {
        title: "Ownership and action tracking",
        description:
          "Assign decision owners, capture outcomes and track follow-through from review to closure.",
      },
    ],
    capabilities: [
      "Executive KPI consolidation",
      "Exception detection",
      "Decision briefing narratives",
      "Action ownership tracking",
      "Cross-functional performance views",
    ],
    workflow: [
      {
        title: "Connect approved metric sources",
        description:
          "Integrate certified operational, financial and delivery datasets under defined metric ownership.",
      },
      {
        title: "Detect exceptions and priorities",
        description:
          "Analytics surface material variances and emerging risks for the current decision cycle.",
      },
      {
        title: "Prepare leadership briefings",
        description:
          "Generative assistants draft concise narratives linked to underlying evidence for executive review.",
      },
      {
        title: "Decide and assign ownership",
        description:
          "Leaders confirm priorities, assignees and expected follow-up during decision forums.",
      },
      {
        title: "Track outcomes",
        description:
          "Progress against agreed actions is monitored until closure or escalation.",
      },
    ],
    dataSources: [
      "ERP and financial performance systems",
      "Operational and manufacturing execution data",
      "Programme and delivery trackers",
      "Risk and control dashboards",
      "Approved enterprise metric catalogues",
    ],
    aiCapabilities: [
      "Anomaly and variance detection across KPI portfolios",
      "Priority ranking for executive attention",
      "Generative management briefing drafts",
      "Trend comparison across business units and periods",
      "Data freshness and metric trust indicators",
    ],
    governance: [
      "Certified metric definitions and stewards",
      "Role-based access for sensitive performance data",
      "Human ownership of decisions and action closure",
      "Traceability from briefing claims to source metrics",
      "Change control for dashboard logic and thresholds",
    ],
    architecture: [
      "Metric ingestion and semantic layer",
      "Analytics and exception detection services",
      "Generative briefing services grounded in approved data",
      "Executive dashboard and action-tracking layer",
      "Access control and audit logging",
    ],
    deploymentOptions: [
      "Enterprise private cloud deployment",
      "Embedding within existing BI and data platforms",
      "Pilot deployment for a selected leadership forum",
    ],
    outcomes: [
      "A shared, trusted view of priorities for executive decision forums",
      "Faster identification of material exceptions requiring leadership action",
      "Less manual effort to prepare evidence-linked management narratives",
      "Clearer ownership and follow-through from decision to closure",
    ],
    featured: false,
    status: "Available for demonstration",
    relatedCapabilities: [
      "analytics",
      "data-platforms",
      "enterprise-ai",
      "ai-strategy",
    ],
  },
  {
    id: "document-intelligence-copilot",
    name: "Document Intelligence Copilot",
    slug: "document-intelligence-copilot",
    category: "AI Products",
    industries: ["Enterprise Operations", "Finance", "Healthcare", "Education"],
    technologies: ["Document Intelligence", "Generative AI", "NLP", "Knowledge Graphs"],
    shortDescription:
      "Secure document intelligence for extraction, review assistance, policy grounding and knowledge retrieval across enterprise corpora.",
    valueProposition:
      "Turn dense document estates into governed knowledge workflows so teams extract facts, answer policy questions and prepare reviews with evidence links and human oversight.",
    businessProblem:
      "Knowledge workers spend significant time locating clauses, extracting structured fields and reconciling answers across contracts, policies, clinical or academic documents. Generic chat tools lack grounding, access control and auditability for enterprise use.",
    solutionOverview:
      "Document Intelligence Copilot combines OCR and NLP extraction, retrieval-augmented generation and knowledge-graph context to support review, Q&A and structured capture. Every answer can be traced to source passages, and sensitive corpora remain under enterprise access and retention controls.",
    targetUsers: [
      "Knowledge and operations teams",
      "Legal, policy and compliance reviewers",
      "Finance and contracts operations",
      "Clinical or academic document stewards",
      "Enterprise knowledge management leads",
    ],
    modules: [
      {
        title: "Secure corpus ingestion",
        description:
          "Ingest and classify documents with access controls, retention rules and source provenance preserved.",
      },
      {
        title: "Extraction and structuring",
        description:
          "Pull key fields, clauses and entities into structured records ready for downstream workflows.",
      },
      {
        title: "Grounded Q&A and review assist",
        description:
          "Answer policy and document questions with cited passages reviewers can verify before acting.",
      },
      {
        title: "Knowledge graph context",
        description:
          "Relate documents, entities, policies and owners so retrieval reflects organisational structure, not isolated files.",
      },
      {
        title: "Human review and export",
        description:
          "Route AI-assisted outputs through reviewer confirmation before systems of record are updated.",
      },
    ],
    capabilities: [
      "Grounded document Q&A",
      "Clause and field extraction",
      "Citation-backed answers",
      "Policy-aware retrieval",
      "Reviewer-in-the-loop workflows",
    ],
    workflow: [
      {
        title: "Onboard the corpus",
        description:
          "Documents are ingested, classified and permissioned according to enterprise access policies.",
      },
      {
        title: "Index and relate content",
        description:
          "NLP and knowledge-graph services create searchable representations linked to owners and document types.",
      },
      {
        title: "Ask or extract",
        description:
          "Users request answers, summaries or structured fields for a case, contract set or policy domain.",
      },
      {
        title: "Verify against sources",
        description:
          "Cited passages are reviewed so humans confirm accuracy before decisions or system updates.",
      },
      {
        title: "Export and govern",
        description:
          "Approved outputs feed workflows, repositories or reports with retention and audit logging intact.",
      },
    ],
    dataSources: [
      "Contracts, policies and standard operating procedures",
      "Enterprise content management repositories",
      "Shared drives and approved document archives",
      "Reference taxonomies and entity directories",
      "Prior review checklists and templates",
    ],
    aiCapabilities: [
      "Document OCR and layout-aware extraction",
      "NLP entity and clause detection",
      "Retrieval-augmented generative answers with citations",
      "Knowledge-graph assisted context retrieval",
      "Reviewer assist for summarisation and comparison",
    ],
    governance: [
      "Document-level access control and data minimisation",
      "Citation required for generative answers",
      "Human confirmation before system-of-record updates",
      "Prompt, model and corpus change control",
      "Full query and export audit trails",
    ],
    architecture: [
      "Secure document ingestion and OCR pipeline",
      "Vector and knowledge-graph retrieval layer",
      "Generative answer services with citation binding",
      "Reviewer workflow and export connectors",
      "Identity, encryption and audit control plane",
    ],
    deploymentOptions: [
      "Private cloud with customer-managed keys",
      "On-premises or VPC-isolated model serving",
      "Demonstration environments with redacted sample corpora",
    ],
    outcomes: [
      "Faster location of relevant clauses and facts across large document estates",
      "Answers and extractions that remain grounded in verifiable source passages",
      "Stronger control over sensitive knowledge compared with unmanaged generic tools",
      "Clearer reviewer accountability before operational systems are updated",
    ],
    featured: false,
    status: "Available for demonstration",
    relatedCapabilities: [
      "document-intelligence",
      "generative-ai",
      "knowledge-systems",
      "responsible-ai",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}
