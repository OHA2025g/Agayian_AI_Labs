import type { Insight } from "@/types";

function readingTimeFromBody(body: string[]): string {
  const words = body.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

const insightBodies: Omit<Insight, "readingTime">[] = [
  {
    id: "insight-operationalizing-rai",
    slug: "operationalizing-responsible-ai-in-the-enterprise",
    title: "Operationalizing responsible AI in the enterprise",
    excerpt:
      "How to move responsible AI from policy language into intake, approvals, monitoring and evidence that operating teams can actually run.",
    category: "Responsible AI",
    type: "Articles",
    author: "Agrayian AI Labs",
    publishedAt: "2026-07-08",
    featured: true,
    body: [
      "Responsible AI fails when it stays a principle statement. It becomes useful when it is translated into the same operating routines that already govern intake, delivery, risk and assurance.",
      "Operationalising responsible AI starts with a living inventory: which systems exist, which decisions they influence, what data they touch, and who owns the outcome. Without that inventory, every later control is guesswork.",
      "The next step is proportionate gates. Advisory assistants should not carry the same approval burden as systems that affect credit, hiring, benefits or public services. Clear risk tiers keep high-impact work under review without turning every experiment into theatre.",
      "Evidence is the operating product. Teams need to produce reviewable artefacts — approval records, evaluation summaries, exception queues and change history — on a predictable cadence. If leadership cannot inspect those artefacts, the programme is not yet operational.",
      "Human accountability must be named. Someone owns allowed use, someone owns evaluation, and someone owns incident response. Responsible AI is not a model property; it is an institutional practice that survives vendor changes and staff turnover.",
    ],
  },
  {
    id: "insight-data-to-decisions",
    slug: "from-data-to-decisions-the-enterprise-ai-playbook",
    title: "From data to decisions: The enterprise AI playbook",
    excerpt:
      "A practical path from fragmented data to governed decision support — portfolio choices, shared platforms and the evidence leaders actually use.",
    category: "AI Strategy",
    type: "Articles",
    author: "Agrayian AI Labs",
    publishedAt: "2026-05-21",
    body: [
      "Enterprise AI programmes stall when they treat data platforms and decision outcomes as separate projects. The playbook that works connects approved data, decision ownership and operating evidence in one design.",
      "Start with the decision, not the model. Name the choice that should improve, the owner of that choice, the indicators that would change a meeting, and the residual risk if the signal is wrong.",
      "Shared data products then become purposeful. Access rules, quality limits and refresh cadence belong with the decision they support. Unowned lakes and one-off extracts recreate the same briefing delay the programme was meant to remove.",
      "Portfolio balance matters. Near-term operating improvements prove value; platform investments stop every use case from reinventing access, evaluation and hosting. Either extreme — only pilots, or only platforms — produces stall.",
      "Leaders should judge progress by decisions taken with better evidence, not by the number of models in a catalogue. The playbook is complete only when operating reviews consume the system on a fixed cadence.",
    ],
  },
  {
    id: "insight-agentic-accountability",
    slug: "agentic-ai-building-systems-that-act-with-accountability",
    title: "Agentic AI: building systems that act with accountability",
    excerpt:
      "How to design agentic systems as constrained actors — with allowed goals, authorised tools, human escalation and evidence for every consequential step.",
    category: "Agentic AI",
    type: "Articles",
    author: "Agrayian AI Labs",
    publishedAt: "2026-06-18",
    body: [
      "Agentic AI is useful when it can plan, call tools and complete multi-step work. It is safe only when those actions sit inside a control environment with named owners and reversible defaults.",
      "Treat every tool call as a privileged action. Catalogue tools, define who may add new ones, log arguments and outcomes, and require human confirmation for irreversible or externally visible steps until residual risk is accepted.",
      "Separate intent, planning, execution and verification. Humans remain accountable for consequential outcomes. The agent can accelerate retrieval, drafting and routine orchestration within pre-approved limits.",
      "Publish an autonomy ladder: which tasks stay human-led, which need approval, and which may run unattended. Without that ladder, privileges expand quietly under delivery pressure.",
      "Evaluation is continuous. Monitor task success, tool misuse, cost and exceptions with the same change control applied to application releases. An agent without operating ownership is a demonstration, not a service.",
    ],
  },
  {
    id: "insight-governance-frameworks",
    slug: "governance-frameworks-for-the-age-of-ai",
    title: "Governance frameworks for the age of AI",
    excerpt:
      "A framework for inventory, risk tiers, approvals, monitoring and evidence that covers both traditional machine learning and generative or agentic systems.",
    category: "AI Governance",
    type: "Guides",
    author: "Agrayian AI Labs",
    publishedAt: "2026-04-09",
    body: [
      "AI governance fails as a document and succeeds as a framework teams can run: inventory, classification, approval, monitoring and evidence under one institutional rhythm.",
      "Generative and agentic systems add failure modes — over-reliance, prompt injection, uncontrolled tool use and opaque reasoning — but they should not sit in a parallel committee. One framework should cover classical machine learning and newer interaction patterns.",
      "Risk tiers keep the framework usable. Low-impact advisory work should move quickly. Systems that influence rights, entitlements, credit, employment or public services need stronger documentation, human review and a path to pause.",
      "Roles must stay distinct. Business owners accept outcome accountability, technology teams own platform and evaluation hygiene, and risk teams challenge residual exposure. When those roles blur, issues surface late.",
      "The framework is real only when evidence can be produced on schedule: inventory completeness, approval status, monitoring coverage and exception handling. If assurance cannot test those artefacts, the model is still aspirational.",
    ],
  },
  {
    id: "insight-agentic-perspective",
    slug: "agentic-ai-from-demos-to-governed-operating-systems",
    title: "Agentic AI: From Demos to Governed Operating Systems",
    excerpt:
      "Agentic AI only creates durable value when goals, tools, permissions and human escalation paths are designed as an operating system — not as a showcase workflow.",
    category: "Agentic AI",
    type: "Articles",
    author: "Agrayian AI Labs",
    publishedAt: "2026-06-18",
    body: [
      "Many organisations first encounter agentic AI as a compelling demonstration: a system that plans steps, calls tools and completes a multi-stage task with limited supervision. The leap from demonstration to production is rarely a model problem. It is an operating-model problem.",
      "In enterprise and government settings, an agent is not simply an autonomous assistant. It is a constrained actor inside a control environment. That means the organisation must define allowable goals, authorised tools, data boundaries, escalation rules and evidence expectations before autonomy is expanded.",
      "Effective agentic systems separate intent, planning, tool execution and verification. Humans remain accountable for consequential outcomes, while the agent accelerates preparation, retrieval, drafting and routine orchestration within pre-approved limits.",
      "The organisations that scale agentic AI well treat evaluation as continuous. They monitor task success, tool misuse, cost, latency and exception rates. They also version prompts, policies and tool permissions with the same discipline applied to application releases.",
      "Agrayian AI Labs advises clients to start with narrow, high-clarity workflows where success criteria are explicit and reversal is possible. From there, autonomy can be increased only as governance, monitoring and operating ownership mature.",
      "A practical control pattern is to treat every tool call as a privileged action. That means cataloguing tools, defining who may authorise new tools, logging arguments and outcomes, and requiring human confirmation for irreversible or externally visible actions until residual risk is accepted.",
      "Operating ownership must be explicit. Someone is accountable for the agent’s allowed goals, someone for the evaluation harness, and someone for incident response when the agent behaves unexpectedly. Without those owners, demos never become dependable services.",
      "Finally, agent programmes should publish an autonomy ladder: which tasks stay human-led, which are human-approved, and which may run unattended within bounds. Publishing that ladder to delivery and risk teams prevents quiet expansion of privileges under delivery pressure.",
    ],
  },
  {
    id: "insight-governance-whitepaper",
    slug: "building-an-enterprise-ai-governance-operating-model",
    title: "Building an Enterprise AI Governance Operating Model",
    excerpt:
      "A practical guide on inventory, risk classification, approvals, monitoring and evidence — the operating disciplines that turn AI policy into institutional practice.",
    category: "AI Governance",
    type: "Guides",
    author: "Agrayian AI Labs",
    publishedAt: "2026-04-09",
    body: [
      "AI governance fails when it remains a document. It succeeds when it becomes a repeatable operating model that business, risk, technology and delivery teams can run together.",
      "This guide outlines a practical structure for enterprise AI governance: a living inventory of use cases and systems; proportionate risk classification; approval pathways matched to impact; lifecycle monitoring; and evidence that leadership and assurance teams can trust.",
      "We distinguish policy intent from operating controls. Policy states what must be true. Operating controls define who acts, what artefacts are produced, which systems record status and how exceptions are handled.",
      "Generative and agentic systems introduce new failure modes — including over-reliance, prompt injection exposure, uncontrolled tool use and opaque reasoning. Governance models must therefore cover both traditional machine learning and newer interaction patterns under one institutional framework.",
      "The guide closes with a staged adoption path: establish intake and inventory, classify risk, stand up approval and monitoring routines, then connect governance reporting to CoE prioritisation and board oversight.",
      "Inventory quality is the first bottleneck. Record the decision supported, data classes touched, model or vendor involved, accountable owner, residual risk tier and current lifecycle stage. Incomplete inventories make every later control performative.",
      "Risk classification should be proportionate. Low-impact advisory assistants should not carry the same approval burden as systems that influence credit, hiring, benefits or public services. Clear tiers prevent both under-control of high-impact systems and bureaucracy that drives shadow AI.",
      "Evidence is what leadership actually reviews. Status dashboards, exception queues, evaluation summaries and change records must be available in a form assurance teams can test. If evidence cannot be produced on a predictable cadence, the operating model is not yet real.",
    ],
  },
  {
    id: "insight-governance-guide",
    slug: "ai-governance-guide-for-accountable-institutions",
    title: "AI Governance Guide for Accountable Institutions",
    excerpt:
      "A concise guide for leaders who need clear roles, risk tiers and oversight routines for responsible AI in enterprise and public-sector environments.",
    category: "Responsible AI",
    type: "Guides",
    author: "Agrayian AI Labs",
    publishedAt: "2026-02-20",
    body: [
      "Accountable institutions cannot treat AI as an unmanaged productivity layer. Every material system needs an owner, a risk posture, a review rhythm and a path for escalation when outcomes diverge from expectations.",
      "This guide sets out a leadership-friendly view of AI governance: define the decision the system supports; classify potential harm and dependency; assign human accountability; and require evidence before expanding scope.",
      "We recommend separating advisory systems from systems that influence rights, entitlements, credit, employment or public services. The latter demand stronger controls, documentation and human review.",
      "Responsible AI is not only fairness language. It includes privacy, security, explainability, evaluation, incident response and the ability to pause or roll back a system when controls fail.",
      "Leaders should ask for operating evidence: inventory completeness, approval status, monitoring coverage and exception handling quality — not only model accuracy claims.",
      "Role clarity prevents governance theatre. Business owners accept outcome accountability, technology teams own platform and evaluation hygiene, and risk/assurance teams challenge residual exposure. When those roles blur, issues surface late and politically.",
      "Oversight routines should match institutional cadence: intake reviews for new use cases, periodic re-attestation for live systems, and incident reviews when control assumptions break. Ad hoc committees without cadence rarely change behaviour.",
      "Public-sector institutions should also map AI oversight to existing accountability structures — audit committees, information governance boards and service owners — rather than inventing parallel forums that lack mandate.",
    ],
  },
  {
    id: "insight-coe-framework",
    slug: "ai-centre-of-excellence-framework",
    title: "AI Centre of Excellence Framework",
    excerpt:
      "A guide for designing an AI CoE that connects strategy, intake, delivery standards, reusable platforms and governance — without becoming a bottleneck.",
    category: "AI Centre of Excellence",
    type: "Guides",
    author: "Agrayian AI Labs",
    publishedAt: "2025-11-12",
    body: [
      "An AI Centre of Excellence should accelerate value under control. If it only reviews ideas, it becomes a queue. If it only builds models, it becomes another delivery silo. The durable design sits between strategy, platforms, governance and federated delivery.",
      "This guide describes CoE functions across five planes: strategy and portfolio; standards and architecture; enablement and community; platform and reusable components; and governance liaison with risk and assurance.",
      "Intake and prioritisation are critical. The CoE should help the organisation choose fewer, better use cases with clear decision owners, data readiness and outcome categories — then provide the patterns that make delivery repeatable.",
      "We also address operating cadence: portfolio reviews, design authority sessions, evaluation standards, reuse catalogues and skills pathways. Without cadence, CoE charters fade into aspiration.",
      "The design is intentionally adaptable. A government department, a bank and a diversified enterprise will staff and stage the CoE differently, but the accountability planes remain recognisable.",
      "Strategy and portfolio work means saying no as often as yes. The CoE should maintain a visible backlog of deferred ideas and the reasons they wait — data readiness, unclear ownership, disproportionate risk or weak outcome definition.",
      "Platform and reuse work only matters if delivery teams can find and adopt components. Catalogues, reference architectures and office hours turn standards from PDFs into default paths that reduce one-off builds.",
      "Governance liaison is not ownership of every control. The CoE translates risk expectations into delivery-ready checkpoints and feeds portfolio reality back to risk leaders so policy stays connected to what teams are actually shipping.",
    ],
  },
  {
    id: "insight-ai-strategy",
    slug: "ai-strategy-that-survives-contact-with-operations",
    title: "AI Strategy That Survives Contact with Operations",
    excerpt:
      "Why AI strategies stall between ambition and production — and how to design portfolios, platforms and operating ownership that actually move.",
    category: "AI Strategy",
    type: "Articles",
    author: "Agrayian AI Labs",
    publishedAt: "2025-09-03",
    body: [
      "Most AI strategies describe opportunity themes. Fewer define the operating conditions required for those themes to become production systems. Strategy fails when it stops at aspiration and never settles ownership, data foundations, governance gates or reuse.",
      "A practical AI strategy answers four questions: which decisions will improve; which platforms and data products are shared; which controls apply by risk tier; and who is accountable for value after launch.",
      "We advise leaders to build a portfolio that mixes near-term operating improvements with platform investments. Purely opportunistic pilots create tool sprawl. Purely platform programmes delay visible value. Balance is a leadership choice, not a technology accident.",
      "Strategy also needs an adoption path. Training, change management, process redesign and measurement belong in the same plan as models and interfaces.",
      "When strategy, CoE and governance are designed together, organisations avoid the common stall: many proofs of concept, little production discipline and unclear evidence of impact.",
      "Funding models matter. If every use case must reinvent data access, evaluation and hosting, strategy collapses into a series of expensive exceptions. Shared platforms need explicit budget lines, not leftover project scraps.",
      "Strategy documents should name stop-criteria as well as ambitions: when to retire a pilot, when to refuse a vendor path, and when residual risk is unacceptable for the decision class. Without stop-criteria, sunk-cost politics replace portfolio discipline.",
      "Finally, communicate strategy in operating language. Frontline managers need to know what decisions will change and what evidence they will see — not only that the organisation will “adopt AI”.",
    ],
  },
  {
    id: "insight-gov-transformation",
    slug: "decision-intelligence-for-government-transformation",
    title: "Decision Intelligence for Government Transformation",
    excerpt:
      "A research note on how public institutions can convert fragmented programme data into governed decision support for leadership and service delivery.",
    category: "Government Transformation",
    type: "Research notes",
    author: "Agrayian AI Labs",
    publishedAt: "2025-12-16",
    body: [
      "Government transformation programmes often invest in systems of record without equally investing in systems of decision. As a result, leadership still waits for delayed reports while frontline and programme teams operate with incomplete shared visibility.",
      "Decision intelligence in the public sector is not a dashboard fashion. It is the disciplined connection of approved indicators, ownership, exception handling and evidence for review meetings and policy briefings.",
      "This note outlines design principles for public decision-intelligence platforms: indicator stewardship, data quality transparency, privacy-by-design for sensitive populations, and clear separation between analytical signals and administrative determinations.",
      "Generative AI can assist briefing and knowledge retrieval, but only when grounded in authorised sources and reviewed by accountable officials. Uncontrolled generation has no place in entitlement or compliance decisions.",
      "Institutions that succeed treat decision intelligence as both a technology capability and a governance capability — with programme owners, data stewards and leadership operating from a common evidence model.",
      "Indicator stewardship means every published measure has an owner, a definition, a refresh cadence and known quality limits. Without stewardship, dashboards become contested theatre rather than decision support.",
      "Privacy-by-design is non-negotiable where programmes touch vulnerable populations. Aggregation rules, access roles and purpose limitation must be designed before analytics convenience expands data exposure.",
      "Leadership routines should consume the platform on a fixed cadence. If the decision system is bypassed whenever politics intensifies, the institution will revert to spreadsheet truth and lose the investment.",
    ],
  },
  {
    id: "insight-hr-tech",
    slug: "responsible-ai-in-talent-and-hr-technology",
    title: "Responsible AI in Talent and HR Technology",
    excerpt:
      "How HR leaders can adopt talent intelligence systems that improve hiring consistency while remaining fair, explainable and privacy-aware.",
    category: "HR Technology",
    type: "Guides",
    author: "Agrayian AI Labs",
    publishedAt: "2026-01-28",
    body: [
      "AI in hiring can reduce administrative burden and improve consistency against role criteria. It can also encode unfair patterns, obscure decision rationales and expand access to sensitive candidate data if controls are weak.",
      "This guide focuses on practical responsible-AI design for talent systems: structured role criteria, explainable shortlisting, human override, fairness monitoring and retention limits.",
      "We recommend that AI remain advisory in selection workflows. Hiring managers and authorised talent leaders should retain final decisions, with rationales available for compliance review where required.",
      "Integration with ATS and assessment tools should be intentional. The value is not another disconnected score; it is a coherent hiring intelligence layer that talent operations can trust and audit.",
      "HR technology programmes that pair product capability with governance readiness earn durable adoption. Those that chase automation without accountability create avoidable organisational risk.",
      "Fairness monitoring needs operational owners. Define which roles and geographies are monitored, what disparity thresholds trigger review, and who can pause a model path when signals deteriorate.",
      "Candidate communication should stay honest: disclose when AI assists screening, keep humans reachable for challenges, and avoid implying that algorithmic scores are decisive when they are not.",
      "Retention and vendor access deserve equal attention. Talent data is sensitive; limit secondary use, document subprocessors, and retire training or evaluation copies on agreed schedules.",
    ],
  },
  {
    id: "insight-audit-compliance",
    slug: "ai-assisted-audit-and-compliance-without-losing-control",
    title: "AI-Assisted Audit and Compliance Without Losing Control",
    excerpt:
      "A perspective on using document intelligence and assurance command centres to strengthen evidence workflows while preserving professional judgement.",
    category: "Audit and Compliance",
    type: "Articles",
    author: "Agrayian AI Labs",
    publishedAt: "2026-03-11",
    body: [
      "Audit and compliance teams are document-rich and time-constrained. AI can help assemble evidence, summarise materials and track exceptions — but only if the profession’s independence and judgement remain intact.",
      "The right design treats AI as an analyst assistant inside a command centre: findings, evidence, ownership and remediation status stay structured, while generative support accelerates preparation for human review.",
      "Control boundaries matter. Systems should not issue automated audit opinions. They should improve completeness, consistency and visibility so professionals can apply judgement faster and with better context.",
      "Evidence trails, access control and segregation of duties are non-negotiable. Any AI-assisted assurance workflow that cannot show who reviewed what, and when, will struggle under internal quality review.",
      "Organisations that approach assurance AI this way gain operating leverage without confusing speed with unchecked automation.",
      "Prompt and retrieval design should prefer authorised document stores over open web context when preparing workpapers. Hallucinated citations are an assurance failure, not a drafting inconvenience.",
      "Quality programmes should sample AI-assisted work explicitly. Review whether summaries omitted material exceptions, whether source links are intact, and whether junior staff over-trusted machine output.",
      "Vendor and model changes need change control. An update that alters extraction behaviour mid-cycle can invalidate prior testing assumptions; assurance teams should know when the assistant itself changed.",
    ],
  },
];

export const insights: Insight[] = insightBodies.map((insight) => ({
  ...insight,
  readingTime: readingTimeFromBody(insight.body),
}));

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug);
}

export function getFeaturedInsight(): Insight | undefined {
  return insights.find((insight) => insight.featured);
}
