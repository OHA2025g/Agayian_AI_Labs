import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path = "",
  image = "/og-default.png",
  type = "website",
}: BuildMetadataInput): Metadata {
  const url = `${siteConfig.websiteUrl}${path}`;
  const brandSuffix = `| ${siteConfig.name}`;
  const fullTitle =
    title === siteConfig.name || title.endsWith(brandSuffix)
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
      siteName: siteConfig.name,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export function organisationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.websiteUrl,
    description: siteConfig.description,
    email: siteConfig.contactEmail,
    sameAs: Object.values(siteConfig.socialLinks).filter(Boolean),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.websiteUrl,
    description: siteConfig.description,
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.websiteUrl}${item.path}`,
    })),
  };
}
