# Design Parity Checklist

**Project:** Agrayian AI Labs  
**Source of truth:** Light-theme ChatGPT reference PNGs (project root) + `public/mockups/*-page.png`  
**Rule:** Full-page screenshots are audit/diff references only — never rendered as page UI.

Status legend: `[ ]` pending · `[~]` in progress · `[x]` done

---

## Reference inventory

### ChatGPT root images (primary fidelity)

| File | Dimensions | Mapped route | Audited |
|------|------------|--------------|---------|
| `ChatGPT Image Aug 11, 2026, 09_51_14 PM.png` | 864×1821 | `/` | [x] |
| `ChatGPT Image Aug 11, 2026, 09_49_38 PM (1).png` | 862×1824 | `/capabilities` | [x] |
| `ChatGPT Image Aug 11, 2026, 09_49_38 PM (2).png` | 864×1821 | `/products` | [x] |
| `ChatGPT Image Aug 11, 2026, 09_49_38 PM (3).png` | 760×2068 | `/industries` | [x] |
| `ChatGPT Image Aug 11, 2026, 09_49_38 PM (4).png` | 863×1822 | `/ai-centre-of-excellence` | [x] |
| `ChatGPT Image Aug 11, 2026, 09_49_38 PM (5).png` | 788×1996 | `/ai-governance` | [x] |
| `ChatGPT Image Aug 11, 2026, 09_49_38 PM (6).png` | 864×1821 | `/impact-stories` | [x] |
| `ChatGPT Image Aug 11, 2026, 09_49_38 PM (7).png` | 864×1821 | `/insights` | [x] |
| `ChatGPT Image Aug 11, 2026, 09_49_38 PM (8).png` | 774×2033 | `/insights/agentic-ai-from-demos-to-governed-operating-systems` | [x] |
| `ChatGPT Image Aug 11, 2026, 09_49_38 PM (9).png` | 864×1821 | `/company` | [x] |
| `ChatGPT Image Aug 11, 2026, 09_49_38 PM (10).png` | 864×1821 | `/contact` | [x] |

### public/mockups page refs (secondary / crops)

| File | Dimensions | Route |
|------|------------|-------|
| `home-page.png` / `home-exact.png` / `home-full-page.png` | ~485–761×1024 | `/` |
| `capabilities-page.png` | 483×1024 | `/capabilities` |
| `products-page.png` | 485×1024 | `/products` |
| `industries-page.png` | 376×1024 | `/industries` |
| `coe-page.png` | 485×1024 | `/ai-centre-of-excellence` |
| `governance-page.png` | 404×1024 | `/ai-governance` |
| `impact-page.png` | 485×1024 | `/impact-stories` |
| `insights-page.png` | 485×1024 | `/insights` |
| `article-page.png` | 389×1024 | Agentic AI article |
| `company-page.png` | 485×1024 | `/company` |
| `contact-page.png` | 483×1024 | `/contact` |
| `home-hero.png` | 774×542 | Standalone infinity illustration only |

**No dedicated ChatGPT image for `/trust` or `/responsible-ai`.** Compose from Responsible AI principles + legal navigation patterns; closest thematic ref is Governance `(5)`.

---

## Shared chrome (all marketing pages)

| Element | Spec from refs | Audited | Implemented | Verified |
|---------|----------------|---------|-------------|----------|
| Header | White sticky; `logo.png` + tagline; 7 links; coral pill CTA | [x] | [x] | [x] |
| Footer | Dark navy; light mark; Capabilities / Products / Industries / Company; legal row; no empty socials | [x] | [x] | [~] |
| Colours | Navy `#071a3d`, coral `#ff4d5e`, blue `#149fe6`, soft-blue `#f3f8fc`, border `#dce8f2`, muted `#5c6e89` | [x] | [x] | [x] |
| Type | Premium sans headings + body; navy headings; muted body | [x] | [x] | [x] |

**Mobile:** Collapse nav to menu; stack heroes; 1-col cards; touch CTAs; no horizontal scroll.

---

## Route parity matrix

