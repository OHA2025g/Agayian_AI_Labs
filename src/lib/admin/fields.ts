export type AdminField =
  | {
      kind: "text" | "textarea" | "email" | "date" | "password";
      name: string;
      label: string;
      hint?: string;
      required?: boolean;
    }
  | {
      kind: "checkbox";
      name: string;
      label: string;
      hint?: string;
    }
  | {
      kind: "select";
      name: string;
      label: string;
      options: { label: string; value: string }[];
      multiple?: boolean;
    }
  | {
      kind: "stringList";
      name: string;
      label: string;
      hint?: string;
    }
  | {
      kind: "repeatable";
      name: string;
      label: string;
      fields: AdminField[];
    }
  | {
      kind: "seo";
      name: string;
      label?: string;
    };

export type EditorTab = {
  id: string;
  label: string;
  fields: AdminField[];
};

const titled = (name: string, extra: AdminField[] = []): AdminField => ({
  kind: "repeatable",
  name,
  label: name.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
  fields: [
    { kind: "text", name: "title", label: "Title", required: true },
    { kind: "textarea", name: "description", label: "Description" },
    ...extra,
  ],
});

const seo: AdminField = { kind: "seo", name: "seo" };

const STATUS: AdminField = {
  kind: "select",
  name: "status",
  label: "Status",
  options: [
    { label: "Draft", value: "draft" },
    { label: "In review", value: "in_review" },
    { label: "Approved", value: "approved" },
    { label: "Published", value: "published" },
    { label: "Archived", value: "archived" },
  ],
};

export const homeTabs: EditorTab[] = [
  {
    id: "hero",
    label: "Hero",
    fields: [
      { kind: "text", name: "hero.eyebrow", label: "Eyebrow" },
      { kind: "text", name: "hero.headlineLine1", label: "Headline line 1" },
      { kind: "text", name: "hero.headlineLine2", label: "Headline line 2" },
      { kind: "textarea", name: "hero.supporting", label: "Supporting copy" },
      { kind: "text", name: "hero.primaryCtaLabel", label: "Primary CTA label" },
      { kind: "text", name: "hero.primaryCtaHref", label: "Primary CTA href" },
      { kind: "text", name: "hero.secondaryCtaLabel", label: "Secondary CTA label" },
      { kind: "text", name: "hero.secondaryCtaHref", label: "Secondary CTA href" },
      { kind: "text", name: "hero.trustLine", label: "Trust line" },
    ],
  },
  {
    id: "sections",
    label: "Sections",
    fields: [
      { kind: "text", name: "sections.ambition", label: "Ambition title" },
      { kind: "text", name: "sections.products", label: "Products title" },
      { kind: "text", name: "sections.industries", label: "Industries title" },
      { kind: "text", name: "sections.responsible", label: "Responsible AI title" },
      { kind: "text", name: "sections.insights", label: "Insights title" },
      { kind: "text", name: "finalCta.title", label: "Final CTA title" },
      { kind: "textarea", name: "finalCta.description", label: "Final CTA description" },
      {
        kind: "repeatable",
        name: "flagshipOverrides",
        label: "Flagship display names",
        fields: [
          { kind: "text", name: "slug", label: "Product slug", required: true },
          { kind: "text", name: "displayName", label: "Display name", required: true },
          { kind: "textarea", name: "displayDescription", label: "Display description" },
        ],
      },
    ],
  },
  { id: "seo", label: "SEO", fields: [seo] },
];

export const capabilitiesPageTabs: EditorTab[] = [
  {
    id: "hero",
    label: "Hero",
    fields: [
      { kind: "text", name: "hero.title", label: "Title" },
      { kind: "text", name: "hero.subheadLine1", label: "Subhead line 1" },
      { kind: "text", name: "hero.subheadLine2", label: "Subhead line 2" },
      { kind: "textarea", name: "hero.body", label: "Body" },
      { kind: "text", name: "hero.primaryCtaLabel", label: "Primary CTA label" },
      { kind: "text", name: "hero.primaryCtaHref", label: "Primary CTA href" },
      { kind: "text", name: "hero.secondaryCtaLabel", label: "Secondary CTA label" },
      { kind: "text", name: "hero.secondaryCtaHref", label: "Secondary CTA href" },
    ],
  },
  {
    id: "activities",
    label: "Activities",
    fields: [
      {
        kind: "repeatable",
        name: "stackActivities",
        label: "Hero stack activities",
        fields: [
          { kind: "text", name: "label", label: "Label", required: true },
          { kind: "text", name: "mark", label: "Mark id" },
        ],
      },
      {
        kind: "repeatable",
        name: "journeyLabels",
        label: "On this page labels",
        fields: [
          { kind: "text", name: "label", label: "Label", required: true },
          { kind: "text", name: "href", label: "Href", required: true },
        ],
      },
    ],
  },
  { id: "seo", label: "SEO", fields: [seo] },
];

