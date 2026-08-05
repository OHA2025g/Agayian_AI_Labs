import type { ImpactStory } from "@/types";

export const impactStories: ImpactStory[] = [
  {
    id: "story-talent-intelligence",
    slug: "ai-powered-talent-intelligence-transformation",
    title: "AI-Powered Talent Intelligence Transformation",
    clientLabel: "Human Resources Organisation",
    industry: "hr",
    capability: "product-engineering",
    solutionType: "AI Products",
    outcomeCategory: "Talent and Workforce Decisions",
    challenge:
      "Recruitment teams faced high applicant volumes and inconsistent shortlisting. Hiring managers lacked transparent rationales for candidate progression, and talent leadership had limited visibility into funnel quality across roles.",
    context:
      "The organisation needed an explainable talent intelligence layer that could sit alongside existing ATS and assessment tools, improve shortlist consistency and preserve human accountability for every selection decision.",
    approach:
      "We defined role-fit criteria with talent and compliance stakeholders, then engineered a Smart Hiring workflow for matching, assessment support, interview structuring and hiring analytics. Responsible AI controls — fairness review points, human override and auditability — were designed into the operating model rather than added afterwards.",
    architecture:
      "A modular talent intelligence architecture connected structured role profiles, candidate attributes and assessment signals to an explainable scoring and shortlist layer. Dashboards provided funnel visibility for talent leadership, while all final progression decisions remained with authorised human owners.",
    governance:
      "Use of AI was limited to advisory support. Candidate data access was role-restricted, retention rules were agreed with HR compliance, and selection rationales were retained for authorised review. Bias monitoring and human-in-the-loop checkpoints were established for high-volume recruitment cycles.",
    outcomes: [
      "More consistent shortlisting against structured role criteria.",
      "Clearer explainability for recruiters and hiring managers.",
      "Improved leadership visibility into hiring funnel health.",
      "A governed pattern for expanding AI assistance without removing human accountability.",
    ],
    relatedProducts: ["smart-hiring"],
    relatedCapabilities: ["product-engineering", "governance", "data", "generative-ai"],
  },
  {
    id: "story-social-development",
    slug: "social-development-decision-intelligence-platform",
    title: "Social Development Decision-Intelligence Platform",
    clientLabel: "State Government Department",
    industry: "government",
    capability: "data",
    solutionType: "Government Solutions",
    outcomeCategory: "Public Programme Oversight",
    challenge:
      "Programme leadership needed timely visibility across districts and schemes, but indicators were fragmented, reporting cycles were delayed and intervention priorities were difficult to compare on a shared evidence base.",
    context:
      "A public social-development setting required a decision-intelligence platform that could consolidate approved indicators, highlight emerging risks and support review meetings — while respecting privacy, purpose limitation and administrative accountability.",
    approach:
      "We worked with programme and technology stakeholders to define indicator ownership, data quality rules and exception workflows. The Women and Child Development Intelligence Platform was shaped as a leadership and programme command view, with briefing support grounded in validated sources rather than free-form generation.",
    architecture:
      "Governed data pipelines fed a decision-intelligence layer with district, scheme and indicator views. Risk and coverage signals were presented through dashboards linked to ownership for follow-up. Briefing outputs referenced approved datasets and retained lineage for leadership review.",
    governance:
      "Beneficiary and sensitive programme data were treated under heightened privacy controls. Automated alerts were classified as decision-support only. Human programme owners retained responsibility for intervention planning, escalations and public-facing determinations.",
    outcomes: [
      "Shared situational awareness across programme and administrative layers.",
      "Earlier identification of districts and schemes requiring attention.",
      "More structured, evidence-backed programme review conversations.",
      "A reusable public-sector pattern for responsible decision intelligence.",
    ],
    relatedProducts: ["wcd-intelligence", "enterprise-decision-intelligence"],
    relatedCapabilities: ["data", "strategy", "governance", "product-engineering"],
  },
  {
    id: "story-audit-assurance",
    slug: "enterprise-audit-and-assurance-command-centre",
    title: "Enterprise Audit and Assurance Command Centre",
    clientLabel: "Large Enterprise",
    industry: "enterprise",
    capability: "governance",
    solutionType: "Enterprise Solutions",
    outcomeCategory: "Audit and Control Visibility",
    challenge:
      "Assurance teams struggled to maintain a unified view of findings, evidence and remediation ownership. Document-heavy reviews slowed cycles, and leadership lacked a reliable command picture of open exceptions.",
    context:
      "The enterprise required an AI-enabled assurance command centre that could improve visibility and evidence handling without weakening segregation of duties or audit defensibility.",
    approach:
      "We mapped the assurance lifecycle from finding capture through evidence linkage, exception prioritisation and remediation tracking. OneTouch Audit was implemented as the operating surface, with document intelligence assisting analysts while preserving human validation of conclusions.",
    architecture:
      "A command-centre architecture connected findings, working papers and remediation tasks into a governed workflow. Document intelligence supported extraction and summarisation for analyst review. Dashboards gave risk and audit leadership a consolidated exception and closure status view.",
    governance:
      "AI outputs were treated as analyst aids, not automated audit opinions. Access to evidence was permissioned. Action ownership and closure authority remained with designated assurance roles. Activity trails supported internal review and quality assurance.",
    outcomes: [
      "Clearer visibility of open exceptions and remediation ownership.",
      "More consistent evidence packaging for assurance reviews.",
      "Reduced dependence on fragmented tracking spreadsheets.",
      "Stronger confidence that AI assistance remained within audit control boundaries.",
    ],
    relatedProducts: ["onetouch-audit", "document-intelligence-copilot"],
    relatedCapabilities: ["governance", "generative-ai", "data", "product-engineering"],
  },
  {
    id: "story-financial-governance",
    slug: "regulated-ai-governance-and-assurance-enablement",
    title: "Regulated AI Governance and Assurance Enablement",
    clientLabel: "Financial Institution",
    industry: "banking",
    capability: "governance",
    solutionType: "Governance",
    outcomeCategory: "Responsible AI Oversight",
    challenge:
      "AI and generative use cases were emerging across functions faster than the institution could inventory, classify and oversee them. Boards and control teams needed a practical governance operating model, not only policy language.",
    context:
      "A regulated financial environment required a shared system for use-case intake, risk classification, approvals and lifecycle monitoring — spanning traditional analytics and newer generative applications.",
    approach:
      "We established an AI governance operating model with clear risk tiers, approval pathways and evidence expectations. The AI Governance Command Centre became the inventory and oversight surface, aligned to CoE intake and assurance reporting needs.",
    architecture:
      "A governance platform tracked proposed and in-production AI systems, risk classifications, approval status and monitoring ownership. Dashboards supported control and leadership reporting. Integration points linked intake from business functions to CoE and risk review workflows.",
    governance:
      "High-impact and customer-facing systems required elevated approval and monitoring. Roles were separated across proposers, builders, control owners and approvers. Lifecycle status and exceptions were retained as evidence for internal oversight discussions.",
    outcomes: [
      "A single inventory view of AI use cases across business functions.",
      "Clearer risk-tiered approval and monitoring expectations.",
      "Improved readiness for board and control conversations on AI oversight.",
      "A durable foundation for scaling AI under institutional accountability.",
    ],
    relatedProducts: ["ai-governance-command-centre", "onetouch-audit"],
    relatedCapabilities: ["governance", "ai-coe", "strategy", "managed-services"],
  },
];

export function getStoryBySlug(slug: string): ImpactStory | undefined {
  return impactStories.find((story) => story.slug === slug);
}

export function filterStoriesByIndustry(industry: string): ImpactStory[] {
  return impactStories.filter((story) => story.industry === industry);
}

export function filterStoriesByCapability(capability: string): ImpactStory[] {
  return impactStories.filter((story) => story.capability === capability);
}

export function filterStoriesBySolutionType(solutionType: string): ImpactStory[] {
  return impactStories.filter((story) => story.solutionType === solutionType);
}

export function filterStoriesByOutcomeCategory(outcomeCategory: string): ImpactStory[] {
  return impactStories.filter((story) => story.outcomeCategory === outcomeCategory);
}

export function filterStories(filters: {
  industry?: string;
  capability?: string;
  solutionType?: string;
  outcomeCategory?: string;
}): ImpactStory[] {
  return impactStories.filter((story) => {
    if (filters.industry && story.industry !== filters.industry) return false;
    if (filters.capability && story.capability !== filters.capability) return false;
    if (filters.solutionType && story.solutionType !== filters.solutionType) return false;
    if (filters.outcomeCategory && story.outcomeCategory !== filters.outcomeCategory) {
      return false;
    }
    return true;
  });
}
