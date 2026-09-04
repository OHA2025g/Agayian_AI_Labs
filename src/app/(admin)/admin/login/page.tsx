import { redirect } from "next/navigation";
import { AgrayianMark } from "@/components/layout/AgrayianMark";
import { loginAction } from "@/lib/admin/auth-actions";
import { getAdminUser } from "@/lib/admin/session";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const user = await getAdminUser();
  const params = await searchParams;
  if (user) redirect(params.from?.startsWith("/admin") ? params.from : "/admin");

  return (
    <main id="admin-main" className="admin-login">
      <section className="admin-login-brand">
        <div>
          <AgrayianMark variant="light" className="h-10 w-10" />
          <p className="mt-8 text-xs uppercase tracking-[0.18em] text-white/55">
            Agrayian AI Labs
          </p>
          <h1 className="mt-3 max-w-sm text-3xl font-semibold leading-tight">
            Publish the live site from a dedicated content console.
          </h1>
        </div>
        <p className="max-w-sm text-sm text-white/65">
          Draft, review, restore and publish page copy without opening the
          emergency CMS.
        </p>
      </section>
      <section className="admin-login-panel">
        <div className="admin-card w-full max-w-md">
          <p className="admin-kicker">Secure access</p>
          <h2 className="admin-title">Admin sign in</h2>
          <p className="admin-lede">Use your work email to continue.</p>
          <form action={loginAction} className="mt-6 space-y-4">
            <input type="hidden" name="from" value={params.from || "/admin"} />
            <label className="admin-field">
              <span>Work email</span>
              <input type="email" name="email" autoComplete="username" required />
            </label>
            <label className="admin-field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                minLength={8}
              />
            </label>
            {params.error ? (
              <p className="text-sm text-[var(--admin-coral)]" role="alert">
                {params.error}
              </p>
            ) : null}
            <button type="submit" className="admin-btn admin-btn-primary w-full">
              Sign in
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
