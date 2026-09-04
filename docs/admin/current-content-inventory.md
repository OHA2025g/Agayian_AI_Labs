# Current content inventory

Every public surface an administrator must be able to edit. CMS-first with static fallbacks in `src/data/*` and `src/config/*`. Resolver: `src/lib/cms/catalog.ts`, `page-content.ts`, `site.ts`.

## Site chrome

| Item | Current source | CMS today |
|------|----------------|-----------|
| Site name, URL, description, email | `src/config/site.ts` | `site-settings` |
| Brand copy / CTAs / announcement fallback | `brandCopy` in `site.ts` | `site-settings.brandCopy`, `announcement` |
| Social links | empty defaults in `site.ts` | `site-settings.socialLinks` |
| Cookie banner | layout + Site Settings `cookie` | yes |
| Marketing pixels | Site Settings `marketing` | yes |
| Header nav + CTA | `src/data/navigation.ts` | `navigation` global |
| Footer columns, legal, contact CTAs | `navigation.ts` | `navigation` (`footerResources` is Insights/Impact, not a Resources page) |
| Favicon / OG default | `public/icon.png`, `public/og-default.png` | `site-settings.seoDefaults` |

## Home `/`

| Field | Source | Notes |
|-------|--------|-------|
| Eyebrow, headline, supporting, CTAs, trust line | `brandCopy` / `home-page.hero` | Home SEO not wired to `generateMetadata` |
| Section titles | `getHomePageContent` defaults | `home-page.sections` |
| Featured products | `flagship-products.ts` + catalog | `home-page.featuredProducts` |
| Flagship display names | `src/config/flagship-products.ts` | **Hardcoded** |
| Featured insights | default slugs in `page-content.ts` | `home-page.featuredInsights` |
| Final CTA | `page-content.ts` | `home-page.finalCta` |
| Sculptures | `mockup-assets.ts` | not CMS media |

## Capabilities `/capabilities`

| Field | Source |
|-------|--------|
| Hero / CTAs | **Hardcoded** `CapabilitiesHero.tsx` |
| Journey order / TOC | **Hardcoded** in page |
| Capability records | CMS `capabilities` or `src/data/capabilities.ts` |
| Related products | flagship config + catalog |

No `/capabilities/[slug]` — anchors only.

## Products `/products` + `/products/[slug]`

Six published slugs (do not invent new ones):

`onetouch-audit`, `smart-hiring`, `wcd-intelligence`, `ai-governance-command-centre`, `enterprise-decision-intelligence`, `document-intelligence-copilot`

| Field | Source |
|-------|--------|
| Name, slug, descriptions, modules, workflow | CMS `products` / `src/data/products.ts` |
| Index filters / lab UI | `products-catalog.ts`, `ProductsLaboratory` |
| Architecture band copy | **Hardcoded** `ProductsArchitecture` |
| Sculptures | original HQ PNGs via `ProductSculptures` |

## Industries

Slugs: `government`, `banking`, `hr`, `healthcare-social`, `education`, `manufacturing`, `enterprise`. CMS `industries` / `src/data/industries.ts`. Hero chrome hardcoded.

## AI CoE `/ai-centre-of-excellence`

| Field | Source |
|-------|--------|
| Hero, section titles, CTA, SEO | `coe-page` via `getCoePageContent` |
| Layers, stages, pillars, foundations, maturity, roadmap, FAQ bodies | **Hardcoded** `src/app/(site)/ai-centre-of-excellence/coe-content.ts` (`preferCms={false}`) |

## AI Governance `/ai-governance`

| Field | Source |
|-------|--------|
| Hero, section titles, CTA, SEO | `governance-page` |
| Pillars, lifecycle, RACI, engagement cards | **Hardcoded** in `ai-governance/page.tsx` |

## Impact Stories

Four static slugs in `src/data/impactStories.ts`. Index hero/CTA hardcoded. Detail from CMS/static.

## Insights (standalone — not Resources)

`src/data/insights.ts` (12 articles) + CMS `insights`. Featured slug hardcoded on index. Search is client `?q=`.

## Company

Vision/mission/values/why from `company-page` / `src/data/company.ts`. How-we-work and several UI strings hardcoded. Leadership/careers CMS-only (404 if empty). Do not invent bios.

## Contact

`contact-page` title/description/themes/flow/SEO. Form labels in `ContactForm` / `contact-schema.ts`. FAQs from `faqs`. Recipient `CONTACT_TO_EMAIL`. Turnstile + rate limit. Stored as `enquiries`.

## Legal and Trust

| Path | CMS | Fallback |
|------|-----|----------|
| `/privacy-policy` | `privacy-policy` | `src/data/legal.ts` |
| `/terms-of-use` | `terms-of-use` | same |
| `/responsible-ai` | `responsible-ai` | same |
| `/cookie-policy` | `cookie-policy` | same |
| `/accessibility-statement` | `accessibility-statement` | same |
| `/trust` | **none** | hardcoded principles in `trust/page.tsx` |

## Forms and inbox

| Form | Storage | Email |
|------|---------|-------|
| Contact | `enquiries` | Resend |
| Newsletter | `newsletter-subscribers` | optional |
| Careers apply | API | Resend |

## Ops collections already in Payload

Users, Media, Redirects, Campaigns, Content calendar, Audit logs, Partners, Testimonials (unused on public pages; keep editable, do not invent records).

## Removed Resources

Public `/resources` is 404. Collection `resources`, `getResources()`, empty `src/data/resources.ts`, and admin dashboard Resource stats are stale. Remove after unused check. Do not seed Resources.

## Structured data / SEO

`src/lib/seo.ts` Organization + WebSite in layout; breadcrumbs on section pages; Article on insights. Redirects via Payload `redirects` + `src/lib/cms/redirects.ts`.