export const productsPageTabs: EditorTab[] = [
  {
    id: "hero",
    label: "Hero",
    fields: [
      { kind: "text", name: "hero.eyebrow", label: "Eyebrow" },
      { kind: "textarea", name: "hero.title", label: "Title" },
      { kind: "textarea", name: "hero.description", label: "Description" },
      { kind: "text", name: "hero.searchPlaceholder", label: "Search placeholder" },
    ],
  },
  {
    id: "architecture",
    label: "Architecture",
    fields: [
      { kind: "text", name: "architecture.title", label: "Section title" },
      { kind: "text", name: "architecture.coreTitle", label: "Core title" },
      { kind: "text", name: "architecture.coreSubtitle", label: "Core subtitle" },
    ],
  },
  { id: "seo", label: "SEO", fields: [seo] },
];

export const coeTabs: EditorTab[] = [
  {
    id: "hero",
    label: "Hero",
    fields: [
      { kind: "text", name: "hero.eyebrow", label: "Eyebrow" },
      { kind: "text", name: "hero.title", label: "Title" },
      { kind: "textarea", name: "hero.description", label: "Description" },
      { kind: "text", name: "hero.primaryCtaLabel", label: "Primary CTA label" },
      { kind: "text", name: "hero.primaryCtaHref", label: "Primary CTA href" },
      { kind: "text", name: "hero.secondaryCtaLabel", label: "Secondary CTA label" },
      { kind: "text", name: "hero.secondaryCtaHref", label: "Secondary CTA href" },
      { kind: "text", name: "outcomesTitle", label: "Outcomes title" },
      { kind: "stringList", name: "outcomes", label: "Outcomes" },
    ],
  },
  {
    id: "copy",
    label: "Section copy",
    fields: [
      { kind: "text", name: "whatTitle", label: "What title" },
      { kind: "textarea", name: "whatBody", label: "What body" },
      { kind: "text", name: "whyTitle", label: "Why title" },
      { kind: "textarea", name: "whyBody", label: "Why body" },
      { kind: "text", name: "operatingTitle", label: "Operating title" },
      { kind: "textarea", name: "operatingDescription", label: "Operating description" },
      { kind: "text", name: "ideaTitle", label: "Idea title" },
      { kind: "textarea", name: "ideaDescription", label: "Idea description" },
      { kind: "text", name: "pillarsTitle", label: "Pillars title" },
      { kind: "textarea", name: "pillarsDescription", label: "Pillars description" },
      { kind: "text", name: "maturityTitle", label: "Maturity title" },
      { kind: "textarea", name: "maturityDescription", label: "Maturity description" },
      { kind: "text", name: "roadmapTitle", label: "Roadmap title" },
      { kind: "textarea", name: "roadmapDescription", label: "Roadmap description" },
      { kind: "text", name: "ctaTitle", label: "CTA title" },
      { kind: "textarea", name: "ctaDescription", label: "CTA description" },
    ],
  },
  {
    id: "model",
    label: "Operating model",
    fields: [
      {
        kind: "repeatable",
        name: "layers",
        label: "Layers",
        fields: [
          { kind: "text", name: "number", label: "Number" },
          { kind: "text", name: "title", label: "Title", required: true },
          { kind: "textarea", name: "description", label: "Description" },
          { kind: "text", name: "icon", label: "Icon key" },
        ],
      },
      titled("whatFeatures", [{ kind: "text", name: "icon", label: "Icon key" }, { kind: "text", name: "detail", label: "Detail" }]),
      titled("whyFeatures", [{ kind: "text", name: "icon", label: "Icon key" }, { kind: "textarea", name: "detail", label: "Detail" }]),
      titled("intakeSteps", [{ kind: "text", name: "icon", label: "Icon key" }]),
      titled("pillars", [{ kind: "text", name: "icon", label: "Icon key" }]),
      {
        kind: "repeatable",
        name: "foundations",
        label: "Foundations",
        fields: [
          { kind: "text", name: "title", label: "Title", required: true },
          { kind: "textarea", name: "description", label: "Description" },
          { kind: "text", name: "icon", label: "Icon key" },
          { kind: "text", name: "sculpture", label: "Sculpture key" },
          { kind: "stringList", name: "items", label: "Items" },
        ],
      },
      {
        kind: "repeatable",
        name: "maturity",
        label: "Maturity",
        fields: [
          { kind: "text", name: "name", label: "Name", required: true },
          { kind: "textarea", name: "description", label: "Description" },
          { kind: "text", name: "icon", label: "Icon key" },
        ],
      },
      {
        kind: "repeatable",
        name: "roadmap",
        label: "Roadmap",
        fields: [
          { kind: "text", name: "name", label: "Name", required: true },
          { kind: "textarea", name: "description", label: "Description" },
          { kind: "text", name: "icon", label: "Icon key" },
        ],
      },
      {
        kind: "repeatable",
        name: "faqItems",
        label: "FAQs",
        fields: [
          { kind: "text", name: "question", label: "Question", required: true },
          { kind: "textarea", name: "answer", label: "Answer", required: true },
        ],
      },
    ],
  },
  { id: "seo", label: "SEO", fields: [seo] },
];

