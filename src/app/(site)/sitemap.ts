import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import {
  getImpactStories,
  getIndustries,
  getInsights,
  getProducts,
} from "@/lib/cms/catalog";

const routes = [
  "",
  "/capabilities",
  "/products",
  "/industries",
  "/ai-centre-of-excellence",
  "/ai-governance",
  "/impact-stories",
  "/insights",
  "/company",
  "/contact",
  "/trust",
  "/privacy-policy",
  "/terms-of-use",
  "/responsible-ai",
  "/cookie-policy",
  "/accessibility-statement",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const [products, stories, insights, industries] = await Promise.all([
    getProducts(),
    getImpactStories(),
    getInsights(),
    getIndustries(),
  ]);

  const staticEntries = routes.map((route) => ({
    url: `${siteConfig.websiteUrl}${route}`,
    lastModified,
    changeFrequency: (route === "" ? "weekly" : "monthly") as
      | "weekly"
      | "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  return [
    ...staticEntries,
    ...products.map((product) => ({
      url: `${siteConfig.websiteUrl}/products/${product.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...stories.map((story) => ({
      url: `${siteConfig.websiteUrl}/impact-stories/${story.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
    ...industries.map((industry) => ({
      url: `${siteConfig.websiteUrl}/industries/${industry.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...insights.map((insight) => ({
      url: `${siteConfig.websiteUrl}/insights/${insight.slug}`,
      lastModified: new Date(insight.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
