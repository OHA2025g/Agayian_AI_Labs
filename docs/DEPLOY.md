# Deploy with Docker / EasyPanel

This app is packaged for EasyPanel (or any Docker host) with:

- `Dockerfile` — Next.js standalone production image
- `docker-compose.yml` — `web` + MongoDB

## Services

| Service | Image / build | Port | Notes |
|---------|---------------|------|--------|
| `mongo` | `mongo:7` | `27017` | Persistent volume `agrayian_mongo` |
| `web` | build from `Dockerfile` | `3000` | App + Payload admin |

## EasyPanel setup

1. Create a new project in EasyPanel.
2. Add the app from this Git repository (Docker Compose or Dockerfile mode).
3. Prefer **Compose** so MongoDB and the app deploy together.
4. Set environment variables on the `web` service (minimum):

| Variable | Example |
|----------|---------|
| `PAYLOAD_SECRET` | long random string |
| `DATABASE_URI` | `mongodb://mongo:27017/agrayian` |
| `NEXT_PUBLIC_SERVER_URL` | `https://your-domain.com` |
| `PREVIEW_SECRET` | random string |
| `CRON_SECRET` | random string |
| `ADMIN_EMAIL` | your admin email |
| `ADMIN_PASSWORD` | strong password |

5. Expose / map the `web` service to port **3000** and attach your domain.
6. Keep a volume on `/app/public/media` if you are **not** using S3.
7. After first deploy, seed content once:

```bash
# Inside the web container / one-off job
npm run payload:seed
```

Or run seed from your laptop against the remote Mongo URI if the network allows.

8. Open `https://your-domain.com/admin` and sign in.

The Docker image build does **not** talk to Mongo (`SKIP_PAYLOAD=1`). Public pages compile against the static catalog. Payload connects to `DATABASE_URI` only when the container starts.

### Faster rebuilds

The `Dockerfile` uses BuildKit cache mounts for `npm` and `.next/cache`. First deploy is still slow (full install + compile). Later deploys that only change app code are much faster when EasyPanel keeps the builder cache.

Tips:
- Don’t clear the service build cache unless you must
- Prefer small commits after the first successful image
- Keep `package-lock.json` committed so `npm ci` layers cache cleanly

### Optional: MongoDB with auth

In EasyPanel, set Mongo init credentials, then use:

```text
DATABASE_URI=mongodb://USER:PASSWORD@mongo:27017/agrayian?authSource=admin
```

### Optional: S3 media

Set `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT`, `S3_REGION` so uploads do not rely on the container filesystem.

## Local full-stack Docker

```bash
cp .env.example .env
# edit PAYLOAD_SECRET and NEXT_PUBLIC_SERVER_URL
npm run docker:up
```

Site: http://localhost:3000  
Admin: http://localhost:3000/admin  

Stop:

```bash
npm run docker:down
```

## Database-only local (Next on host)

```bash
npm run db:up          # starts Mongo only
npm run dev
npm run payload:seed
```

## Notes

- Payload + MongoDB does **not** use the old Postgres SQL migrations under `src/migrations` (legacy; safe to ignore).
- Static catalog fallbacks still serve the public site if Mongo is briefly unavailable.
- Set `NEXT_PUBLIC_SERVER_URL` to the public HTTPS origin in production (Payload + SEO).
