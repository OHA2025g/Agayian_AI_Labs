# Admin implementation plan

## Decision

Keep Payload 3 + MongoDB as the only datastore. Replace the Payload UI at `/admin` with a custom Agrayian shell. Move native Payload to `/cms` for `super_admin` only.

## Phases

1. **Audit (this folder)** — route inventory, content inventory, migration matrix, this plan.
2. **Engine** — `routes.admin = "/cms"`; drop `resources`; extend globals (`coe-page` arrays, `governance-page` arrays, `trust-page`, `capabilities-page`, `products-page`, home flagship overrides, company how-we-work, contact form copy); idempotent import from `src/data/*` and hardcoded page copy.
3. **Shell** — `/admin` App Router, login (Payload Users + rate limit), Administrator/Editor mapping, dashboard with real counts.
4. **Shared management** — navigation, media, SEO/redirects, settings, users, audit log, enquiries, newsletter.
5. **Page editors** — typed forms for every public page + Insights + Trust + FAQs + careers/leadership.
6. **Public connect** — published reads via `src/lib/cms/*`; preview; publish/revalidate; home SEO metadata.
7. **Harden** — unit/e2e tests, README, `.env.example`, implementation report. Confirm no Resources surface.

## Roles (UI)

| UI role | Payload roles |
|---------|----------------|
| Administrator | `super_admin`, `administrator`, `publisher` |
| Editor | `editor`, `reviewer`, `enquiry_manager`, `media_manager`, `viewer` |

Server checks still use Payload role helpers. Editors cannot publish or manage users.

## Route map (new admin)

| Path | Module |
|------|--------|
| `/admin/login` | Login |
| `/admin` | Dashboard |
| `/admin/home` | Home editor |
| `/admin/capabilities` | Capabilities listing + records |
| `/admin/products` | Products |
| `/admin/industries` | Industries |
| `/admin/coe` | AI CoE |
| `/admin/governance` | AI Governance |
| `/admin/impact-stories` | Impact Stories |
| `/admin/insights` | Insights |
| `/admin/company` | Company + team + careers |
| `/admin/contact` | Contact page |
| `/admin/navigation` | Header & Footer |
| `/admin/media` | Media |
| `/admin/seo` | SEO defaults |
| `/admin/redirects` | Redirects |
| `/admin/enquiries` | Contact submissions |
| `/admin/newsletter` | Newsletter |
| `/admin/legal` | Legal & Trust |
| `/admin/faqs` | FAQs |
| `/admin/users` | Users |
| `/admin/activity` | Activity log |
| `/admin/settings` | Settings |
| `/cms` | Payload native (super_admin) |

## Out of scope

New public design, Resources, invented claims, Prisma, a second database.
