import type { TimelineStep } from "@/components/visualisations/ProcessTimeline";

export const deliverySteps: TimelineStep[] = [
  {
    title: "Discover",
    objective: "Clarify outcomes, constraints and readiness.",
    activities: [
      "Stakeholder discovery",
      "Data and process mapping",
      "Risk and opportunity scan",
    ],
    deliverable: "Discovery brief and prioritised opportunity map",
  },
  {
    title: "Design",
    objective: "Shape the operating model, architecture and controls.",
    activities: [
      "Solution and experience design",
      "Governance design",
      "Delivery plan and success measures",
    ],
    deliverable: "Target design and implementation blueprint",
  },
  {
    title: "Develop",
    objective: "Build, integrate and validate production-ready capability.",
    activities: [
      "Platform and product engineering",
      "Model and workflow development",
      "Evaluation and hardening",
    ],
    deliverable: "Working system with evaluation evidence",
  },
  {
    title: "Govern",
    objective: "Embed oversight, monitoring and auditability.",
    activities: [
      "Policy and control implementation",
      "Human oversight pathways",
      "Monitoring and incident playbooks",
    ],
    deliverable: "Governed operating package",
  },
  {
    title: "Scale",
    objective: "Expand adoption and reuse with measured value.",
    activities: [
      "Reuse of components and playbooks",
      "Capability enablement",
      "Benefits tracking and optimisation",
    ],
    deliverable: "Scale roadmap and value dashboard",
  },
];
