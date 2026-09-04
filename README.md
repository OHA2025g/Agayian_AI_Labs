# Agrayian AI Labs

Corporate website for Agrayian AI Labs — responsible AI strategy, Centres of Excellence, governance and intelligent products for enterprises and governments.

## Stack

- Next.js (App Router) + TypeScript
- Payload CMS 3 (custom admin at `/admin`, native UI at `/cms`) + MongoDB
- Tailwind CSS
- Framer Motion / GSAP / React Three Fiber
- React Hook Form + Zod
- Resend (contact & newsletter delivery)
- Cloudflare Turnstile + Upstash rate limiting
- Vercel Analytics + Speed Insights (consent-gated)
- Docker + EasyPanel-ready packaging

## Getting started

```bash
npm install
cp .env.example .env
npm run db:up          # Docker MongoDB (requires Docker Desktop)
npm run payload:seed   # seed CMS collections / admin user
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and [http://localhost:3000/admin](http://localhost:3000/admin). Native Payload (super admin only) is at [http://localhost:3000/cms](http://localhost:3000/cms).

- Admin setup: [docs/ADMIN.md](docs/ADMIN.md)
- Docker / EasyPanel deploy: [docs/DEPLOY.md](docs/DEPLOY.md)

## Environment variables

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key. Required for contact/newsletter delivery. |
| `CONTACT_TO_EMAIL` | Inbox for enquiries (defaults to `siteConfig.contactEmail`). |
| `CONTACT_FROM_EMAIL` | Verified sender. Defaults to Resend onboarding sender for tests. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (widget). |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret (server verify). **Required in production** (forms fail closed). Local/preview may skip when unset. |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL for distributed rate limits. |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token. |

Without `RESEND_API_KEY`, `/api/contact` and `/api/newsletter` return **503**. Contact/newsletter never fake a successful queue.

### Production form security

- **Turnstile:** In production (`NODE_ENV` / `VERCEL_ENV === "production"`), `TURNSTILE_SECRET_KEY` must be set or contact/newsletter reject submissions.
- **Rate limits:** In-memory limits work for single-instance/dev. **Upstash is required for multi-instance Vercel** so limits are shared across serverless instances. Production without Upstash logs a warning and falls back to memory (per-instance only).

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
- `npm run test` — Vitest unit/API tests
- `npm run test:e2e` — Playwright smoke tests (builds locally if needed, then starts the server)
- `npm run db:up` / `db:down` — local MongoDB via Docker Compose
- `npm run docker:up` / `docker:down` — full app + Mongo stack (production image)
- `npm run payload:seed` — seed CMS from `src/data` + legal copy
- `npm run payload:types` / `payload:importmap` — Payload tooling

## Content

- **CMS (primary):** Payload collections/globals in MongoDB; public pages read published docs via Local API (with static fallback when the DB is empty).
- `src/config/site.ts` — company name, URL, contact, social links (fallback)
- `src/data/` — seed source + offline fallback catalogs

Phone, address and socials render only when set (CMS site-settings or `siteConfig`). Do not invent leadership, partners, or phone numbers in seed.

## Launch checklist

1. Set production domain in `siteConfig.websiteUrl` and host DNS.
2. Configure Resend env vars and verify sending domain DNS.
3. Configure Cloudflare Turnstile keys for production forms (add production hostname in the Turnstile widget settings).
4. Configure Upstash Redis for multi-instance rate limiting on Vercel.
5. Fill verified phone, address and social URLs in `siteConfig` when available.
6. Confirm the contact inbox is monitored.
7. Legal review of Privacy Policy and Terms of Use.
8. Smoke test (`npm run test:e2e`): home, product/story/insight slugs, products listing → detail, cookies, mobile nav, 404, contact form, footer newsletter (no live Resend/Turnstile submit).
9. Confirm security headers on a production response (HSTS, CSP, `X-Content-Type-Options`, etc.).

## Production runbook

### Vercel env matrix

Set these in the Vercel project for **Production** (and Preview if you want forms to work there):

| Env | Production |
|-----|------------|
| `RESEND_API_KEY` | Required |
| `CONTACT_TO_EMAIL` | Required (monitored inbox) |
| `CONTACT_FROM_EMAIL` | Required (verified domain sender) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Required |
| `TURNSTILE_SECRET_KEY` | Required (fail-closed) |
| `UPSTASH_REDIS_REST_URL` | Required for multi-instance |
| `UPSTASH_REDIS_REST_TOKEN` | Required for multi-instance |
| `MONGO_URL` | Required (Mongo host URL from EasyPanel) |
| `DB_NAME` | Required (database created for this site) |
| `PAYLOAD_SECRET` | Required |
| `PREVIEW_SECRET` | Required for draft preview |
| `CRON_SECRET` | Required for scheduled publish cron |
| `S3_*` | Required in production for media |

### DNS and domain

1. Point the production hostname to Vercel.
2. Set `siteConfig.websiteUrl` to the canonical `https://` origin.
3. In Resend, verify the sending domain (SPF/DKIM) before switching off the onboarding sender.
4. In Cloudflare Turnstile, allow the production hostname (and `www` if used).

### Post-deploy checks

1. Open `/`, `/products/{slug}`, `/impact-stories/{slug}`, `/insights/{slug}`, `/contact`.
2. Submit contact/newsletter once with Turnstile (expect delivery, not 503/400).
3. Inspect response headers for `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options`.
4. Accept cookies once and confirm Analytics/Speed Insights load only after consent.

### CSP note

The baseline CSP in `next.config.ts` allows `'unsafe-inline'` / `'unsafe-eval'` for Next.js, Turnstile and Vercel scripts. It no longer allows arbitrary HTTPS images or client calls to Resend. A full nonce/hash CSP is a later host-specific hardening step.

## Deploy

```bash
npm run build
npm run start
```

Or deploy the repo to Vercel. Security headers are set in `next.config.ts`.
