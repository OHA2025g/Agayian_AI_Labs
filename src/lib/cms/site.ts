import { cache } from "react";
import { brandCopy, siteConfig, type SiteConfig } from "@/config/site";
import {
  capabilityNav,
  capabilityRibbon,
  defaultHeaderCta,
  footerCapabilities,
  footerCompany,
  footerContact,
  footerExplore,
  footerIndustries,
  footerLegal,
  footerProducts,
  footerResources,
  mainNavigation,
} from "@/data/navigation";
import { getPublishedGlobal } from "@/lib/cms/published";
import type { NavItem } from "@/types";

export type ResolvedAnnouncement = {
  enabled: boolean;
  message: string;
  href: string;
  ctaLabel: string;
};

export type ResolvedMarketing = {
  googleTagManagerId?: string;
  gaMeasurementId?: string;
  metaPixelId?: string;
  linkedinPartnerId?: string;
  defaultUtmSource?: string;
};

export type ResolvedSite = SiteConfig & {
  seo: { title: string; description: string; image: string };
  announcement: ResolvedAnnouncement;
  marketing: ResolvedMarketing;
  cookie: { title: string; description: string };
  brand: {
    headline: string;
    supporting: string;
    primaryCta: string;
    secondaryCta: string;
    trustStatement: string;
  };
};

export type ResolvedNav = {
  main: NavItem[];
  headerCta: { label: string; href: string };
  footerCapabilities: NavItem[];
  footerProducts: NavItem[];
  footerIndustries: NavItem[];
  footerCompany: NavItem[];
  footerResources: NavItem[];
  footerExplore: NavItem[];
  footerContact: NavItem[];
  footerLegal: NavItem[];
  capabilityNav: NavItem[];
  capabilityRibbon: string[];
};

type LinkDoc = { label?: string | null; href?: string | null; shortLabel?: string | null };

function canonicalizeHref(href: string): string {
  if (href === "/capabilities#ai-coe") return "/ai-centre-of-excellence";
  try {
    const url = new URL(href, "https://agrayian.local");
    const product = url.searchParams.get("product");
    if (url.pathname === "/products" && product) {
      return `/products/${product}`;
    }
    const industry = url.searchParams.get("industry");
    if (url.pathname === "/industries" && industry) {
      return `/industries/${industry}`;
    }
  } catch {
    return href;
  }
  return href;
}

function mapLinks(value: unknown, fallback: NavItem[]): NavItem[] {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const mapped = value
    .map((item) => {
      const link = item as LinkDoc;
      if (!link.label || !link.href) return null;
      const href = canonicalizeHref(link.href);
      if (!isSafeHref(href)) return null;
      return {
        label: link.label,
        href,
        ...(link.shortLabel ? { shortLabel: link.shortLabel } : {}),
      };
    })
    .filter((item): item is NavItem => Boolean(item));
  return mapped.length ? mapped : fallback;
}

