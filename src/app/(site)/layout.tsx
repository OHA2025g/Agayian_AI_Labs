import type { Metadata } from "next";
import { headers } from "next/headers";
import { permanentRedirect, redirect } from "next/navigation";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { BackToTop } from "@/components/layout/BackToTop";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { PageTransition } from "@/components/motion/PageTransition";
import { ConsentAnalytics } from "@/components/analytics/ConsentAnalytics";
import { matchRedirect } from "@/lib/cms/redirects";
import { getResolvedNav, getResolvedSite } from "@/lib/cms/site";
import { buildMetadata, organisationSchema, websiteSchema } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getResolvedSite();
  return {
    metadataBase: new URL(site.websiteUrl),
    ...buildMetadata({
      title: site.seo.title,
      description: site.seo.description,
      path: "",
      image: site.seo.image,
      site,
    }),
  };
}

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-ag-pathname");
  if (pathname) {
    const hit = await matchRedirect(pathname);
    if (hit) {
      if (hit.type === "301") permanentRedirect(hit.toPath);
      redirect(hit.toPath);
    }
  }

  const site = await getResolvedSite();
  const nav = await getResolvedNav();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-bg-primary text-text-light"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organisationSchema(site),
              websiteSchema(site),
            ]),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-cyan focus:px-4 focus:py-2 focus:text-bg-primary"
        >
          Skip to main content
        </a>
        <AnnouncementBar announcement={site.announcement} />
        <SiteHeader
          items={nav.main}
          ctaLabel={nav.headerCta.label || site.brand.primaryCta}
          ctaHref={nav.headerCta.href}
        />
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter site={site} nav={nav} />
        <CookieBanner
          title={site.cookie.title}
          description={site.cookie.description}
        />
        <ConsentAnalytics marketing={site.marketing} />
        <BackToTop />
      </body>
    </html>
  );
}
