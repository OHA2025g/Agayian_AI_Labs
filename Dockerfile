# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 \
    NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# ---- deps + build in one stage (avoids a multi‑minute node_modules COPY) ----
FROM base AS builder

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

COPY . .

# Build-time placeholders (runtime values come from EasyPanel / compose).
# SKIP_PAYLOAD=1 so "Collecting page data" does not hang on Mongo.
ENV NODE_ENV=production \
    SKIP_PAYLOAD=1 \
    PAYLOAD_SECRET=build-time-placeholder-not-used-in-runtime \
    DATABASE_URI=mongodb://127.0.0.1:27017/agrayian-build-skip \
    NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Cache Next compile output between EasyPanel rebuilds when BuildKit is on
RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

# ---- slim runtime image ----
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN mkdir -p /app/public/media && chown -R nextjs:nodejs /app/public/media

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
