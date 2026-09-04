# Agrayian Admin

Custom Agrayian admin at `/admin`, backed by Payload CMS 3 and MongoDB. The native Payload UI lives at `/cms` for `super_admin` emergency use only.

## Prerequisites

- Node.js 20.9+
- MongoDB 7+ (local install or Docker Desktop)
- Optional: S3-compatible bucket for production media

## Local setup

1. Start MongoDB:

```bash
npm run db:up
```

2. Copy env:

```bash
cp .env.example .env
```

Set at least `MONGO_URL`, `DB_NAME`, `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.

3. Install, seed, and run:

```bash
npm install
npm run payload:seed
npm run dev
```

4. Open [http://localhost:3000/admin](http://localhost:3000/admin).

Seed is idempotent. It upserts catalog slugs and hardcoded page copy. It does not wipe Mongo.

## `/admin` vs `/cms`

| Route | Who | Purpose |
|-------|-----|---------|
| `/admin` | Administrator and Editor UI roles | Day-to-day editing, inbox, media, users |
| `/cms` | `super_admin` only | Native Payload schema/debug |
| `/cms-api` | Payload REST | Do not call from public client components |

## Roles

UI roles are mapped from Payload roles:

- **Administrator** — `super_admin`, `administrator`, `publisher`. Can publish, schedule, delete, and manage users.
- **Editor** — everyone else. Can save drafts and submit for review. Enquiry/media specialists keep inbox/media access via server checks.

## Backup and rollback

- Back up the Mongo database before large imports.
- Restore by loading a Mongo dump. Do not reset the database to “fix” content.
- Public pages keep static fallbacks in `src/data/*` if Mongo is empty or down.
- Revisions can be restored from each editor’s Revisions list.

## What publishes to the live site

Published globals and collections are read through `src/lib/cms/published.ts`. Drafts never appear on the public site unless a preview cookie is set from admin Preview.

There is no Resources page or Resources admin module. `/resources` is 404.
