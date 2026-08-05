import path from "node:path";
import { fileURLToPath } from "node:url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";
import {
  AuditLogs,
  Capabilities,
  Careers,
  Enquiries,
  Faqs,
  ImpactStories,
  Industries,
  Insights,
  Media,
  NewsletterSubscribers,
  Partners,
  Products,
  Resources,
  TeamMembers,
  Testimonials,
  Users,
} from "./payload/collections";
import {
  AccessibilityStatement,
  CoePage,
  CompanyPage,
  ContactPage,
  CookiePolicy,
  GovernancePage,
  HomePage,
  Navigation,
  PrivacyPolicy,
  ResponsibleAi,
  SiteSettings,
  TermsOfUse,
} from "./payload/globals";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
        "Agrayian AI Labs content command centre — products, insights, and site globals.",
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
        description: "Content command centre for Agrayian AI Labs.",
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
    theme: "dark",
  },
  routes: {
    admin: "/admin",
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
    Faqs,
    TeamMembers,
    Careers,
    Partners,
    Testimonials,
    Resources,
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
    url:
      process.env.DATABASE_URI ||
      process.env.DATABASE_URL ||
      "mongodb://127.0.0.1:27017/agrayian",
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