function asText(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function isSafeHref(href: string) {
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return true;
  }
  try {
    const url = new URL(href);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function mediaUrl(value: unknown): string | undefined {
  if (value && typeof value === "object" && "url" in value) {
    const url = (value as { url?: unknown }).url;
    if (typeof url === "string" && url) return url;
  }
  return undefined;
}

function mergeRequiredLinks(items: NavItem[], required: NavItem[]): NavItem[] {
  const hrefs = new Set(items.map((item) => item.href));
  const extra = required.filter((item) => !hrefs.has(item.href));
  return extra.length ? [...items, ...extra] : items;
}

function mergeRequiredNav(items: NavItem[], required: NavItem[]): NavItem[] {
  return mergeRequiredLinks(items, required).filter((item) => item.href !== "/contact");
}

function withoutResourcePages(items: NavItem[]): NavItem[] {
  return items.filter(
    (item) =>
      !item.href.startsWith("/resources") &&
      item.label.toLowerCase() !== "resources",
  );
}

const defaultCookie = {
  title: "Cookie preferences",
  description:
    "Essential cookies keep the site working. If you accept all, we also load privacy-friendly analytics for aggregate usage and performance.",
};

export const getResolvedSite = cache(async (): Promise<ResolvedSite> => {
  const doc = await getPublishedGlobal<Record<string, unknown>>("site-settings");
  const social = (doc?.socialLinks as SiteConfig["socialLinks"] | undefined) ?? {};
  const seo = (doc?.seoDefaults as Record<string, unknown> | undefined) ?? {};
  const announcement = (doc?.announcement as Record<string, unknown> | undefined) ?? {};
  const marketing = (doc?.marketing as Record<string, unknown> | undefined) ?? {};
  const cookie = (doc?.cookie as Record<string, unknown> | undefined) ?? {};
  const brand = (doc?.brandCopy as Record<string, unknown> | undefined) ?? {};

  return {
    name: asText(doc?.name, siteConfig.name),
    shortName: asText(doc?.shortName, siteConfig.shortName),
    description: asText(doc?.description, siteConfig.description),
    websiteUrl: asText(doc?.websiteUrl, siteConfig.websiteUrl),
    contactEmail: asText(doc?.contactEmail, siteConfig.contactEmail ?? "") || undefined,
    contactPhone: asText(doc?.contactPhone, siteConfig.contactPhone ?? "") || undefined,
    address: asText(doc?.address, siteConfig.address ?? "") || undefined,
    socialLinks: {
      linkedin: asText(social.linkedin, siteConfig.socialLinks.linkedin ?? "") || undefined,
      youtube: asText(social.youtube, siteConfig.socialLinks.youtube ?? "") || undefined,
      instagram: asText(social.instagram, siteConfig.socialLinks.instagram ?? "") || undefined,
      x: asText(social.x, siteConfig.socialLinks.x ?? "") || undefined,
    },
    seo: {
      title: asText(seo.title, `${siteConfig.name} | ${brandCopy.tagline}`),
      description: asText(seo.description, brandCopy.supporting),
      image: mediaUrl(seo.ogImage) ?? "/og-default.png",
    },
    announcement: {
      enabled: Boolean(announcement.enabled) && Boolean(asText(announcement.message, "")),
      message: asText(announcement.message, brandCopy.announcement),
      href: isSafeHref(asText(announcement.href, "/ai-centre-of-excellence"))
        ? asText(announcement.href, "/ai-centre-of-excellence")
        : "/ai-centre-of-excellence",
      ctaLabel: asText(announcement.ctaLabel, "Explore AI CoE"),
    },
    marketing: {
      googleTagManagerId: asText(marketing.googleTagManagerId, "") || undefined,
      gaMeasurementId: asText(marketing.gaMeasurementId, "") || undefined,
      metaPixelId: asText(marketing.metaPixelId, "") || undefined,
      linkedinPartnerId: asText(marketing.linkedinPartnerId, "") || undefined,
      defaultUtmSource: asText(marketing.defaultUtmSource, "") || undefined,
    },
    cookie: {
      title: asText(cookie.title, defaultCookie.title),
      description: asText(cookie.description, defaultCookie.description),
    },
    brand: {
      headline: asText(brand.headline, brandCopy.headline),
      supporting: asText(brand.supporting, brandCopy.supporting),
      primaryCta: asText(brand.primaryCta, brandCopy.primaryCta),
      secondaryCta: asText(brand.secondaryCta, brandCopy.secondaryCta),
      trustStatement: brandCopy.trustStatement,
    },
  };
});

export const getResolvedNav = cache(async (): Promise<ResolvedNav> => {
  const doc = await getPublishedGlobal<Record<string, unknown>>("navigation");
  const cta = (doc?.primaryCta as Record<string, unknown> | undefined) ?? {};
  const href = asText(cta.href, defaultHeaderCta.href);

  return {
    main: withoutResourcePages(
      mergeRequiredNav(mapLinks(doc?.main, mainNavigation), mainNavigation),
    ),
    headerCta: {
      label: asText(cta.label, defaultHeaderCta.label),
      href: isSafeHref(href) ? href : defaultHeaderCta.href,
    },
    footerCapabilities: withoutResourcePages(
      mapLinks(doc?.footerCapabilities, footerCapabilities),
    ),
    footerProducts: withoutResourcePages(
      mapLinks(doc?.footerProducts, footerProducts),
    ),
    footerIndustries: withoutResourcePages(
      mapLinks(doc?.footerIndustries, footerIndustries),
    ),
    footerCompany: withoutResourcePages(
      mapLinks(doc?.footerCompany, footerCompany),
    ),
    footerResources: withoutResourcePages(
      mapLinks(doc?.footerResources, footerResources),
    ),
    footerExplore: withoutResourcePages(
      mapLinks(doc?.footerExplore, footerExplore),
    ),
    footerContact: mapLinks(doc?.footerContact, footerContact),
    footerLegal: mergeRequiredLinks(mapLinks(doc?.footerLegal, footerLegal), footerLegal),
    capabilityNav: mapLinks(doc?.capabilityNav, capabilityNav),
    capabilityRibbon: Array.isArray(doc?.capabilityRibbon) && doc.capabilityRibbon.length
      ? (doc.capabilityRibbon as unknown[]).map(String)
      : [...capabilityRibbon],
  };
});