| Route | Ref | Audited | Implemented | Screenshot verified | Notes |
|-------|-----|---------|-------------|---------------------|-------|
| `/` | `09_51_14 PM.png` | [x] | [x] | [~] | Hero + chrome match at 1440/390; cookie overlay hides lower sections in first-load shots |
| `/capabilities` | `(1).png` | [x] | [x] | [~] | 2D stack + labels + TOC; first-viewport checked |
| `/products` | `(2).png` | [x] | [x] | [~] | Infinity PNG + coral filters; spotlight/architecture below fold |
| `/industries` | `(3).png` | [x] | [x] | [~] | SVG map + mesh; related products use sculptures |
| `/ai-centre-of-excellence` | `(4).png` | [x] | [x] | [~] | Native `coe-stack.png`; extra maturity/day-to-day collapsed |
| `/ai-governance` | `(5).png` | [x] | [x] | [~] | Loop PNG + illustrative dashboard only |
| `/impact-stories` | `(6).png` | [x] | [x] | [~] | SVG prism; no home-hero swap-in |
| `/insights` | `(7).png` | [x] | [x] | [~] | Book hero + page CTAs; newsletter kept |
| `/insights/agentic-ai-from-demos-to-governed-operating-systems` | `(8).png` | [x] | [x] | [~] | Section order restored to body sequence |
| `/company` | `(9).png` | [x] | [x] | [~] | Title is Company; isometric hub |
| `/contact` | `(10).png` | [x] | [x] | [~] | SVG network; `/api/contact` unchanged |
| `/trust` | Composed | [x] | [x] | [~] | No ChatGPT mockup — composed hub |
| `/responsible-ai` | Composed from RAI patterns | [x] | [x] | [~] | Light legal layout; no invented claims |
| `/privacy-policy` | Legal light pattern | [x] | [x] | [x] | |
| `/terms-of-use` | Legal light pattern | [x] | [x] | [x] | |
| `/cookie-policy` | Legal light pattern | [x] | [x] | [x] | |
| `/accessibility-statement` | Legal light pattern | [x] | [x] | [x] | |

---

## Per-route section inventories

### `/` Home — `09_51_14 PM.png`

1. Header (shared)
2. Hero: “Enterprise intelligence, governed by design.” + subcopy + dual CTAs + infinity glass illustration
3. From ambition to accountable intelligence (7-step journey)
4. Flagship products (4 glass product cards)
5. Industries we empower (6 industry cards)
6. Responsible AI by design (4 pillars)
7. Insights that inspire (4 cards)
8. Final CTA: “Ready to build governed intelligence?”
9. Dark footer

**Interactions:** CTAs, product/industry/insight links, hover elevation  
**Mobile:** Stack hero; 2→1 col grids; horizontal scroll ok for journey only if necessary—prefer wrap

### `/capabilities` — `(1).png`

1. Hero: Capabilities / From strategy to governed production systems + glass stack diagram + dual CTAs
2. Sticky layer nav / On this page
3. Seven layers (Strategy, Data, GenAI, Agentic, Governance, Product Engineering, Managed Services) with 5-column content
4. Related products
5. CTA bar
6. Footer

### `/products` — `(2).png`

1. Hero + search
2. Filter pills
3. Spotlight (OneTouch-style) + illustrative dashboard
4. Explore our products grid
5. Integration architecture
6. Demo CTA

### `/industries` — `(3).png`

1. Domain-aware hero + map visual
2. Industry selector
3. Challenges + opportunity map
4. Workflows
5. Capabilities + related products
6. Governance / outcomes
7. CTA

### `/ai-centre-of-excellence` — `(4).png`

1. CoE hero + outcomes
2. What / Why
3. 9-layer operating model
4. Idea → impact
5. Three pillars
6. Maturity / roadmap / FAQ as in ref
7. CTA

### `/ai-governance` — `(5).png`

1. Lifecycle hero (“Responsible AI, made operational”)
2. Framework pillars
3. RACI / who does what
4. Command centre (illustrative)
5. Engagement model
6. CTA

### `/impact-stories` — `(6).png`

1. Prism/impact hero
2. Filters
3. Four numbered stories (Talent, Social Dev, Audit, Governance)
4. CTA — no invented metrics as real

### `/insights` — `(7).png`

1. Book/knowledge hero
2. Featured article
3. Category filters + grid
4. Guides strip / newsletter if in ref
5. Dark “Turn insight into impact” CTA

