# Site route and content matrix

Written from the live codebase on 3 Sep 2026. This is the implementation source of truth for completing the public site — not a redesign brief.

**Rules:** CMS = copy, records, SEO, publish state. React = layout, sculpture, motion. Do not enable Payload layout blocks on public pages. Do not replace approved `original-*` sculptures unless a route is using another page’s asset.

Status: **OK** = exists and largely correct · **GAP** = exists but incomplete · **MISSING** = no public page

---

## Shared chrome

| Surface | Source | Public consumer | Notes |
|---------|--------|-----------------|-------|
| Header | Payload `navigation.main` → `getResolvedNav()` → [`SiteHeader`](../src/components/navigation/SiteHeader.tsx) | All marketing pages | Fallback [`src/data/navigation.ts`](../src/data/navigation.ts) omits Impact, Insights, Resources. CTA href is hardcoded `/contact?interest=consultation`. |
| Footer columns | `footerCapabilities` / `Products` / `Industries` / `Company` | [`SiteFooter`](../src/components/layout/SiteFooter.tsx) | Product/industry links still use `?product=` / `?industry=`. CoE footer link is `/capabilities#ai-coe`. Resources column missing. |
| Footer legal | `footerLegal` | Footer only | [`LegalDocumentView`](../src/components/legal/LegalDocumentView.tsx) and `/trust` still import static `footerLegal`. |
| Announcement / cookies / SEO / pixels | `site-settings` via [`getResolvedSite()`](../src/lib/cms/site.ts) | Layout | Wired. |
| Redirects | Payload `redirects` + [`matchRedirect()`](../src/lib/cms/redirects.ts) | Layout | Wired. Next config also 301s `/products/{slug}` → query. |

---

## Route matrix

| Route | Mockup | Public page | Visual | CMS | Header | Status |
|-------|--------|-------------|--------|-----|--------|--------|
| `/` | `home-page.png` | [`page.tsx`](../src/app/(site)/page.tsx) + `HomeHero` + infinity | `originalInfinityHero` | `home-page` hero partial; products/insights still static | — | **GAP** |
| `/capabilities` | `capabilities-page.png` | Journey + `CapabilityGlassStack` | `originalCapabilityStack` | `getCapabilities()`, `getProducts()` | Yes | **OK** |
| `/products` | `products-page.png` | `ProductsLaboratory` + architecture | Product sculptures + infinity motif | `getProducts()` | Yes | **OK** |
| `/products/[slug]` | Product detail | Redirects to `?product=` | — | `getProduct()` unused on route | — | **MISSING** |
| `/industries` | `industries-page.png` | `IndustriesHero` + `components/industries/IndustriesExplorer` | SVG India map (not a mockup PNG) | `getIndustries()`, capabilities, products | Yes | **OK** |
| `/industries/[slug]` | Industry detail | Does not exist | — | `getIndustry()` not defined | — | **MISSING** |
| `/ai-centre-of-excellence` | `coe-page.png` | `CoeExperience` + nine-plate stack | CoE `WhiteSculpture` assets only | `preferCms={false}`; `coe-page` unused | Yes | **GAP** |
| `/ai-governance` | `governance-page.png` | Designed JSX + loop | `originalGovernanceLoop` | `governance-page` unused | Yes | **GAP** |
| `/impact-stories` | `impact-page.png` | Prism + `ImpactStoriesCinematic` | `originalImpactPrism` | `getImpactStories()` | No | **GAP** |
| `/impact-stories/[slug]` | Story detail | Redirects to `#slug` | — | `getImpactStory()` unused; [`ImpactStoryDetailView`](../src/components/stories/ImpactStoryDetailView.tsx) unused | — | **MISSING** |
| `/insights` | `insights-page.png` | `PageHero` + book + explorer | Book hero correct; featured uses **Capabilities stack** | `getInsights()` | No | **GAP** |
| `/insights/[slug]` | `article-page.png` | `InsightArticleView` | Insight thumbs | `getInsight()` | — | **OK** |
| `/resources` | None (Insights/Company language) | Does not exist | — | Collection exists; no `getResources()` | No | **MISSING** |
| `/resources/[slug]` | None | Does not exist | — | File currently required | — | **MISSING** |
| `/company` | `company-page.png` | Hub + intro | `originalCompanyHub` + mark overlay | `company-page` copy wired; SEO hardcoded | Yes | **OK** (SEO gap) |
| `/company/leadership` | — | Does not exist | — | Team members admin-only | — | Add only if published docs exist |
| `/company/careers` | — | Does not exist | — | Careers + `careersCopy` | — | Add only if published docs exist |
| `/contact` | `contact-page.png` | Form + network | `originalContactNetwork` | Title/description/flow partial; themes/FAQs hardcoded | CTA | **GAP** |
| `/trust` | Composed | Principles + legal links | None | Static `footerLegal` | Footer | **OK** (nav gap) |
| Legal (`/privacy-policy`, `/terms-of-use`, `/responsible-ai`, `/cookie-policy`, `/accessibility-statement`) | Legal pattern | `LegalDocumentView` | None | Matching globals + `@/data/legal` fallback | Footer | **OK** |
| `/preview` | — | Gated `PREVIEW_SECRET` | — | Draft fetch | No | Admin only |

