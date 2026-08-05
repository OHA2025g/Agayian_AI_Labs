import { CmsBlocksOrFallback } from "@/components/cms/CmsBlocksOrFallback";
import { Section } from "@/components/layout/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GovernanceLifecyclePath } from "@/components/sections/GovernanceLifecyclePath";
import { CTASection } from "@/components/sections/CTASection";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Badge } from "@/components/ui/badge";
import { ArchitectureDiagram } from "@/components/visualisations/ArchitectureDiagram";
import { GovernanceDashboardLazy } from "@/components/visualisations/GovernanceDashboardLazy";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Governance",
  description:
    "Implement responsible AI governance with Agrayian — risk classification, model lifecycle control, explainability, human oversight, monitoring, audit and third-party AI risk management.",
  path: "/ai-governance",
});

const frameworkNodes = [
  "Policy and principles",
  "Use-case inventory",
  "Risk classification",
  "Approval gates",
  "Model lifecycle control",
  "Explainability",
  "Human oversight",
  "Privacy and security",
  "Monitoring and incidents",
  "Audit and assurance",
  "Third-party AI risk",
  "Governance reporting",
];

const whyMatters = [
  {
    title: "Trust is an operating requirement",
    description:
      "Employees, customers, citizens and regulators need to understand when AI is used, how decisions are supported and who remains accountable.",
  },
  {
    title: "Risk scales with adoption",
    description:
      "As GenAI and predictive systems spread, inconsistent controls create uneven exposure across functions and vendors.",
  },
  {
    title: "Delivery needs guardrails, not stop signs",
    description:
      "Proportionate governance accelerates safe production by clarifying what must be reviewed, by whom, and with what evidence.",
  },
];

const uncontrolledRisks = [
  "Shadow AI tools handling sensitive data without inventory or approval.",
  "Models influencing credit, hiring, entitlements or investigations without explainability.",
  "Prompted systems producing confident but ungrounded guidance in operational settings.",
  "No owner for drift, misuse, bias signals or incident response.",
  "Vendor models embedded in products with weak contractual and technical assurance.",
  "Audit and board questions that cannot be answered with evidence.",
];

const operatingModel = [
  {
    title: "Policy owners",
    description:
      "Define acceptable use, risk tiers, documentation standards and escalation rules.",
  },
  {
    title: "Use-case sponsors",
    description:
      "Own business purpose, outcome measures and residual risk acceptance for each system.",
  },
  {
    title: "Delivery teams",
    description:
      "Implement controls, evaluation evidence, logging and human-oversight pathways as part of build.",
  },
  {
    title: "Control functions",
    description:
      "Risk, legal, privacy, security and audit provide independent challenge and assurance.",
  },
  {
    title: "Operations",
    description:
      "Monitor production systems, manage incidents and trigger re-review when material change occurs.",
  },
];

const riskTiers = [
  {
    tier: "Low",
    description:
      "Limited decision impact, no sensitive personal data, strong human confirmation. Lightweight documentation and monitoring.",
  },
  {
    tier: "Medium",
    description:
      "Material process influence or internal decision support. Formal review, evaluation evidence and defined oversight roles.",
  },
  {
    tier: "High",
    description:
      "Significant effect on people, rights, finance, safety or public services. Enhanced assessment, dual control and continuous assurance.",
  },
];

const engagementModel = [
  {
    title: "Governance diagnostic",
    description:
      "Map current AI usage, control gaps, policy maturity and priority remediation themes.",
  },
  {
    title: "Framework design",
    description:
      "Define principles, risk tiers, lifecycle gates, RACI and evidence requirements tailored to your context.",
  },
  {
    title: "Operating model stand-up",
    description:
      "Implement intake, inventory, review forums, monitoring playbooks and reporting cadence.",
  },
  {
    title: "Command centre enablement",
    description:
      "Configure governance workflows and dashboards so inventory, risk and oversight stay visible.",
  },
];