export const governanceTabs: EditorTab[] = [
  {
    id: "hero",
    label: "Hero",
    fields: [
      { kind: "text", name: "hero.title", label: "Title" },
      { kind: "text", name: "hero.subtitle", label: "Subtitle" },
      { kind: "textarea", name: "hero.description", label: "Description" },
      { kind: "text", name: "hero.primaryCtaLabel", label: "Primary CTA label" },
      { kind: "text", name: "hero.primaryCtaHref", label: "Primary CTA href" },
      { kind: "text", name: "hero.secondaryCtaLabel", label: "Secondary CTA label" },
      { kind: "text", name: "hero.secondaryCtaHref", label: "Secondary CTA href" },
    ],
  },
  {
    id: "copy",
    label: "Section copy",
    fields: [
      { kind: "text", name: "pillarsTitle", label: "Pillars title" },
      { kind: "text", name: "raciTitle", label: "RACI title" },
      { kind: "textarea", name: "raciDescription", label: "RACI description" },
      { kind: "text", name: "commandTitle", label: "Command title" },
      { kind: "textarea", name: "commandDescription", label: "Command description" },
      { kind: "text", name: "engagementTitle", label: "Engagement title" },
      { kind: "textarea", name: "engagementDescription", label: "Engagement description" },
      { kind: "text", name: "ctaTitle", label: "CTA title" },
      { kind: "textarea", name: "ctaDescription", label: "CTA description" },
    ],
  },
  {
    id: "model",
    label: "Framework",
    fields: [
      {
        kind: "repeatable",
        name: "lifecycle",
        label: "Lifecycle",
        fields: [
          { kind: "text", name: "label", label: "Label", required: true },
          { kind: "text", name: "icon", label: "Icon key" },
        ],
      },
      titled("pillars", [{ kind: "text", name: "icon", label: "Icon key" }]),
      {
        kind: "repeatable",
        name: "raciRows",
        label: "RACI rows",
        fields: [
          { kind: "text", name: "role", label: "Role", required: true },
          { kind: "stringList", name: "cells", label: "Cells" },
        ],
      },
      titled("engagementSteps", [{ kind: "text", name: "icon", label: "Icon key" }]),
    ],
  },
  { id: "seo", label: "SEO", fields: [seo] },
];

export const companyTabs: EditorTab[] = [
  {
    id: "overview",
    label: "Overview",
    fields: [
      { kind: "textarea", name: "introduction", label: "Introduction" },
      { kind: "textarea", name: "vision", label: "Vision" },
      { kind: "textarea", name: "mission", label: "Mission" },
      { kind: "stringList", name: "whyAgrayian", label: "Why Agrayian" },
    ],
  },
  {
    id: "content",
    label: "Content",
    fields: [
      titled("values"),
      { kind: "stringList", name: "deliveryPhilosophy", label: "Delivery philosophy" },
      { kind: "textarea", name: "responsibleAiCommitment", label: "Responsible AI commitment" },
      { kind: "textarea", name: "technologyPhilosophy", label: "Technology philosophy" },
      { kind: "textarea", name: "careersCopy", label: "Careers copy" },
      { kind: "textarea", name: "partnerEcosystemCopy", label: "Partner ecosystem copy" },
      titled("howWeWork"),
    ],
  },
  { id: "seo", label: "SEO", fields: [seo] },
];

