import { siteConfig } from "@/config/site";

export type LegalSection = { heading: string; body: string };

export type LegalDocument = {
  title: string;
  description: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description:
    "This policy explains how Agrayian AI Labs handles personal information submitted through this website. For regulated programmes, supplemental notices may apply.",
  sections: [
    {
      heading: "Who we are",
      body: `${siteConfig.name} operates this website to share information about our AI strategy, governance, CoE and product services and to receive business enquiries.`,
    },
    {
      heading: "Information we collect",
      body: "When you submit a contact or newsletter form, we may collect your name, work email, phone number, organisation, designation, country, enquiry details and communication preferences. Technical logs may include IP address, browser type and pages visited.",
    },
    {
      heading: "How we use information",
      body: "We use enquiry details to respond to your request, schedule discovery discussions and improve our services. We do not sell personal information.",
    },
    {
      heading: "Cookies",
      body: "Essential cookies support site operation and preference storage. If you choose “Accept all”, we load privacy-friendly Vercel Analytics and Speed Insights to understand aggregate page usage and performance. Those tools are not loaded when you choose “Essential only”. You can reopen preferences any time via Cookie Preferences in the footer.",
    },
    {
      heading: "Retention and security",
      body: "We retain enquiry data only as long as needed for the stated purpose or legal obligations. We apply reasonable technical and organisational measures to protect information.",
    },
    {
      heading: "Your rights",
      body: `Depending on applicable law, you may request access, correction or deletion of personal information. Contact ${siteConfig.contactEmail ?? "the organisation"} to exercise these rights.`,
    },
    {
      heading: "Updates",
      body: `We may update this policy as our practices or legal requirements evolve. The latest version will be published on this page. For jurisdiction-specific obligations, contact ${siteConfig.contactEmail}.`,
    },
  ],
};

export const termsOfUse: LegalDocument = {
  title: "Terms of Use",
  description:
    "These terms govern use of the Agrayian AI Labs website and publicly available materials.",
  sections: [
    {
      heading: "Acceptance",
      body: "By accessing this website you agree to these terms. If you do not agree, please do not use the site.",
    },
    {
      heading: "Informational purpose",
      body: "Content on this website is provided for general information about our capabilities, products and perspectives. It does not constitute legal, regulatory, financial or professional advice and does not create a client engagement unless a separate agreement is executed.",
    },
    {
      heading: "Intellectual property",
      body: `Text, visuals, frameworks and branding on this site are owned by ${siteConfig.name} or its licensors. You may not copy or redistribute materials for commercial purposes without written permission.`,
    },
    {
      heading: "No unsupported claims",
      body: "Demonstration dashboards, conceptual visuals and anonymised stories are illustrative. They should not be interpreted as guarantees of specific outcomes.",
    },
    {
      heading: "Acceptable use",
      body: "You agree not to misuse the site, attempt unauthorised access, submit malicious content or use automated means that degrade service quality.",
    },
    {
      heading: "Limitation of liability",
      body: `To the fullest extent permitted by law, ${siteConfig.name} is not liable for indirect or consequential loss arising from use of this website. Website content is provided on an as-available basis.`,
    },
    {
      heading: "Contact",
      body: `Questions about these terms may be sent to ${siteConfig.contactEmail}.`,
    },
  ],
};

export const responsibleAi: LegalDocument = {
  title: "Responsible AI",
  description:
    "We treat responsible AI as an operating discipline — policy, risk classification, human oversight, evaluation, monitoring and audit evidence woven into delivery.",
  sections: [
    {
      heading: "Purpose and proportionality",
      body: "AI should serve a clear decision or outcome, with methods proportionate to risk and benefit.",
    },
    {
      heading: "Human accountability",
      body: "People remain accountable for high-impact decisions, exceptions and escalations.",
    },
    {
      heading: "Transparency",
      body: "Stakeholders should understand where AI is used, what it influences and how to seek review.",
    },
    {
      heading: "Security and privacy",
      body: "Data minimisation, access control and secure deployment are defaults, not add-ons.",
    },
    {
      heading: "Fairness and evaluation",
      body: "Systems affecting people or public programmes require appropriate testing and documentation.",
    },
    {
      heading: "Continuous oversight",
      body: "Monitoring, incident response and retirement pathways keep systems trustworthy over time.",
    },
  ],
};

export const cookiePolicy: LegalDocument = {
  title: "Cookie Policy",
  description:
    "Essential cookies support site operation. Analytics and Speed Insights load only after you accept all cookies.",
  sections: [
    {
      heading: "Essential cookies",
      body: "We use essential cookies to remember cookie preferences and keep core site features working.",
    },
    {
      heading: "Analytics and performance",
      body: "If you choose Accept all, we load Vercel Analytics and Speed Insights for aggregate usage and performance. These are not loaded for Essential only.",
    },
    {
      heading: "Managing preferences",
      body: "You can reopen Cookie Preferences from the footer at any time.",
    },
  ],
};

export const accessibilityStatement: LegalDocument = {
  title: "Accessibility Statement",
  description:
    "We aim to make this website usable with assistive technologies and keyboard navigation.",
  sections: [
    {
      heading: "Commitment",
      body: `We aim to conform with WCAG 2.2 Level AA where practicable. Contact ${siteConfig.contactEmail ?? "hello@agrayian.ai"} to report accessibility barriers.`,
    },
    {
      heading: "Feedback",
      body: "Please include the page URL and a short description of the barrier so we can investigate.",
    },
  ],
};

export const legalByGlobal = {
  "privacy-policy": privacyPolicy,
  "terms-of-use": termsOfUse,
  "responsible-ai": responsibleAi,
  "cookie-policy": cookiePolicy,
  "accessibility-statement": accessibilityStatement,
} as const;
