import type { Metadata } from "next";
import { siteConfig, type SiteConfig } from "@/config/site";

type SiteLike = Pick<
  SiteConfig,
  "name" | "websiteUrl" | "description" | "contactEmail" | "socialLinks"
>;

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  site?: SiteLike;
};

export function buildMetadata({
  title,
  description,
  path = "",
  image = "/og-default.png",
  type = "website",
  site = siteConfig,
}: BuildMetadataInput): Metadata {
  const url = `${site.websiteUrl}${path}`;
  const brandSuffix = `| ${site.name}`;
  const fullTitle =
    title === site.name ||
    title.endsWith(brandSuffix) ||
    title.startsWith(site.name)
      ? title
      : `${title} ${brandSuffix}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export function organisationSchema(site: SiteLike = siteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.websiteUrl,
    description: site.description,
    email: site.contactEmail,
    sameAs: Object.values(site.socialLinks).filter(Boolean),
  };
}

export function websiteSchema(site: SiteLike = siteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.websiteUrl,
    description: site.description,
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
  site: SiteLike = siteConfig,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.websiteUrl}${item.path}`,
    })),
  };
}
