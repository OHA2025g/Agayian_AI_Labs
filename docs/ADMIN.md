# Agrayian Admin (Payload CMS)

Embedded Payload CMS 3 admin for pages, catalog, digital marketing, inbox and legal documents. The workspace is a light theme at `/admin`.

## Prerequisites

- Node.js 20.9+
- MongoDB 7+ (local install or Docker Desktop)
- Optional: S3-compatible bucket for production media

## Local setup

1. Start MongoDB:

```bash
npm run db:up
# Docker Compose maps MongoDB to host port 27017
# or point DATABASE_URI at any MongoDB instance
```

2. Copy env:

```bash
cp .env.example .env
```

Set at least:

- `DATABASE_URI` (e.g. `mongodb://127.0.0.1:27017/agrayian`)
- `PAYLOAD_SECRET`
- `PREVIEW_SECRET`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` (for seed)

3. Install and run:

```bash
npm install
npm run dev
```

MongoDB collections are created automatically by Payload on first boot (no SQL migrations).

4. Seed content:

```bash
npm run payload:seed
```

5. Open admin: [http://localhost:3000/admin](http://localhost:3000/admin)

Login with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

## What publishes to the live site

| Admin area | Live effect |
|------------|-------------|
| Site settings → Brand / Contact | Footer copy, contact email, social links |
| Site settings → SEO | Default homepage title, description and OG image |
| Site settings → Announcement | Top bar when enabled |
| Site settings → Marketing | GTM, GA4, Meta and LinkedIn tags after cookie accept |
| Navigation | Header and footer links |
| Home page | Hero headline, supporting line and CTAs |
| Company page | Company copy already wired |
| Contact page | Hero title and description |
| Products, capabilities, industries, insights, impact stories | Catalog pages (published documents) |
| Campaigns | UTM tracking URLs; enquiry forms store UTM from the URL |
| Redirects | Exact-path 301/302 redirects on the public site |
| Enquiries / newsletter | Inbox only |

AI CoE page layout stays in code. Edit `coe-page` only if you add controlled blocks later.

## Digital marketing

- **Campaigns** — channel, dates, landing URL and UTM. Save to generate a tracking URL.
- **Content calendar** — editorial plan for LinkedIn, email, blog and web. This does not auto-post.
- **Redirects** — map `/old-path` to a live page. `/admin`, `/cms-api` and `/api` cannot be redirected.
- **Tracking** — paste measurement IDs in Site settings → Marketing. Tags load only after “Accept all” on the cookie banner.

## Roles

| Role | Capabilities |
|------|----------------|
| super_admin | Full access including users |
| administrator | Content + settings (limited user admin) |
| editor | Draft content edits |
| reviewer | Review/approve flow |
| publisher | Publish / schedule / archive |
| enquiry_manager | Enquiries + newsletter + CSV export |
| media_manager | Media library |
| viewer | Read-only admin |

## Important routes

| Route | Purpose |
|-------|---------|
| `/admin` | Payload admin UI |
| `/cms-api/*` | Payload REST API |
| `/api/contact` | Public contact form (persists enquiry + Resend) |
| `/api/newsletter` | Newsletter (persists subscriber + Resend) |
| `/api/careers/apply` | Career applications |
| `/api/admin/enquiries/export` | CSV export (authenticated enquiry managers) |

## Production hosting

See [DEPLOY.md](./DEPLOY.md) for Docker / EasyPanel instructions.
