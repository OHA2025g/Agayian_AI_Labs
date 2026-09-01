import { z } from "zod";

export const interestOptions = [
  "AI consultation",
  "AI CoE",
  "AI governance",
  "Product demonstration",
  "Generative AI",
  "Agentic AI",
  "Data & Analytics",
  "Government project",
  "Enterprise solution",
  "Partnership",
  "General enquiry",
] as const;

/** Primary selectable cards on the Contact form (labels may differ from enum values). */
export const interestCardOptions = [
  {
    value: "AI consultation",
    label: "AI Strategy",
    description: "Roadmaps and investment sequencing",
  },
  {
    value: "AI CoE",
    label: "AI CoE",
    description: "Operating models that scale",
  },
  {
    value: "AI governance",
    label: "AI Governance",
    description: "Risk, lifecycle and assurance",
  },
  {
    value: "Product demonstration",
    label: "Product Demonstration",
    description: "See platforms in context",
  },
  {
    value: "Generative AI",
    label: "Generative AI",
    description: "Assistive systems with controls",
  },
  {
    value: "Agentic AI",
    label: "Agentic AI",
    description: "Bounded agents with accountability",
  },
  {
    value: "Data & Analytics",
    label: "Data & Analytics",
    description: "Trusted decision foundations",
  },
] as const satisfies ReadonlyArray<{
  value: (typeof interestOptions)[number];
  label: string;
  description: string;
}>;

export const contactMethodOptions = ["Email", "Phone", "Either"] as const;

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(120, "Name is too long"),
  workEmail: z
    .string()
    .trim()
    .email("Enter a valid work email")
    .max(160, "Email is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(40, "Phone number is too long"),
  organisation: z
    .string()
    .trim()
    .min(2, "Organisation is required")
    .max(160, "Organisation name is too long"),
  designation: z
    .string()
    .trim()
    .min(2, "Designation is required")
    .max(120, "Designation is too long"),
  country: z
    .string()
    .trim()
    .min(2, "Country is required")
    .max(100, "Country is too long"),
  areaOfInterest: z.enum(interestOptions, {
    errorMap: () => ({ message: "Select an area of interest" }),
  }),
  projectSummary: z
    .string()
    .trim()
    .min(20, "Please share a short project summary (at least 20 characters)")
    .max(4000, "Project summary is too long"),
  preferredContactMethod: z.enum(contactMethodOptions, {
    errorMap: () => ({ message: "Select a preferred contact method" }),
  }),
  consent: z.boolean().refine((value) => value === true, {
    message: "Consent is required to proceed",
  }),
  /** Honeypot field — ignored when empty; non-empty values trigger a silent success. */
  website: z.string().optional(),
  product: z.string().trim().max(120).optional(),
  industry: z.string().trim().max(160).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type ContactInterest = (typeof interestOptions)[number];

const interestQueryMap: Record<string, ContactInterest> = {
  consultation: "AI consultation",
  "ai-consultation": "AI consultation",
  strategy: "AI consultation",
  "ai-strategy": "AI consultation",
  coe: "AI CoE",
  "ai-coe": "AI CoE",
  governance: "AI governance",
  "ai-governance": "AI governance",
  demo: "Product demonstration",
  demonstration: "Product demonstration",
  "product-demonstration": "Product demonstration",
  "generative-ai": "Generative AI",
  genai: "Generative AI",
  "agentic-ai": "Agentic AI",
  agentic: "Agentic AI",
  data: "Data & Analytics",
  analytics: "Data & Analytics",
  "data-analytics": "Data & Analytics",
  government: "Government project",
  "government-project": "Government project",
  enterprise: "Enterprise solution",
  "enterprise-solution": "Enterprise solution",
  partnership: "Partnership",
  general: "General enquiry",
  "general-enquiry": "General enquiry",
};

export function resolveInterestFromQuery(
  value?: string | null,
): ContactInterest | undefined {
  if (!value) return undefined;
  const normalised = value.trim().toLowerCase();
  if ((interestOptions as readonly string[]).includes(value)) {
    return value as ContactInterest;
  }
  return interestQueryMap[normalised];
}

export const consultationFlow = [
  {
    title: "Share Requirement",
    description:
      "You tell us about your goals, challenges and interests.",
  },
  {
    title: "Internal Review",
    description:
      "Our team reviews and aligns the right experts for your needs.",
  },
  {
    title: "Discovery Discussion",
    description:
      "We connect for a focused discussion to understand and explore.",
  },
  {
    title: "Recommended Engagement",
    description:
      "We share relevant options and next steps tailored to you.",
  },
] as const;
