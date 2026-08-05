import { getPayload } from "payload";
import type { Payload } from "payload";
import config from "@payload-config";

let cached: Promise<Payload> | null = null;

/**
 * Shared Payload client. Resets the cache on failure so a temporary
 * Postgres outage does not permanently poison subsequent requests, and
 * attaches an early catch to avoid unhandledRejection noise in Next.js.
 */
export async function getPayloadClient() {
  if (!cached) {
    const request = getPayload({ config });
    cached = request;
    request.catch(() => {
      if (cached === request) cached = null;
    });
  }

  try {
    return await cached;
  } catch (error) {
    cached = null;
    throw error;
  }
}
