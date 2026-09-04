import path from "node:path";
import { fileURLToPath } from "node:url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";
import {
  AuditLogs,
  Campaigns,
  Capabilities,
  Careers,
  ContentCalendar,
  Enquiries,
  Faqs,
  ImpactStories,
  Industries,
  Insights,
  Media,
  NewsletterSubscribers,
  Partners,
  Products,
  Redirects,
  TeamMembers,
  Testimonials,
  Users,
} from "./payload/collections";
import {
  AccessibilityStatement,
  CapabilitiesPage,
  CoePage,
  CompanyPage,
  ContactPage,
  CookiePolicy,
  GovernancePage,
  HomePage,
  Navigation,
  PrivacyPolicy,
  ProductsPage,
  ResponsibleAi,
  SiteSettings,
  TermsOfUse,
  TrustPage,
} from "./payload/globals";
import { resolveMongoUri } from "./lib/cms/mongo-env";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const skipPayloadDb =
  process.env.SKIP_PAYLOAD === "1" ||
  process.env.NEXT_PHASE === "phase-production-build";

const useS3 =
  process.env.S3_BUCKET &&
  process.env.S3_ACCESS_KEY_ID &&
  process.env.S3_SECRET_ACCESS_KEY;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " · Agrayian Admin",
      description:
        "Agrayian AI Labs content studio — pages, catalog, campaigns and inbox.",
      icons: [
        {
          rel: "icon",
          type: "image/png",
          url: "/icon.png",
        },
        {
          rel: "apple-touch-icon",
          type: "image/png",
          url: "/icon.png",
        },
      ],
      openGraph: {
        title: "Agrayian Admin",
        description: "Content studio for Agrayian AI Labs.",
        images: [{ url: "/og-default.png" }],
      },
    },
    components: {
      graphics: {
        Logo: "/payload/admin/Logo",
        Icon: "/payload/admin/Icon",
      },
      beforeDashboard: ["/payload/admin/DashboardWelcome"],
      beforeLogin: ["/payload/admin/LoginTagline"],
      afterNavLinks: ["/payload/admin/NavFooter"],
    },
    theme: "light",
  },
  routes: {
    admin: "/cms",
    api: "/cms-api",
  },
  collections: [
    Users,
    Media,
    Products,
    Capabilities,
    Industries,
    ImpactStories,
    Insights,
    Campaigns,
    ContentCalendar,
    Redirects,
    Faqs,
    TeamMembers,
    Careers,
    Partners,
    Testimonials,
    Enquiries,
    NewsletterSubscribers,
    AuditLogs,
  ],
  globals: [
    SiteSettings,
    Navigation,
    HomePage,
    CoePage,
    GovernancePage,
    CompanyPage,
    ContactPage,
    CapabilitiesPage,
    ProductsPage,
    TrustPage,
    PrivacyPolicy,
    TermsOfUse,
    ResponsibleAi,
    CookiePolicy,
    AccessibilityStatement,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-only-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: resolveMongoUri({ skipPayload: skipPayloadDb }),
    connectOptions: {
      serverSelectionTimeoutMS: skipPayloadDb ? 300 : 8000,
      connectTimeoutMS: skipPayloadDb ? 300 : 8000,
    },
  }),
  sharp,
  plugins: [
    ...(useS3
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.S3_BUCKET!,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID!,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
              },
              region: process.env.S3_REGION || "auto",
              endpoint: process.env.S3_ENDPOINT,
              forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
            },
          }),
        ]
      : []),
  ],
});
