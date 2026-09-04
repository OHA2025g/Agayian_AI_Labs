import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type LimitResult = {
  success: boolean;
  remaining: number;
};

type MemoryEntry = {
  timestamps: number[];
};

const memoryStore = new Map<string, MemoryEntry>();

let redisSingleton: Redis | null | undefined;
let contactLimiter: Ratelimit | null | undefined;
let newsletterLimiter: Ratelimit | null | undefined;
let adminLoginLimiter: Ratelimit | null | undefined;
let warnedMissingUpstash = false;

function isProductionRuntime() {
  return (
    process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production"
  );
}

function getRedis(): Redis | null {
  if (redisSingleton !== undefined) return redisSingleton;
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) {
    redisSingleton = null;
    if (isProductionRuntime() && !warnedMissingUpstash) {
      warnedMissingUpstash = true;
      console.warn(
        "[rate-limit] UPSTASH_REDIS_REST_URL/TOKEN unset in production. Using in-memory limits (not shared across Vercel instances). Configure Upstash for multi-instance protection.",
      );
    }
    return null;
  }
  redisSingleton = new Redis({ url, token });
  return redisSingleton;
}

function getContactLimiter(): Ratelimit | null {
  if (contactLimiter !== undefined) return contactLimiter;
  const redis = getRedis();
  if (!redis) {
    contactLimiter = null;
    return null;
  }
  contactLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    analytics: false,
    prefix: "agrayian:contact",
  });
  return contactLimiter;
}

function getNewsletterLimiter(): Ratelimit | null {
  if (newsletterLimiter !== undefined) return newsletterLimiter;
  const redis = getRedis();
  if (!redis) {
    newsletterLimiter = null;
    return null;
  }
  newsletterLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(8, "1 h"),
    analytics: false,
    prefix: "agrayian:newsletter",
  });
  return newsletterLimiter;
}

function getAdminLoginLimiter(): Ratelimit | null {
  if (adminLoginLimiter !== undefined) return adminLoginLimiter;
  const redis = getRedis();
  if (!redis) {
    adminLoginLimiter = null;
    return null;
  }
  adminLoginLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    analytics: false,
    prefix: "agrayian:admin-login",
  });
  return adminLoginLimiter;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function memoryLimit(
  key: string,
  max: number,
  windowMs: number,
): LimitResult {
  const now = Date.now();
  const entry = memoryStore.get(key) ?? { timestamps: [] };
  entry.timestamps = entry.timestamps.filter((ts) => now - ts < windowMs);
  if (entry.timestamps.length >= max) {
    memoryStore.set(key, entry);
    return { success: false, remaining: 0 };
  }
  entry.timestamps.push(now);
  memoryStore.set(key, entry);
  return { success: true, remaining: max - entry.timestamps.length };
}

export async function limitContactRequest(
  request: Request,
): Promise<LimitResult> {
  const ip = getClientIp(request);
  const limiter = getContactLimiter();
  if (limiter) {
    const result = await limiter.limit(ip);
    return { success: result.success, remaining: result.remaining };
  }
  return memoryLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
}

export async function limitAdminLogin(ip: string): Promise<LimitResult> {
  const limiter = getAdminLoginLimiter();
  if (limiter) {
    const result = await limiter.limit(ip || "unknown");
    return { success: result.success, remaining: result.remaining };
  }
  return memoryLimit(`admin-login:${ip || "unknown"}`, 5, 10 * 60 * 1000);
}

export async function limitNewsletterRequest(
  request: Request,
): Promise<LimitResult> {
  const ip = getClientIp(request);
  const limiter = getNewsletterLimiter();
  if (limiter) {
    const result = await limiter.limit(ip);
    return { success: result.success, remaining: result.remaining };
  }
  return memoryLimit(`newsletter:${ip}`, 8, 60 * 60 * 1000);
}

/** Test helper — clears in-memory store */
export function __resetMemoryRateLimitForTests() {
  memoryStore.clear();
}
