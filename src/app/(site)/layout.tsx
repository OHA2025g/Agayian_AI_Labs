import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { BackToTop } from "@/components/layout/BackToTop";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { PageTransition } from "@/components/motion/PageTransition";
import { ConsentAnalytics } from "@/components/analytics/ConsentAnalytics";
import { brandCopy, siteConfig } from "@/config/site";
import { mainNavigation } from "@/data/navigation";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.websiteUrl),
  ...buildMetadata({
    title: `${siteConfig.name} | Growth reimagined with AI`,
    description: brandCopy.supporting,
    path: "",
  }),
};

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = mainNavigation;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg-primary text-text-light">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organisationSchema(), websiteSchema()]),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-cyan focus:px-4 focus:py-2 focus:text-bg-primary"
        >
          Skip to main content
        </a>
        <SiteHeader items={navItems} />
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
        <CookieBanner />
        <ConsentAnalytics />
        <BackToTop />
      </body>
    </html>
  );
}
