# Admin implementation report

Custom `/admin` is an App Router shell on top of the existing Payload + Mongo datastore. Native Payload moved to `/cms` (`super_admin` only). The `resources` collection is gone. Public Insights remains Insights.

## Delivered

- Phase 0 inventories in this folder.
- Schema extensions for CoE, governance, Trust, capabilities page, products page, home flagship overrides, company how-we-work, and contact form copy.
- Idempotent import in `src/scripts/import-page-copy.ts`, called from `payload:seed`.
- Authenticated Agrayian admin: login (rate-limited), dashboard with real counts, RBAC, typed page editors, media, SEO/redirects, inbox, newsletter, users, activity log, settings.
- Public pages read published records with static fallbacks. Home SEO uses `home-page.seo`. Preview uses an httpOnly cookie after admin Preview.
- Tests: slug/RBAC/redirect-loop unit tests; e2e login gate, no Resources nav, `/resources` 404.

## Not invented

No new products, clients, metrics, leadership bios, or a Resources model.

## Verify

```bash
npm test
npm run test:e2e
npx tsc --noEmit
npm run build
```
