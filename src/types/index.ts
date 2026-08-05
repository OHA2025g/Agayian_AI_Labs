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

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  industries: string[];
  technologies: string[];
  shortDescription: string;
  valueProposition: string;
  businessProblem: string;
  solutionOverview: string;
  targetUsers: string[];
  modules: ProductModule[];
  capabilities: string[];
  workflow: ProductWorkflowStep[];
  dataSources?: string[];
  aiCapabilities?: string[];
  governance?: string[];
  architecture?: string[];
  deploymentOptions?: string[];
  outcomes: string[];
  featured: boolean;
  status: string;
  relatedCapabilities?: string[];
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

export type Industry = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  challenges: string[];
  opportunities: string[];
  capabilities: string[];
  products: string[];
  workflows: { title: string; description: string }[];
  governance: string[];
  outcomes: string[];
};

export type ImpactStory = {
  id: string;
  slug: string;
  title: string;
  clientLabel: string;
  industry: string;
  capability: string;
  solutionType: string;
  outcomeCategory: string;
  challenge: string;
  context: string;
  approach: string;
  architecture: string;
  governance: string;
  outcomes: string[];
  relatedProducts: string[];
  relatedCapabilities: string[];
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
};

export type CompanyValue = {
  title: string;
  description: string;
};
