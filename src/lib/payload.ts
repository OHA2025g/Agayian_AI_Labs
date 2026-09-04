import { getPayload } from "payload";
import type { Payload } from "payload";
import config from "@payload-config";

const CONNECT_BUDGET_MS = 2000;
const FAIL_COOLDOWN_MS = 10_000;

let cached: Promise<Payload> | null = null;
let cooldownUntil = 0;

/** Docker / EasyPanel image builds have no Mongo. Skip the client entirely. */
export function isPayloadSkipped() {
  return (
    process.env.SKIP_PAYLOAD === "1" ||
    process.env.NEXT_PHASE === "phase-production-build"
  );
}

/**
 * Shared Payload client. Fails fast so public pages can fall back to
 * static catalog data instead of waiting on Mongo. A failed connect
 * cools down briefly so every request does not reopen a 30s socket.
 */
let adminCached: Promise<Payload> | null = null;

/** Admin mutations need a real Mongo connection, not the public 2s budget. */
export async function getAdminPayload() {
  if (isPayloadSkipped()) {
    throw new Error("Payload unavailable");
  }

  if (!adminCached) {
    const request = getPayload({ config });
    adminCached = request;
    request.catch(() => {
      if (adminCached === request) adminCached = null;
    });
  }

  return adminCached;
}

export async function getPayloadClient() {
  if (isPayloadSkipped()) {
    throw new Error("Payload unavailable");
  }

  if (Date.now() < cooldownUntil) {
    throw new Error("Payload unavailable");
  }

  if (!cached) {
    const request = getPayload({ config });
    cached = request;
    request.catch(() => {
      if (cached === request) cached = null;
      cooldownUntil = Date.now() + FAIL_COOLDOWN_MS;
    });
  }

  try {
    return await Promise.race([
      cached,
      new Promise<never>((_, reject) => {
        setTimeout(
          () => reject(new Error("Payload connect timeout")),
          CONNECT_BUDGET_MS,
        );
      }),
    ]);
  } catch (error) {
    cached = null;
    cooldownUntil = Date.now() + FAIL_COOLDOWN_MS;
    throw error;
  }
}
