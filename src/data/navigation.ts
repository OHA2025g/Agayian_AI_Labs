import type { NavItem } from "@/types";

/** Primary chrome — kept short for a clean Upswing-style header. */
export const mainNavigation: NavItem[] = [
  { label: "Capabilities", href: "/capabilities", shortLabel: "Capabilities" },
  { label: "Products", href: "/products", shortLabel: "Products" },
  { label: "Industries", href: "/industries", shortLabel: "Industries" },
  {
    label: "AI CoE",
    href: "/ai-centre-of-excellence",
    shortLabel: "AI CoE",
  },
  { label: "Governance", href: "/ai-governance", shortLabel: "Governance" },
  { label: "Company", href: "/company", shortLabel: "Company" },
  { label: "Contact", href: "/contact", shortLabel: "Contact" },
];

export const capabilityRibbon = [
  "AI Strategy",
  "AI Centre of Excellence",
  "AI Governance",
  "Generative AI",
  "Agentic AI",
  "Data and Analytics",
  "Product Engineering",
  "Managed AI Services",
] as const;

export const capabilityNav: NavItem[] = [
  { label: "Strategy", href: "#strategy" },
  { label: "AI CoE", href: "#ai-coe" },
  { label: "Governance", href: "#governance" },
  { label: "Generative AI", href: "#generative-ai" },
  { label: "Agentic AI", href: "#agentic-ai" },
  { label: "Data", href: "#data" },
  { label: "Product Engineering", href: "#product-engineering" },
  { label: "Managed Services", href: "#managed-services" },
];

export const footerCapabilities: NavItem[] = [
  { label: "AI Strategy", href: "/capabilities#strategy" },
  { label: "AI CoE", href: "/capabilities#ai-coe" },
  { label: "AI Governance", href: "/capabilities#governance" },
  { label: "Generative AI", href: "/capabilities#generative-ai" },
  { label: "Agentic AI", href: "/capabilities#agentic-ai" },
  { label: "Data and Analytics", href: "/capabilities#data" },
];

export const footerExplore: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Impact Stories", href: "/impact-stories" },
  { label: "Insights", href: "/insights" },
  { label: "Company", href: "/company" },
];

export const footerContact: NavItem[] = [
  { label: "Book a Consultation", href: "/contact?interest=consultation" },
  { label: "Request a Demo", href: "/contact?interest=demo" },
  { label: "General Enquiry", href: "/contact?interest=general" },
];

export const footerLegal: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Responsible AI", href: "/responsible-ai" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Accessibility", href: "/accessibility-statement" },
  { label: "Cookie Preferences", href: "#cookie-preferences" },
];

/** @deprecated Use footerLegal */
export const legalNav = footerLegal;
