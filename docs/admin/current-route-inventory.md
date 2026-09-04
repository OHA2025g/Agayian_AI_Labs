# Current route inventory

Audit date: 2026-09-04  
Stack: Next.js 16.2.12 App Router, TypeScript, npm, Payload CMS 3.87 + MongoDB.

## Tooling

| Command | Script |
|---------|--------|
| Dev | `npm run dev` |
| Production build | `npm run build` |
| Lint | `npm run lint` |
| Unit tests | `npm run test` (Vitest) |
| E2E | `npm run test:e2e` (Playwright) |
| Seed | `npm run payload:seed` |
| Local Mongo | `npm run db:up` |

No Pages Router. Public site lives under `src/app/(site)`. Payload lives under `src/app/(payload)`.

## Public marketing routes

| Path | Page file | Metadata | Content source |
|------|-----------|----------|----------------|
| `/` | `src/app/(site)/page.tsx` | Root layout + unused home SEO | `home-page` global + static fallbacks |
| `/capabilities` | `src/app/(site)/capabilities/page.tsx` | Hardcoded `generateMetadata` | CMS capabilities + hardcoded hero |
| `/products` | `src/app/(site)/products/page.tsx` | Hardcoded | CMS/static catalog + lab UI |
| `/products/[slug]` | `src/app/(site)/products/[slug]/page.tsx` | From product | CMS/static; params from `src/data/products.ts` |
| `/industries` | `src/app/(site)/industries/page.tsx` | Hardcoded | CMS/static |
| `/industries/[slug]` | `src/app/(site)/industries/[slug]/page.tsx` | From industry | CMS/static |
| `/ai-centre-of-excellence` | `src/app/(site)/ai-centre-of-excellence/page.tsx` | CoE SEO | CMS titles + hardcoded `coe-content.ts` |
| `/ai-governance` | `src/app/(site)/ai-governance/page.tsx` | Governance SEO | CMS titles + hardcoded arrays |
| `/impact-stories` | `src/app/(site)/impact-stories/page.tsx` | Hardcoded | CMS/static |
| `/impact-stories/[slug]` | `src/app/(site)/impact-stories/[slug]/page.tsx` | From story | CMS/static |
| `/insights` | `src/app/(site)/insights/page.tsx` | Hardcoded | CMS/static; `?q=` search |
| `/insights/[slug]` | `src/app/(site)/insights/[slug]/page.tsx` | From article | CMS/static |
| `/company` | `src/app/(site)/company/page.tsx` | Company SEO | CMS + hardcoded how-we-work |
| `/company/leadership` | `src/app/(site)/company/leadership/page.tsx` | Hardcoded | CMS `team-members` or 404 |
| `/company/careers` | `src/app/(site)/company/careers/page.tsx` | Hardcoded | CMS `careers` or 404 |
| `/contact` | `src/app/(site)/contact/page.tsx` | CMS + site | `contact-page` + FAQs |
| `/trust` | `src/app/(site)/trust/page.tsx` | Hardcoded | **Fully hardcoded** |
| `/privacy-policy` | `src/app/(site)/privacy-policy/page.tsx` | Hardcoded | Legal global + `src/data/legal.ts` |
| `/terms-of-use` | `src/app/(site)/terms-of-use/page.tsx` | Hardcoded | Same |
| `/responsible-ai` | `src/app/(site)/responsible-ai/page.tsx` | Hardcoded | Same |
| `/cookie-policy` | `src/app/(site)/cookie-policy/page.tsx` | Hardcoded | Same |
| `/accessibility-statement` | `src/app/(site)/accessibility-statement/page.tsx` | Hardcoded | Same |
| `/preview` | `src/app/(site)/preview/page.tsx` | None | Draft preview, `PREVIEW_SECRET` |

## Intentionally absent

| Path | Status |
|------|--------|
| `/resources` | 404. E2E asserts gone. Do not recreate. |
| `/resources/[slug]` | Does not exist. |

## Header and footer

| Surface | Source |
|---------|--------|
| Header links | `src/data/navigation.ts` `mainNavigation` + Payload `navigation` global |
| Header CTA | `defaultHeaderCta` / nav `primaryCta` — Book a Consultation |
| Footer columns | Capabilities, Products, Industries, Company, Insights/Impact (`footerResources` name only), Contact, Legal |
| Social | `siteConfig.socialLinks` + Site Settings (empty by default) |
| Newsletter | Footer form → `/api/newsletter` |
| Cookie reopen | `#cookie-preferences` |

Header labels: Capabilities, Products, Industries, AI CoE, Governance, Impact, Insights, Company. Contact is the red CTA, not a text link. No Resources item.

## Legal / trust links

Trust Centre, Privacy, Terms, Responsible AI, Cookie Policy, Accessibility, Cookie Preferences.

## APIs and ops routes

| Path | Role |
|------|------|
| `/api/contact` | Contact form; Turnstile + rate limit; Enquiries + Resend |
| `/api/newsletter` | Newsletter subscribe |
| `/api/careers/apply` | Careers applications |
| `/api/cron/publish-scheduled` | Scheduled publish |
| `/api/admin/enquiries/export` | CSV export (auth) |
| `/cms-api/*` | Payload REST/GraphQL |
| `/admin/*` | Payload native admin (to be replaced) |

## Sitemap (`src/app/(site)/sitemap.ts`)

Static marketing + legal routes, plus products, industries, impact stories, insights. Does **not** include `/resources`, `/preview`, `/company/leadership`, `/company/careers`.

Robots: allow `/`, disallow `/api/`.

## Product slugs (must stay)

`onetouch-audit`, `smart-hiring`, `wcd-intelligence`, `ai-governance-command-centre`, `enterprise-decision-intelligence`, `document-intelligence-copilot`

## Industry slugs

`government`, `banking`, `hr`, `healthcare-social`, `education`, `manufacturing`, `enterprise`

## Insights

Standalone public route exists and must remain **Insights**, never Resources.
