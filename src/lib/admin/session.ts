import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminPayload, isPayloadSkipped } from "@/lib/payload";
import { mapAdminUser, type AdminUser } from "@/lib/admin/rbac";

const COOKIE_NAME = "payload-token";

export async function getAdminUser(): Promise<AdminUser | null> {
  const hdrs = await headers();
  if (isPayloadSkipped()) return null;
  try {
    const payload = await getAdminPayload();
    const auth = await payload.auth({ headers: hdrs });
    if (!auth.user || auth.user.collection !== "users") return null;
    return mapAdminUser(auth.user);
  } catch {
    return null;
  }
}

export async function requireAdminUser(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}

export async function setAdminSession(token: string, expires?: Date) {
  const store = await cookies();
  store.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
