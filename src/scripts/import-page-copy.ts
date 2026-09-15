import type { Payload } from "payload";
import { flagshipProducts } from "../config/flagship-products";
import { CTA } from "../config/cta";
import { brandCopy, positioningPoints } from "../config/site";
import { CAPABILITIES_PAGE_COPY } from "../lib/cms/canonical-copy";
import {
  faqItems,
  foundations,
  intakeSteps,
  layers,
  maturity,
  outcomes,
  pillars as coePillars,
  roadmap,
  whatFeatures,
  whyFeatures,
} from "../app/(site)/ai-centre-of-excellence/coe-content";

export async function importHardcodedPageCopy(payload: Payload) {
  await payload.updateGlobal({
    slug: "capabilities-page",
    data: CAPABILITIES_PAGE_COPY,
    draft: false,
    overrideAccess: true,
  });

  await payload.updateGlobal({
    slug: "products-page",
    data: {
      status: "published",
      hero: {
        eyebrow: "Products",
        title: "AI products built for real-world decisions",
        description:
          "Governed intelligence systems designed for complex operating environments.",
        searchPlaceholder: "Search products, capabilities, modules...",
      },
      architecture: {
        title: "Built to integrate. Designed to scale.",
        coreTitle: "Governance & Security Core",
        coreSubtitle: "Policy · Privacy · Compliance · Audit",
      },
      seo: {
        title: "Products",
        description:
          "Explore Agrayian AI Labs' enterprise platforms, government solutions, governance systems and AI-powered decision tools.",
      },
    },
    draft: false,
    overrideAccess: true,
  });

  await payload.updateGlobal({
    slug: "trust-page",
    data: {
      status: "published",
      title: "Trust & Legal Centre",
      description:
        "How Agrayian AI Labs approaches accountability, transparency, privacy, fairness and continuous oversight for responsible AI systems.",
      intro:
        "Responsible AI is designed into how we work — not added after delivery.",
      principles: [
        {
          title: "Human accountability",
          description:
            "Clear ownership where autonomy meets consequence. People remain accountable for decisions that affect stakeholders.",
        },
        {
          title: "Purpose and proportionality",
          description:
            "Use cases are scoped to legitimate aims with controls matched to impact—not maximum capability by default.",
        },
        {
          title: "Transparency",
          description:
            "Stakeholders can understand when AI is used, what it influences, and how to escalate concerns.",
        },
        {
          title: "Security and privacy",
          description:
            "Data minimisation, access control and protection aligned to sensitivity and jurisdiction.",
        },
        {
          title: "Fairness and inclusion",
          description:
            "Design and evaluation practices that surface bias risks and support equitable outcomes.",
        },
        {
          title: "Continuous monitoring",
          description:
            "Detect drift, incidents and value gaps early—then route them to accountable owners.",
        },
        {
          title: "Risk-aware design",
          description:
            "Proportionate risk classification drives approval pathways, testing depth and oversight intensity.",
        },
        {
          title: "Evaluation and assurance",
          description:
            "Evidence that leadership and assurance teams can review—before and after go-live.",
        },
        {
          title: "Incident readiness",
          description:
            "Defined response paths for failure modes, misuse and unexpected behaviour—including retirement.",
        },
      ],
      ctaTitle: "Talk to us about responsible delivery",
      ctaLabel: "Discuss Your AI Initiative",
      ctaHref: "/contact?interest=consultation",
      seo: {
        title: "Trust & Legal Centre",
        description:
          "How Agrayian AI Labs approaches accountability, transparency, privacy, fairness and continuous oversight for responsible AI systems.",
      },
    },
    draft: false,
    overrideAccess: true,
  });

  await payload.updateGlobal({
    slug: "home-page",
    data: {
      status: "published",
      flagshipOverrides: flagshipProducts.map((item) => ({
        slug: item.slug,
        displayName: item.displayName,
        displayDescription: item.displayDescription,
      })),
      hero: {
        eyebrow: brandCopy.eyebrow,
        headlineLine1: brandCopy.headlineLines[0],
        headlineLine2: brandCopy.headlineLines[1] ?? "",
        supporting: brandCopy.supporting,
        primaryCtaLabel: brandCopy.primaryCta,
        primaryCtaHref: CTA.primary.href,
        secondaryCtaLabel: brandCopy.secondaryCta,
        secondaryCtaHref: CTA.secondary.href,
        trustLine: brandCopy.trustStatement,
        supportingPoints: [...positioningPoints],
      },
      sections: {
        trust: "Built for high-complexity institutions",
        problems: "The operational problems we take on",
        pillars: "How we convert workflows into AI systems",
        products: "Featured products",
        industries: "Industries we serve",
        method: "Discover, Design, Pilot, Scale",
        proof: "Proof, labelled by delivery status",
        responsible: "Responsible AI by design",
        insights: "Insights that inspire",
      },
      trustItems: [
        "Government and public sector",
        "Banking and financial services",
        "Enterprise operations",
        "Data, AI and automation",
        "Secure and governed AI",
      ],
      problemItems: [
        "Manual audit",
        "Fragmented operations",
        "Slow document review",
        "Revenue leakage",
        "Fraud risk",
        "Poor cross-department visibility",
      ],
      pillars: [
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
      ],
      methodSteps: [
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
      ],
      finalCta: {
        title: "Have a complex process that needs to be redesigned with AI?",
        description:
          "Submit the operational challenge. We will map the workflow, the buyers and the governed path from discovery to production.",
      },
      seo: {
        title: "Home",
        description: brandCopy.supporting,
      },
    },
    draft: false,
    overrideAccess: true,
  });

  await payload.updateGlobal({
    slug: "coe-page",
    data: {
      status: "published",
      hero: {
        eyebrow: "AI Centre of Excellence",
        title: "AI Centre of Excellence — a formal advisory and enablement service",
        description:
          "We help institutions stand up a governed CoE that sets standards, funds the right work and enables delivery teams to move from pilot to production.",
        primaryCtaLabel: CTA.primary.label,
        primaryCtaHref: CTA.primary.href,
        secondaryCtaLabel: "Explore the Operating Model",
        secondaryCtaHref: "#operating-model",
      },
      whatBody:
        "A formal advisory and enablement service: a cross-functional operating model that sets direction, enables standards, funds the right work and accelerates delivery across the enterprise.",
      layers: layers.map((item) => ({ ...item })),
      outcomes: [...outcomes],
      whatFeatures: whatFeatures.map((item) => ({ ...item })),
      whyFeatures: whyFeatures.map((item) => ({ ...item })),
      intakeSteps: intakeSteps.map((item) => ({ ...item })),
      pillars: coePillars.map((item) => ({ ...item })),
      foundations: foundations.map((item) => ({
        title: item.title,
        description: item.description,
        icon: item.icon,
        sculpture: item.sculpture,
        items: [...item.items],
      })),
      maturity: maturity.map((item) => ({
        name: item.name,
        description: item.description,
        icon: item.icon,
      })),
      roadmap: roadmap.map((item) => ({
        name: item.name,
        description: item.description,
        icon: item.icon,
      })),
      faqItems: faqItems.map((item) => ({ ...item })),
    },
    draft: false,
    overrideAccess: true,
  });

  await payload.updateGlobal({
    slug: "governance-page",
    data: {
      status: "published",
      lifecycle: [
        "Ideate",
        "Assess",
        "Approve",
        "Build",
        "Validate",
        "Deploy",
        "Monitor",
        "Retire",
      ].map((label) => ({ label })),
      pillars: [
        {
          title: "Use-case inventory",
          description:
            "Centralize AI systems, owners, purposes, data sources and business criticality.",
        },
        {
          title: "Risk classification",
          description:
            "Classify inherent and residual risk across safety, compliance, ethics and operational impact.",
        },
        {
          title: "Lifecycle controls",
          description:
            "Enforce stage-gate approvals, controls and evidence across the AI lifecycle.",
        },
        {
          title: "Explainability",
          description:
            "Ensure transparency with model documentation, rationale and traceable decisions.",
        },
        {
          title: "Bias & fairness",
          description:
            "Assess and mitigate bias with testing, fairness metrics and remediation actions.",
        },
        {
          title: "Human oversight",
          description:
            "Define human-in-the-loop points, escalation paths and accountability.",
        },
        {
          title: "Privacy & security",
          description:
            "Protect data and models with privacy-by-design and robust security controls.",
        },
        {
          title: "Monitoring & incidents",
          description:
            "Continuously monitor performance shifts and misuse with incident management.",
        },
        {
          title: "AI audit",
          description:
            "Maintain complete, immutable evidence for internal, external and regulatory audits.",
        },
        {
          title: "Third-party AI risk",
          description:
            "Evaluate and monitor vendors and third-party models throughout the lifecycle.",
        },
      ],
      raciRows: [
        {
          role: "Policy owners",
          cells: [
            "Set principles",
            "Define tiers",
            "Gate criteria",
            "Control standards",
            "Evidence rules",
            "Release policy",
            "Escalation rules",
            "Retention rules",
          ],
        },
        {
          role: "Use-case sponsors",
          cells: [
            "Propose intent",
            "Accept residual risk",
            "Sign business case",
            "Own outcomes",
            "Confirm fitness",
            "Go-live authority",
            "Review exceptions",
            "Approve retirement",
          ],
        },
        {
          role: "Delivery teams",
          cells: [
            "Scope options",
            "Prepare evidence",
            "Respond to review",
            "Implement controls",
            "Run evaluations",
            "Ship with logs",
            "Fix drift issues",
            "Decommission",
          ],
        },
        {
          role: "Control functions",
          cells: [
            "Advise early",
            "Challenge risk",
            "Independent review",
            "Assure design",
            "Verify testing",
            "Release challenge",
            "Incident oversight",
            "Audit evidence",
          ],
        },
        {
          role: "Operations",
          cells: [
            "Feasibility input",
            "Capacity view",
            "Support readiness",
            "Run tooling",
            "Ops validation",
            "Operate service",
            "Monitor & respond",
            "Exit runbooks",
          ],
        },
      ],
      engagementSteps: [
        {
          title: "Assess",
          description:
            "Understand your AI landscape, risk appetite, policies and maturity.",
        },
        {
          title: "Design",
          description:
            "Design governance framework, controls, roles and operating model.",
        },
        {
          title: "Implement",
          description:
            "Implement tooling, workflows and integrations to operationalize governance.",
        },
        {
          title: "Operate",
          description:
            "Run governance, monitor performance and drive continuous improvement.",
        },
        {
          title: "Assure",
          description:
            "Assure with audits, reporting and evidence for stakeholders and regulators.",
        },
      ],
    },
    draft: false,
    overrideAccess: true,
  });
}
