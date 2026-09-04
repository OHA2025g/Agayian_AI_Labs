import { revalidatePath } from "next/cache";

const GLOBAL_PATHS: Record<string, string[]> = {
  "home-page": ["/"],
  "capabilities-page": ["/capabilities"],
  "products-page": ["/products"],
  "coe-page": ["/ai-centre-of-excellence"],
  "governance-page": ["/ai-governance"],
  "company-page": ["/company"],
  "contact-page": ["/contact"],
  "trust-page": ["/trust"],
  "site-settings": ["/"],
  navigation: ["/"],
  "privacy-policy": ["/privacy-policy"],
  "terms-of-use": ["/terms-of-use"],
  "responsible-ai": ["/responsible-ai"],
  "cookie-policy": ["/cookie-policy"],
  "accessibility-statement": ["/accessibility-statement"],
};

const COLLECTION_PATHS: Record<string, string> = {
  products: "/products",
  capabilities: "/capabilities",
  industries: "/industries",
  "impact-stories": "/impact-stories",
  insights: "/insights",
  faqs: "/contact",
  "team-members": "/company/leadership",
  careers: "/company/careers",
};

export function revalidateGlobal(slug: string) {
  for (const path of GLOBAL_PATHS[slug] ?? ["/"]) {
    revalidatePath(path);
  }
  revalidatePath("/sitemap.xml");
}

export function revalidateCollection(collection: string, slug?: string) {
  const base = COLLECTION_PATHS[collection];
  if (base) revalidatePath(base);
  if (base && slug) revalidatePath(`${base}/${slug}`);
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
}