export const contactTabs: EditorTab[] = [
  {
    id: "overview",
    label: "Overview",
    fields: [
      { kind: "text", name: "title", label: "Title" },
      { kind: "textarea", name: "description", label: "Description" },
      { kind: "stringList", name: "enquiryThemes", label: "Enquiry themes" },
      titled("consultationFlow"),
      { kind: "text", name: "form.heading", label: "Form heading" },
      { kind: "textarea", name: "form.successMessage", label: "Success message" },
      { kind: "textarea", name: "form.errorMessage", label: "Error message" },
      { kind: "textarea", name: "form.consentText", label: "Consent text" },
      { kind: "text", name: "form.submitLabel", label: "Submit label" },
    ],
  },
  { id: "seo", label: "SEO", fields: [seo] },
];

export const trustTabs: EditorTab[] = [
  {
    id: "content",
    label: "Content",
    fields: [
      { kind: "text", name: "title", label: "Title" },
      { kind: "textarea", name: "description", label: "Description" },
      { kind: "textarea", name: "intro", label: "Intro" },
      titled("principles"),
      { kind: "text", name: "ctaTitle", label: "CTA title" },
      { kind: "textarea", name: "ctaDescription", label: "CTA description" },
      { kind: "text", name: "ctaLabel", label: "CTA label" },
      { kind: "text", name: "ctaHref", label: "CTA href" },
    ],
  },
  { id: "seo", label: "SEO", fields: [seo] },
];

export const legalTabs: EditorTab[] = [
  {
    id: "content",
    label: "Content",
    fields: [
      { kind: "text", name: "title", label: "Title", required: true },
      { kind: "textarea", name: "description", label: "Description" },
      {
        kind: "repeatable",
        name: "sections",
        label: "Sections",
        fields: [
          { kind: "text", name: "heading", label: "Heading", required: true },
          { kind: "textarea", name: "body", label: "Body", required: true },
        ],
      },
    ],
  },
  { id: "seo", label: "SEO", fields: [seo] },
];

const linkFields: AdminField[] = [
  { kind: "text", name: "label", label: "Label", required: true },
  { kind: "text", name: "href", label: "Href", required: true },
  { kind: "text", name: "shortLabel", label: "Short label" },
];

