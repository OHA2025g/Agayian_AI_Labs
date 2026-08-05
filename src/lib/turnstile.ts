export type TurnstileVerifyResult = {
  ok: boolean;
  message?: string;
};

function isProductionRuntime() {
  return (
    process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production"
  );
}

/**
 * Verifies a Cloudflare Turnstile token.
 * Production: TURNSTILE_SECRET_KEY is required (fail-closed).
 * Local/preview: verification is skipped when the secret is unset.
 */
export async function verifyTurnstileToken(
  token: string | undefined | null,
  request?: Request,
): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (!secret) {
    if (isProductionRuntime()) {
      console.error(
        "[turnstile] TURNSTILE_SECRET_KEY is required in production.",
      );
      return {
        ok: false,
        message:
          "Security check is not configured. Please try again later or email hello@agrayian.ai.",
      };
    }
    return { ok: true };
  }

  if (!token) {
    return {
      ok: false,
      message: "Please complete the security check and try again.",
    };
  }

  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  const ip =
    request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request?.headers.get("x-real-ip") ||
    undefined;
  if (ip) form.set("remoteip", ip);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: form,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    );
    const data = (await response.json()) as { success?: boolean };
    if (!data.success) {
      return {
        ok: false,
        message: "Security check failed. Please try again.",
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "Security check unavailable. Please try again shortly.",
    };
  }
}

export function getTurnstileSiteKey() {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";
}