---

## Page globals (safe copy vs hidden)

| Global | Public resolver today | Editors should see | Hide from ordinary editors |
|--------|----------------------|--------------------|----------------------------|
| `home-page` | Inline `getPublishedGlobal` in home `page.tsx` | Hero, section titles, featured product/insight relationships, final CTA, SEO, publish | `layout` blocks, `presentationFields` |
| `coe-page` | Unused (`preferCms={false}`) | Hero, CTAs, section titles/descriptions, operating-model/maturity text, FAQ relationships, SEO | `layout`, `contentJson`, theme/animation |
| `governance-page` | Unused | Hero, lifecycle, framework, RACI, command-centre, engagement, CTA, SEO | `layout`, `contentJson`, theme/animation |
| `company-page` | Page merges with `@/data/company` | Existing copy groups + SEO | `layout` blocks |
| `contact-page` | Title/description/flow only | Title, description, themes, flow, FAQ relationships, SEO | — |
| `navigation` | `getResolvedNav()` | Header + CTA, Footer columns, Legal | `footerExplore`, capability ribbon (keep as fallback in code) |
| `site-settings` | `getResolvedSite()` | Brand, contact, SEO, announcement, marketing, cookies | — |

Resolver target: [`src/lib/cms/page-content.ts`](../src/lib/cms/page-content.ts) — typed objects, static fallbacks, **no block renderer**.

---

## Catalog collections

| Collection | Public helper | Public routes | Notes |
|------------|---------------|---------------|-------|
| Products | `getProducts`, `getProduct` | Listing OK; slug redirects | Need real `/products/[slug]` |
| Capabilities | `getCapabilities` | `/capabilities` | Journey omits `ai-coe` (correct) |
| Industries | `getIndustries` | Listing OK | Need `getIndustry` + `/industries/[slug]` |
| Impact stories | `getImpactStories`, `getImpactStory` | Listing OK | Wire slug to `ImpactStoryDetailView` |
| Insights | `getInsights`, `getInsight` | Listing + article OK | Featured sculpture wrong |
| Resources | **none** | **none** | File required today — make optional; never invent a file |
| FAQs / Team / Careers / Partners / Testimonials | none | none | Company extras only if published records exist |
| Campaigns / Calendar / Redirects | Redirects only | Marketing | Hide from default sidebar (super_admin) |

---

## Navigation target

**Header (fallback + seed):** Capabilities, Products, Industries, AI CoE, Governance, Impact, Insights, Company, Resources. Contact = red consultation CTA.

**Footer:** Capabilities, Products, Industries, Company, Resources + legal bar.

**URL targets after detail pages ship:**

- Products: `/products/[slug]` (listing modal `?product=` stays)
- Industries: `/industries/[slug]` (explorer may keep query)
- Impact: `/impact-stories/[slug]`
- CoE footer item: `/ai-centre-of-excellence`
- Insights “Browse all resources”: `/resources`

---

## Visual pairing (do not swap)

| Page | Correct asset | Do not use |
|------|---------------|------------|
| Home / Products infinity motif | `originalInfinityHero` | CoE plates |
| Capabilities | `originalCapabilityStack` | Insights book |
| Insights hero | `originalInsightsBook` / `KnowledgeBookHero` | Capability stack |
| Insights featured | Insights-family sculpture + seven labels | `originalCapabilityStack` |
| Governance | `originalGovernanceLoop` | — |
| Impact | `originalImpactPrism` | — |
| Company | `originalCompanyHub` | — |
| Contact | `originalContactNetwork` | — |
| CoE | White sculptures / `coe-stack-nine-plates.png` | Do not change `PLATE_ANCHORS` |

---

## Dead / unused (delete only after unused-import proof)

- [`src/components/sections/IndustriesExplorer.tsx`](../src/components/sections/IndustriesExplorer.tsx)
- [`src/components/sections/CapabilityRibbon.tsx`](../src/components/sections/CapabilityRibbon.tsx)
- [`src/components/visualisations/glass/CoeHeroPanel.tsx`](../src/components/visualisations/glass/CoeHeroPanel.tsx)

Reuse, do not rebuild: `ImpactStoryDetailView`, `/preview`.

---

## Sitemap / tests that must change with this work

- [`sitemap.ts`](../src/app/(site)/sitemap.ts) currently emits `?product=` and `#story`; omit `/resources`.
- [`e2e/smoke.spec.ts`](../e2e/smoke.spec.ts) currently **requires** product and impact slug redirects.
- [`next.config.ts`](../next.config.ts) permanent `/products/{slug}` → query redirect must be removed when the detail page ships.
