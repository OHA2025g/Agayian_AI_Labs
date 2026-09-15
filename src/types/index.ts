export type NavItem = {
  label: string;
  href: string;
  /** Shorter label for medium breakpoints (e.g. AI CoE, Impact). */
  shortLabel?: string;
};

export type ProductModule = {
  title: string;
  description: string;
};

export type ProductWorkflowStep = {
  title: string;
  description: string;
};

export const PRODUCT_MATURITY = [
  "Product",
  "Pilot",
  "Demonstration",
  "Roadmap",
] as const;

export type ProductMaturity = (typeof PRODUCT_MATURITY)[number];

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  categories?: string[];
  industries: string[];
  technologies: string[];
  shortDescription: string;
  valueProposition: string;
  businessProblem: string;
  whyProcessesFail?: string;
  solutionOverview: string;
  targetUsers: string[];
  modules: ProductModule[];
  capabilities: string[];
  workflow: ProductWorkflowStep[];
  agents?: string[];
  humanApprovalPoints?: string[];
  integrations?: string[];
  dataSources?: string[];
  aiCapabilities?: string[];
  governance?: string[];
  architecture?: string[];
  deploymentOptions?: string[];
  outcomes: string[];
  outcomeHeadline?: string;
  primaryUser?: string;
  primaryWorkflow?: string;
  benefits?: string[];
  featured: boolean;
  status: string;
  maturity?: ProductMaturity;
  relatedCapabilities?: string[];
  ogImage?: string;
};

export type Capability = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  summary: string;
  description: string;
  businessChallenge: string;
  deliverables: string[];
  engagementActivities: string[];
  typicalDeliverables: string[];
  useCases: string[];
  outcomes: string[];
  relatedProducts: string[];
  topics: string[];
};

export type IndustryCapabilityIcon =
  | "unification"
  | "automation"
  | "insight"
  | "document"
  | "geospatial"
  | "language"
  | "fraud"
  | "monitoring"
  | "interop";

export type IndustryCapabilityItem = {
  title: string;
  icon: IndustryCapabilityIcon;
};

export type IndustryProductCard = {
  slug: string;
  title: string;
  description: string;
};

export type Industry = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  challenges: string[];
  priorityProblems?: string[];
  opportunities: string[];
  capabilities: string[];
  relevantCapabilities: IndustryCapabilityItem[];
  products: string[];
  productCards?: IndustryProductCard[];
  workflows: { title: string; description: string }[];
  governance: string[];
  outcomes: string[];
  ogImage?: string;
};

export const IMPACT_DELIVERY_STAGES = [
  "Completed deployment",
  "Pilot",
  "Demonstration",
  "Proposed concept",
] as const;

export type ImpactDeliveryStage = (typeof IMPACT_DELIVERY_STAGES)[number];

export type ImpactStory = {
  id: string;
  slug: string;
  title: string;
  clientLabel: string;
  industry: string;
  capability: string;
  solutionType: string;
  outcomeCategory: string;
  deliveryStage?: ImpactDeliveryStage;
  challenge: string;
  context: string;
  approach: string;
  architecture: string;
  governance: string;
  outcomes: string[];
  relatedProducts: string[];
  relatedCapabilities: string[];
  ogImage?: string;
};

export type Insight = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  type: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  featured?: boolean;
  body: string[];
  ogImage?: string;
};

export type ResourceFile = {
  url: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
};

export type Resource = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  featured: boolean;
  file?: ResourceFile;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  placement: string[];
};

export type TeamMember = {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  photoUrl?: string;
  order: number;
};

export type CareerRole = {
  id: string;
  slug: string;
  title: string;
  location: string;
  employmentType: string;
  summary: string;
};

export type CompanyValue = {
  title: string;
  description: string;
};