export const navigationTabs: EditorTab[] = [
  {
    id: "header",
    label: "Header",
    fields: [
      { kind: "repeatable", name: "main", label: "Primary links", fields: linkFields },
      { kind: "text", name: "primaryCta.label", label: "Consultation label" },
      { kind: "text", name: "primaryCta.href", label: "Consultation href" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { kind: "repeatable", name: "footerCapabilities", label: "Capabilities", fields: linkFields },
      { kind: "repeatable", name: "footerProducts", label: "Products", fields: linkFields },
      { kind: "repeatable", name: "footerIndustries", label: "Industries", fields: linkFields },
      { kind: "repeatable", name: "footerCompany", label: "Company", fields: linkFields },
      {
        kind: "repeatable",
        name: "footerResources",
        label: "Insights and Impact",
        fields: linkFields,
      },
      { kind: "repeatable", name: "footerLegal", label: "Legal", fields: linkFields },
    ],
  },
];

export const settingsTabs: EditorTab[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { kind: "text", name: "name", label: "Site name", required: true },
      { kind: "text", name: "shortName", label: "Short name" },
      { kind: "text", name: "websiteUrl", label: "Public URL", required: true },
      { kind: "textarea", name: "description", label: "Description" },
      { kind: "text", name: "brandCopy.headline", label: "Brand headline" },
      { kind: "textarea", name: "brandCopy.supporting", label: "Brand supporting" },
      { kind: "text", name: "brandCopy.primaryCta", label: "Primary CTA" },
      { kind: "text", name: "brandCopy.secondaryCta", label: "Secondary CTA" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    fields: [
      { kind: "email", name: "contactEmail", label: "Contact email" },
      { kind: "text", name: "contactPhone", label: "Phone" },
      { kind: "textarea", name: "address", label: "Address" },
      { kind: "text", name: "socialLinks.linkedin", label: "LinkedIn" },
      { kind: "text", name: "socialLinks.youtube", label: "YouTube" },
      { kind: "text", name: "socialLinks.instagram", label: "Instagram" },
      { kind: "text", name: "socialLinks.x", label: "X" },
    ],
  },
  {
    id: "seo",
    label: "SEO defaults",
    fields: [
      { kind: "text", name: "seoDefaults.title", label: "Default title" },
      { kind: "textarea", name: "seoDefaults.description", label: "Default description" },
    ],
  },
  {
    id: "announcement",
    label: "Announcement",
    fields: [
      { kind: "checkbox", name: "announcement.enabled", label: "Enabled" },
      { kind: "text", name: "announcement.message", label: "Message" },
      { kind: "text", name: "announcement.href", label: "Href" },
      { kind: "text", name: "announcement.ctaLabel", label: "CTA label" },
    ],
  },
  {
    id: "marketing",
    label: "Integrations",
    fields: [
      { kind: "text", name: "marketing.googleTagManagerId", label: "GTM ID" },
      { kind: "text", name: "marketing.gaMeasurementId", label: "GA measurement ID" },
      { kind: "text", name: "marketing.metaPixelId", label: "Meta pixel ID" },
      { kind: "text", name: "marketing.linkedinPartnerId", label: "LinkedIn partner ID" },
      { kind: "text", name: "marketing.defaultUtmSource", label: "Default UTM source" },
    ],
  },
  {
    id: "cookies",
    label: "Cookies",
    fields: [
      { kind: "text", name: "cookie.title", label: "Cookie title" },
      { kind: "textarea", name: "cookie.description", label: "Cookie description" },
    ],
  },
];

export const productRecordFields: AdminField[] = [
  { kind: "text", name: "name", label: "Name", required: true },
  { kind: "text", name: "slug", label: "Slug", required: true },
  { kind: "text", name: "category", label: "Category", required: true },
  { kind: "textarea", name: "shortDescription", label: "Short description", required: true },
  { kind: "checkbox", name: "featured", label: "Featured" },
  { kind: "text", name: "productStatus", label: "Availability" },
  { kind: "textarea", name: "valueProposition", label: "Value proposition" },
  { kind: "textarea", name: "businessProblem", label: "Business problem" },
  { kind: "textarea", name: "solutionOverview", label: "Solution overview" },
  { kind: "stringList", name: "industries", label: "Industries" },
  { kind: "stringList", name: "technologies", label: "Technologies" },
  { kind: "stringList", name: "targetUsers", label: "Target users" },
  { kind: "stringList", name: "outcomes", label: "Outcomes" },
  { kind: "stringList", name: "dataSources", label: "Data sources" },
  { kind: "stringList", name: "aiCapabilities", label: "AI capabilities" },
  { kind: "stringList", name: "governance", label: "Governance" },
  { kind: "stringList", name: "architecture", label: "Architecture" },
  { kind: "stringList", name: "deploymentOptions", label: "Deployment options" },
  titled("modules"),
  titled("workflow"),
  { kind: "stringList", name: "capabilities", label: "Capability slugs" },
  { kind: "stringList", name: "relatedCapabilities", label: "Related capabilities" },
  seo,
  STATUS,
];

export const capabilityRecordFields: AdminField[] = [
  { kind: "text", name: "name", label: "Name", required: true },
  { kind: "text", name: "slug", label: "Slug", required: true },
  { kind: "text", name: "shortName", label: "Short name" },
  { kind: "text", name: "icon", label: "Icon" },
  { kind: "textarea", name: "summary", label: "Summary", required: true },
  { kind: "textarea", name: "description", label: "Description" },
  { kind: "textarea", name: "businessChallenge", label: "Business challenge" },
  { kind: "stringList", name: "deliverables", label: "Deliverables" },
  { kind: "stringList", name: "engagementActivities", label: "Engagement activities" },
  { kind: "stringList", name: "typicalDeliverables", label: "Typical deliverables" },
  { kind: "stringList", name: "useCases", label: "Use cases" },
  { kind: "stringList", name: "outcomes", label: "Outcomes" },
  { kind: "stringList", name: "relatedProducts", label: "Related products" },
  { kind: "stringList", name: "topics", label: "Topics" },
  seo,
  STATUS,
];

export const industryRecordFields: AdminField[] = [
  { kind: "text", name: "name", label: "Name", required: true },
  { kind: "text", name: "slug", label: "Slug", required: true },
  { kind: "textarea", name: "summary", label: "Summary", required: true },
  { kind: "stringList", name: "challenges", label: "Challenges" },
  { kind: "stringList", name: "opportunities", label: "Opportunities" },
  { kind: "stringList", name: "governance", label: "Governance" },
  { kind: "stringList", name: "outcomes", label: "Outcomes" },
  titled("workflows"),
  seo,
  STATUS,
];

export const impactRecordFields: AdminField[] = [
  { kind: "text", name: "title", label: "Title", required: true },
  { kind: "text", name: "slug", label: "Slug", required: true },
  { kind: "text", name: "clientLabel", label: "Client label", required: true },
  { kind: "text", name: "industry", label: "Industry", required: true },
  { kind: "text", name: "capability", label: "Capability" },
  { kind: "text", name: "solutionType", label: "Solution type" },
  { kind: "text", name: "outcomeCategory", label: "Outcome category" },
  { kind: "textarea", name: "challenge", label: "Challenge" },
  { kind: "textarea", name: "context", label: "Context" },
  { kind: "textarea", name: "approach", label: "Approach" },
  { kind: "textarea", name: "architecture", label: "Architecture" },
  { kind: "textarea", name: "governance", label: "Governance" },
  { kind: "stringList", name: "outcomes", label: "Outcomes" },
  seo,
  STATUS,
];

export const insightRecordFields: AdminField[] = [
  { kind: "text", name: "title", label: "Title", required: true },
  { kind: "text", name: "slug", label: "Slug", required: true },
  { kind: "textarea", name: "excerpt", label: "Excerpt", required: true },
  { kind: "text", name: "category", label: "Category" },
  { kind: "text", name: "type", label: "Type" },
  { kind: "text", name: "author", label: "Author" },
  { kind: "text", name: "readingTime", label: "Reading time" },
  { kind: "checkbox", name: "featured", label: "Featured" },
  {
    kind: "repeatable",
    name: "bodyParagraphs",
    label: "Body paragraphs",
    fields: [{ kind: "textarea", name: "text", label: "Paragraph", required: true }],
  },
  seo,
  STATUS,
];

export const faqRecordFields: AdminField[] = [
  { kind: "text", name: "question", label: "Question", required: true },
  { kind: "textarea", name: "answer", label: "Answer", required: true },
  {
    kind: "select",
    name: "placement",
    label: "Placement",
    multiple: true,
    options: [
      { label: "Contact", value: "contact" },
      { label: "AI CoE", value: "coe" },
      { label: "Governance", value: "governance" },
      { label: "Products", value: "products" },
      { label: "Company", value: "company" },
      { label: "General", value: "general" },
    ],
  },
  STATUS,
];

export const teamRecordFields: AdminField[] = [
  { kind: "text", name: "name", label: "Name", required: true },
  { kind: "text", name: "slug", label: "Slug", required: true },
  { kind: "text", name: "title", label: "Title" },
  { kind: "textarea", name: "bio", label: "Bio" },
  { kind: "text", name: "order", label: "Order" },
  STATUS,
];

export const careerRecordFields: AdminField[] = [
  { kind: "text", name: "title", label: "Title", required: true },
  { kind: "text", name: "slug", label: "Slug", required: true },
  { kind: "text", name: "location", label: "Location" },
  { kind: "text", name: "employmentType", label: "Employment type" },
  { kind: "textarea", name: "summary", label: "Summary" },
  STATUS,
];

export const redirectRecordFields: AdminField[] = [
  { kind: "text", name: "fromPath", label: "From path", required: true },
  { kind: "text", name: "toPath", label: "To path", required: true },
  {
    kind: "select",
    name: "type",
    label: "Type",
    options: [
      { label: "301 permanent", value: "301" },
      { label: "302 temporary", value: "302" },
    ],
  },
  { kind: "checkbox", name: "enabled", label: "Enabled" },
  { kind: "textarea", name: "notes", label: "Notes" },
];

export { STATUS };
