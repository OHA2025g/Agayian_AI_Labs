# Content migration matrix

One row per current editable frontend field. Status columns start as planned; implementation updates them.

Legend: **M** = migration/import, **C** = public connected to published record, **V** = verified.

| Public route | Section | Current source | Current value (summary) | Admin module | Model.field | M | C | V |
|--------------|---------|----------------|-------------------------|--------------|-------------|---|---|---|
| `*` | Site name | `site.ts` | Agrayian AI Labs | Settings | `site-settings.name` | planned | planned | |
| `*` | Website URL | `site.ts` | https://agrayian.ai | Settings | `site-settings.websiteUrl` | planned | planned | |
| `*` | Description | `site.ts` | enterprise/gov AI… | Settings | `site-settings.description` | planned | planned | |
| `*` | Contact email | `site.ts` | hello@agrayian.ai | Settings | `site-settings.contactEmail` | planned | planned | |
| `*` | Socials | `site.ts` | empty | Settings | `site-settings.socialLinks` | planned | planned | |
| `*` | Announcement | `brandCopy.announcement` | Building Responsible AI… | Settings | `site-settings.announcement` | planned | planned | |
| `*` | Cookie copy | Site Settings / banner | consent text | Settings | `site-settings.cookie` | planned | planned | |
| `*` | SEO defaults | `seo.ts` / site | title template, OG | SEO | `site-settings.seoDefaults` | planned | planned | |
| `*` | Header nav | `mainNavigation` | 8 items, no Resources | Header & Footer | `navigation.main` | planned | planned | |
| `*` | Header CTA | `defaultHeaderCta` | Book a Consultation | Header & Footer | `navigation.primaryCta` | planned | planned | |
| `*` | Footer capabilities | `footerCapabilities` | 6 links | Header & Footer | `navigation.footerCapabilities` | planned | planned | |
| `*` | Footer products | `footerProducts` | 4 links | Header & Footer | `navigation.footerProducts` | planned | planned | |
| `*` | Footer industries | `footerIndustries` | 4 links | Header & Footer | `navigation.footerIndustries` | planned | planned | |
| `*` | Footer company | `footerCompany` | 4 links | Header & Footer | `navigation.footerCompany` | planned | planned | |
| `*` | Footer insights/impact | `footerResources` | Insights + Impact only | Header & Footer | `navigation.footerInsights` | planned | planned | |
| `*` | Footer legal | `footerLegal` | Trust + policies | Header & Footer | `navigation.footerLegal` | planned | planned | |
| `/` | Hero eyebrow | `brandCopy.eyebrow` | ENTERPRISE AI… | Home | `home-page.hero.eyebrow` | planned | planned | |
| `/` | Hero headline | `brandCopy.headline` | Enterprise intelligence… | Home | `home-page.hero.headlineLine1/2` | planned | planned | |
| `/` | Hero supporting | `page-content.ts` | We help enterprises… | Home | `home-page.hero.supporting` | planned | planned | |
| `/` | Hero CTAs | `brandCopy` | Book / Explore | Home | `home-page.hero.*Cta*` | planned | planned | |
| `/` | Trust line | `brandCopy.trustStatement` | Strategy to scale… | Home | `home-page.hero.trustLine` | planned | planned | |
| `/` | Section titles | `page-content.ts` | Ambition / products… | Home | `home-page.sections` | planned | planned | |
| `/` | Flagship display | `flagship-products.ts` | 4 products | Home | `home-page.flagshipOverrides` | planned | planned | |
| `/` | Featured insights | default slugs | 4 insight slugs | Home | `home-page.featuredInsights` | planned | planned | |
| `/` | Final CTA | `page-content.ts` | Ready to build… | Home | `home-page.finalCta` | planned | planned | |
| `/` | Home SEO | unused on page | — | Home / SEO | `home-page.seo` | planned | planned | |
| `/capabilities` | Hero | `CapabilitiesHero.tsx` | hardcoded | Capabilities | `capabilities-page.hero` | planned | planned | |
| `/capabilities` | Records | `src/data/capabilities.ts` | 8 capabilities | Capabilities | `capabilities.*` | planned | planned | |
| `/products` | Catalog | `src/data/products.ts` | 6 products | Products | `products.*` | planned | planned | |
| `/products` | Architecture copy | `ProductsArchitecture` | Built to integrate… | Products | `products-page.architecture` | planned | planned | |
| `/industries` | Records | `src/data/industries.ts` | 7 industries | Industries | `industries.*` | planned | planned | |
| `/ai-centre-of-excellence` | Hero / titles | `coe-page` | CMS + fallbacks | AI CoE | `coe-page.hero` etc. | planned | planned | |
| `/ai-centre-of-excellence` | Layers | `coe-content.ts` | 9 layers | AI CoE | `coe-page.layers` | planned | planned | |
| `/ai-centre-of-excellence` | Stages / pillars / foundations / maturity / roadmap / FAQs | `coe-content.ts` | repeatable arrays | AI CoE | `coe-page.*` arrays | planned | planned | |
| `/ai-governance` | Hero / titles | `governance-page` | CMS | AI Governance | `governance-page.hero` | planned | planned | |
| `/ai-governance` | Pillars / lifecycle / RACI / engagement | `ai-governance/page.tsx` | hardcoded | AI Governance | `governance-page.pillars` etc. | planned | planned | |
| `/impact-stories` | Stories | `impactStories.ts` | 4 stories | Impact Stories | `impact-stories.*` | planned | planned | |
| `/insights` | Articles | `insights.ts` | 12 articles | Insights | `insights.*` | planned | planned | |
| `/company` | Intro / vision / mission / values | `company.ts` | existing copy | Company | `company-page.*` | planned | planned | |
| `/company` | How we work | `company/page.tsx` | hardcoded steps | Company | `company-page.howWeWork` | planned | planned | |
| `/company/leadership` | Team | CMS empty | none invented | Company | `team-members` | n/a | planned | |
| `/company/careers` | Roles | CMS empty | none invented | Company | `careers` | n/a | planned | |
| `/contact` | Title / themes / flow | `contact-page` | CMS + schema | Contact Page | `contact-page.*` | planned | planned | |
| `/contact` | Form labels / consent | `ContactForm` | hardcoded | Contact Page | `contact-page.form` | planned | planned | |
| `/contact` | FAQs | `faqs` | CMS | FAQs | `faqs` | planned | planned | |
| `/trust` | Principles | `trust/page.tsx` | 9 principles | Legal & Trust | `trust-page.principles` | planned | planned | |
| `/privacy-policy` | Body | `legal.ts` | existing | Legal & Trust | `privacy-policy` | planned | planned | |
| `/terms-of-use` | Body | `legal.ts` | existing | Legal & Trust | `terms-of-use` | planned | planned | |
| `/responsible-ai` | Body | `legal.ts` | existing | Legal & Trust | `responsible-ai` | planned | planned | |
| `/cookie-policy` | Body | `legal.ts` | existing | Legal & Trust | `cookie-policy` | planned | planned | |
| `/accessibility-statement` | Body | `legal.ts` | existing | Legal & Trust | `accessibility-statement` | planned | planned | |
| `/api/contact` | Submissions | Enquiries | live inbox | Contact Submissions | `enquiries` | n/a | planned | |
| Footer | Newsletter | `newsletter-subscribers` | live | Newsletter | `newsletter-subscribers` | n/a | planned | |
| `*` | Redirects | `redirects` collection | optional | SEO & Redirects | `redirects` | n/a | planned | |
| `*` | Media | `media` | uploads | Media | `media` | n/a | planned | |
| `/admin` | Users | `users` | seed admin | Users & Roles | `users` | planned | planned | |
| `/admin` | Activity | `audit-logs` | hooks | Activity Log | `audit-logs` | n/a | planned | |

**Do not migrate:** Resources collection, `/resources` route, invented clients/metrics/leadership, decorative sculptures as CMS backgrounds.

**Slug lock:** product, industry, impact, and insight slugs stay exactly as in `src/data/*`.