export default async function AIGovernancePage() {
  return (
    <CmsBlocksOrFallback slug="governance-page">
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "AI Governance", path: "/ai-governance" },
            ]),
          ),
        }}
      />

      <Section
        eyebrow="Responsible AI"
        title="AI governance that makes responsible use operational"
        description="Agrayian helps enterprises and government organisations move from principles to practice — inventorying AI systems, classifying risk, enforcing lifecycle controls and maintaining evidence for leadership and audit."
        className="pt-10 md:pt-16"
        cta={
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href="/contact">Book a Consultation</PrimaryButton>
            <SecondaryButton href="/ai-centre-of-excellence">
              Explore AI CoE
            </SecondaryButton>
          </div>
        }
      >
        <GovernanceLifecyclePath />
      </Section>

      <Section
        tone="elevated"
        eyebrow="Context"
        title="Why governance matters"
        description="Responsible AI is not a communications exercise. It is the operating discipline that keeps innovation aligned with accountability, privacy, fairness and organisational risk appetite."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {whyMatters.map((item) => (
            <RevealItem key={item.title}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-primary/50 p-6">
                <h3 className="font-heading text-lg font-semibold text-text-on-dark">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-dark">
                  {item.description}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        eyebrow="Exposure"
        title="Risks from uncontrolled AI"
        description="When AI spreads without inventory, ownership and proportionate controls, organisations accumulate operational, legal and reputational exposure."
      >
        <Reveal>
          <ul className="grid gap-3 md:grid-cols-2">
            {uncontrolledRisks.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 bg-bg-elevated/40 px-4 py-3 text-sm text-muted-dark"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section
        tone="elevated"
        eyebrow="Framework"
        title="Agrayian AI governance framework"
        description="A practical control system covering policy, inventory, risk tiers, lifecycle gates, technical safeguards and assurance reporting."
      >
        <Reveal>
          <ArchitectureDiagram nodes={frameworkNodes} />
        </Reveal>
      </Section>

      <Section
        eyebrow="Operating model"
        title="How governance runs day to day"
        description="Governance works when roles, forums and evidence requirements are explicit across the full lifecycle — not only at project kickoff."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {operatingModel.map((item) => (
            <RevealItem key={item.title}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-elevated/40 p-5">
                <h3 className="font-heading text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-dark">
                  {item.description}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        tone="elevated"
        eyebrow="Inventory"
        title="Use-case inventory"
        description="You cannot govern what you cannot see. A living inventory captures systems, owners, purpose, data classes, model types, risk tier and lifecycle status."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {[
            "Proposed, approved, production and retired systems in one register.",
            "Ownership spanning business sponsor, technical owner and control contacts.",
            "Links to assessment evidence, monitoring status and material changes.",
          ].map((item) => (
            <RevealItem key={item}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-primary/50 p-5 text-sm leading-relaxed text-muted-dark">
                {item}
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        eyebrow="Risk"
        title="Risk classification"
        description="Proportionate oversight depends on clear tiers. Classification considers decision impact, population sensitivity, autonomy level, data sensitivity and reversibility."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {riskTiers.map((item) => (
            <RevealItem key={item.tier}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-elevated/40 p-6">
                <Badge variant={item.tier === "High" ? "brand" : "cyan"}>
                  {item.tier} risk
                </Badge>
                <p className="mt-4 text-sm leading-relaxed text-muted-dark">
                  {item.description}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        tone="elevated"
        eyebrow="Lifecycle"
        title="Model and AI system lifecycle"
        description="From submission to retirement, every material AI system moves through controlled stages with evidence, owners and exit criteria."
      >
        <Reveal className="rounded-xl border border-white/10 bg-bg-primary/50 p-5 text-sm leading-relaxed text-muted-dark">
          Gates are risk-sensitive: low-risk assistants may move with lightweight
          checks, while high-impact systems require enhanced review, validation,
          dual control and scheduled re-assessment.
        </Reveal>
      </Section>

      <Section
        eyebrow="Transparency"
        title="Explainability"
        description="Explainability is contextual. Operators, affected users, auditors and model owners need different levels of rationale, evidence and documentation."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Decision support clarity",
              text: "Surface the factors, sources or confidence signals that informed a recommendation so humans can challenge or accept it.",
            },
            {
              title: "Assurance documentation",
              text: "Retain methodology notes, evaluation results, known limitations and change history for independent review.",
            },
          ].map((item) => (
            <RevealItem key={item.title}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-elevated/40 p-6">
                <h3 className="font-heading text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-dark">
                  {item.text}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        tone="elevated"
        eyebrow="Fairness"
        title="Bias and fairness"
        description="Where AI influences opportunities, services or enforcement, fairness review must be designed into data selection, evaluation, monitoring and escalation."
      >
        <Reveal>
          <ul className="grid gap-3 md:grid-cols-2">
            {[
              "Define protected attributes and relevant fairness questions for the use case.",
              "Test for adverse impact where legally and ethically appropriate.",
              "Document limitations when proxy variables or sparse data constrain analysis.",
              "Require human review pathways for contested or high-stakes outcomes.",
            ].map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 bg-bg-primary/50 px-4 py-3 text-sm text-muted-dark"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section
        eyebrow="Accountability"
        title="Human oversight"
        description="Human oversight is not a slogan. It requires role design, intervention rights, escalation paths and logs that show when AI advice was accepted, overridden or escalated."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {[
            "Clear boundaries between advisory AI and human decision authority.",
            "Operational playbooks for exceptions and contested outcomes.",
            "Evidence that oversight is exercised, not merely available.",
          ].map((item) => (
            <RevealItem key={item}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-elevated/40 p-5 text-sm leading-relaxed text-muted-dark">
                {item}
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        tone="elevated"
        eyebrow="Protection"
        title="Privacy and security"
        description="AI systems inherit and can amplify data risk. Governance must cover purpose limitation, minimisation, access control, retention, secure prompt and context handling, and model-supply-chain exposure."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Data controls",
              text: "Classify data used for training, retrieval and inference; enforce access, retention and redaction rules by use case.",
            },
            {
              title: "Security controls",
              text: "Protect against misuse, prompt injection, data leakage and unauthorised model or tool invocation in production workflows.",
            },
          ].map((item) => (
            <RevealItem key={item.title}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-primary/50 p-6">
                <h3 className="font-heading text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-dark">
                  {item.text}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        eyebrow="Operations"
        title="Monitoring and incidents"
        description="Production AI needs ongoing observation for performance drift, misuse, fairness signals, control failures and user-reported harm."
      >
        <Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Define monitoring metrics and thresholds before go-live.",
              "Assign incident severity, owners and communication paths.",
              "Trigger re-assessment after material model, data or process change.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-bg-elevated/40 p-5 text-sm text-muted-dark"
              >
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section
        tone="elevated"
        eyebrow="Assurance"
        title="AI audit"
        description="Audit readiness means evidence is produced through the lifecycle — intake records, approvals, evaluation results, oversight logs, monitoring reports and retirement decisions."
      >
        <Reveal className="rounded-xl border border-white/10 bg-bg-primary/50 p-6 text-sm leading-relaxed text-muted-dark">
          Agrayian helps organisations design audit trails that answer practical
          questions: what systems exist, why they were approved, how they were
          tested, who oversees them, what changed, and how issues were handled.
        </Reveal>
      </Section>

      <Section
        eyebrow="Vendors"
        title="Third-party AI risk"
        description="Vendor and embedded AI requires the same discipline as internal builds: inventory, contractual safeguards, security assessment, data handling clarity and ongoing monitoring."
      >
        <Reveal>
          <ul className="grid gap-3 md:grid-cols-2">
            {[
              "Identify where third-party models or copilots touch enterprise workflows.",
              "Assess data residency, retention, subprocessors and training-use clauses.",
              "Define acceptable use and human oversight for vendor-provided outputs.",
              "Include exit and substitution plans for material AI dependencies.",
            ].map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 bg-bg-elevated/40 px-4 py-3 text-sm text-muted-dark"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section
        tone="elevated"
        eyebrow="Visibility"
        title="Governance dashboard preview"
        description="Leadership and control teams need a shared view of inventory, risk posture, assessments and incidents. Below is a demonstration interface using sample data only."
      >
        <GovernanceDashboardLazy />
      </Section>

      <Section
        eyebrow="Engage"
        title="Engagement model"
        description="Whether you need a diagnostic, a full framework or an operating command centre, Agrayian structures governance work as a practical delivery programme."
      >
        <RevealGroup className="grid gap-4 md:grid-cols-2">
          {engagementModel.map((item) => (
            <RevealItem key={item.title}>
              <article className="h-full rounded-xl border border-white/10 bg-bg-elevated/40 p-6">
                <h3 className="font-heading text-lg font-semibold text-text-on-dark">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-dark">
                  {item.description}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-8">
          <PrimaryButton href="/contact">
            Discuss AI Governance
          </PrimaryButton>
        </div>
      </Section>

      <CTASection
        title="Make responsible AI measurable, reviewable and operable"
        secondaryHref="/products/ai-governance-command-centre"
        secondaryLabel="View Governance Product"
      />
    </>
    </CmsBlocksOrFallback>
  );
}
