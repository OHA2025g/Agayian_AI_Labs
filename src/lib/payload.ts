import { getPayload } from "payload";
import type { Payload } from "payload";
import config from "@payload-config";

const CONNECT_BUDGET_MS = 2000;
const FAIL_COOLDOWN_MS = 10_000;

let cached: Promise<Payload> | null = null;
let cooldownUntil = 0;

/**
 * Shared Payload client. Fails fast so public pages can fall back to
 * static catalog data instead of waiting on Mongo. A failed connect
 * cools down briefly so every request does not reopen a 30s socket.
 */
export async function getPayloadClient() {
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
    if (error instanceof Error && error.message === "Payload connect timeout") {
      throw error;
    }
    cached = null;
    cooldownUntil = Date.now() + FAIL_COOLDOWN_MS;
    throw error;
  }
}