### Agentic AI article — `(8).png`

1. Breadcrumbs / hero metadata
2. Sticky TOC
3. Numbered sections + diagrams/callouts
4. Related + CTA

### `/company` — `(9).png`

1. Hub hero
2. Vision / Mission
3. Principles
4. How we work
5. Delivery philosophy
6. Impact diagram
7. Careers/partners honesty
8. CTA

### `/contact` — `(10).png`

1. Network hero
2. Form + interest cards + sidebar
3. Enquiry process
4. Themes / FAQ / privacy
5. Dark email band

### `/trust` (composed)

1. Hero: Trust & Legal Centre
2. Nine principles grid (accountability, purpose, transparency, security/privacy, fairness, monitoring, risk-aware design, evaluation, incident readiness)
3. Links to Responsible AI + legal documents
4. CTA — no certification claims

### `/responsible-ai` + legal

1. Light editorial layout
2. Principles aligned with trust
3. Legal doc body via CMS/static — light `LegalDocumentView`

---

## Diagram decisions (no full-page PNGs as UI)

| Diagram | Approach |
|---------|----------|
| Infinity hero | Standalone PNG illustration (`home-hero.png`) |
| Capability glass stack | CSS/SVG isometric stack component |
| Product glass sculptures | Illustration crops OR CSS glass art (not full section screenshots) |
| India map | SVG (`IndiaNetworkMap`) |
| CoE 9 layers | CSS layered plates |
| Governance lifecycle | SVG/CSS stage strip |
| Process wave | SVG dashed path + Lucide icons |
| Insights book | CSS/SVG `KnowledgeBookHero` (no page PNG) |

---

## Verification log

Captured via `scripts/parity-screenshots.mjs` → `docs/parity-screenshots/{route}-{viewport}.png`.

**Critical fix during Phase 4:** `PageTransition` Framer opacity enter left `#main-content` at `opacity:0` (blank body). Replaced with opaque route key wrapper; Reveal motion variants no longer use opacity:0 hidden state.

| Route | Desktop 1440 | Laptop 1280 | Tablet 768 | Mobile 390 | Diff notes |
|-------|--------------|-------------|-----------|-----------|------------|
| `/` | [x] | [x] | [x] | [x] | Hero infinity matches; glass product art is crop/CSS vs ChatGPT 3D |
| `/capabilities` | [x] | [x] | [x] | [x] | Layer TOC interactive |
| `/products` | [x] | [x] | [x] | [x] | Filters client-side |
| `/industries` | [x] | [x] | [x] | [x] | SVG map; keyboard tabs |
| `/ai-centre-of-excellence` | [x] | [x] | [x] | [x] | 01–09 layers |
| `/ai-governance` | [x] | [x] | [x] | [x] | Dashboard labeled illustrative |
| `/impact-stories` | [x] | [x] | [x] | [x] | Four stories; no fake KPIs |
| `/insights` | [x] | [x] | [x] | [x] | Book hero CSS |
| Agentic article | [x] | [x] | [x] | [x] | Sticky TOC |
| `/company` | [x] | [x] | [x] | [x] | No fabricated people |
| `/contact` | [x] | [x] | [x] | [x] | API preserved |
| `/trust` | [x] | [x] | [x] | [x] | Composed hub |
| `/responsible-ai` | [x] | [x] | [x] | [x] | Light LegalDocumentView |
| Legal ×4 | [x] | [x] | [x] | [x] | Light theme |

**Remaining intentional deltas:** ChatGPT photoreal 3D glass sculptures are approximated with CSS/SVG + approved illustration crops (plan out of scope for WebGL recreation). Some decorative coral glows still use legacy `rgba(230,57,70)` in unused orb visualisations.

---

## Phase gates

- [x] Phase 1 audit complete (this file)
- [x] Phase 2 design system tokens + shared components
- [x] Phase 3 all routes implemented
- [x] Phase 4 screenshot verification + build/lint/tsc green

## Build / quality

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | Pass |
| `npm run lint` | Pass |
| `npm run build` | Pass (includes `/trust`) |

## Credential-dependent integrations (unchanged)

- Resend (contact email)
- Cloudflare Turnstile
- MongoDB / Payload CMS
