const PREVIEW_ROUTES: Record<string, (slug: string) => string> = {
  products: (slug) => `/products/${slug}`,
  insights: (slug) => `/insights/${slug}`,
  "impact-stories": (slug) => `/impact-stories/${slug}`,
  industries: (slug) => `/industries/${slug}`,
  capabilities: (slug) => `/capabilities#${slug}`,
};

const GLOBAL_PREVIEW: Record<string, string> = {
  "home-page": "/",
  "coe-page": "/ai-centre-of-excellence",
  "governance-page": "/ai-governance",
  "company-page": "/company",
  "contact-page": "/contact",
  "trust-page": "/trust",
  "capabilities-page": "/capabilities",
  "products-page": "/products",
};

export function collectionPreviewUrl(
  collection: string,
  slug: unknown,
): string | null {
  if (typeof slug !== "string" || !slug) return null;
  const builder = PREVIEW_ROUTES[collection];
  return builder ? builder(slug) : null;
}

export function globalPreviewUrl(slug: string): string | null {
  return GLOBAL_PREVIEW[slug] ?? null;
}
