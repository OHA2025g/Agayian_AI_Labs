"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  adminCanOpenCms,
  mapAdminUser,
} from "@/lib/admin/rbac";
import { loginSchema } from "@/lib/admin/validation";
import {
  clearAdminSession,
  getAdminUser,
  setAdminSession,
} from "@/lib/admin/session";
import { getAdminPayload } from "@/lib/payload";
import { limitAdminLogin } from "@/lib/rate-limit";

function clientIp(headerStore: Headers) {
  const forwarded = headerStore.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headerStore.get("x-real-ip") || headerStore.get("cf-connecting-ip") || "unknown";
}

export async function loginAction(formData: FormData) {
  const from = String(formData.get("from") ?? "/admin");
  const safeFrom = from.startsWith("/admin") ? from : "/admin";
  const fail = (message: string): never => {
    redirect(
      `/admin/login?from=${encodeURIComponent(safeFrom)}&error=${encodeURIComponent(message)}`,
    );
  };

  const parsed = loginSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  if (!parsed.success) {
    fail("Enter a valid work email and password.");
  }
  const credentials = parsed.success
    ? parsed.data
    : { email: "", password: "" };

  const headerStore = await headers();
  const limited = await limitAdminLogin(clientIp(headerStore));
  if (!limited.success) {
    fail("Too many sign-in attempts. Try again in a few minutes.");
  }

  try {
    const payload = await getAdminPayload();
    const result = await payload.login({
      collection: "users",
      data: credentials,
    });
    const user = result.user as { disabled?: boolean; email?: string } | undefined;
    const token = result.token;
    if (!token || !user) {
      fail("Sign-in failed.");
      return;
    }
    if (user.disabled) {
      fail("This account is disabled.");
      return;
    }
    const expires = result.exp ? new Date(result.exp * 1000) : undefined;
    await setAdminSession(token, expires);
  } catch {
    fail("Email or password is incorrect.");
  }

  redirect(safeFrom);
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function cmsEscapeHref() {
  const user = await getAdminUser();
  if (!user || !adminCanOpenCms(user)) return null;
  return "/cms";
}

export async function currentAdmin() {
  const user = await getAdminUser();
  return user ? mapAdminUser(user) : null;
}
