# Page parity report

Written after the site-completion wave on 3 Sep 2026. This is an audit of approved mockup routes versus the live React pages. It does **not** recommend pixel-chasing approved pages.

## Wrong-asset fix

| Route | Issue | Resolution |
|-------|-------|------------|
| `/insights` featured block | Used `originalCapabilityStack` (Capabilities hero) | Replaced with `InsightsFeaturedVisual` using `original-insight-ring` plus the seven layer labels |

## Approved pages left intact

Home, Capabilities, Products listing, Industries explorer, AI CoE (nine-plate stack and anchors unchanged), Governance loop, Impact listing prism, Insights book hero, Company hub, Contact network.

## New public routes (no ChatGPT mockup)

| Route | Approach |
|-------|----------|
| `/resources` | Insights/Company language + book hero |
| `/resources/[slug]` | Editorial detail; download only if a file exists |
| `/products/[slug]` | Existing `ProductDetailView` on a light page |
| `/impact-stories/[slug]` | Existing `ImpactStoryDetailView` |
| `/industries/[slug]` | Same industry panels as the explorer |
| `/company/careers` | Only if published roles exist |
| `/company/leadership` | Only if published team members exist |

## Intentional deltas (do not “fix”)

- ChatGPT photoreal glass sculptures remain CSS/SVG + approved `original-*` crops.
- Products listing still opens a `?product=` modal; the slug URL is now the canonical page.
- Industries explorer still uses `?industry=` for in-page selection and also links to permalinks.
- CoE CMS copy can change titles/descriptions only. Plate anchors and stack PNG are unchanged.
- Header now has nine items; Contact remains the red CTA.

## Chrome

Header fallback: Capabilities, Products, Industries, AI CoE, Governance, Impact, Insights, Company, Resources.

Footer adds a Resources column. Product/industry footer links use real detail URLs. CoE footer link is `/ai-centre-of-excellence`.
