# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time placeholders (runtime values come from EasyPanel / compose)
ENV NODE_ENV=production
ENV PAYLOAD_SECRET=build-time-placeholder-not-used-in-runtime
ENV DATABASE_URI=mongodb://127.0.0.1:27017/agrayian
ENV NEXT_PUBLIC_SERVER_URL=http://localhost:3000

RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Ensure media upload directory exists for non-S3 deployments
RUN mkdir -p /app/public/media && chown -R nextjs:nodejs /app/public/media

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
