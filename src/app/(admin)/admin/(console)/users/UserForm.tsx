"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveUserAction } from "@/lib/admin/content-actions";
import { assignableRoles } from "@/lib/admin/rbac";
import type { Role } from "@/payload/access/roles";
import { useToast } from "@/components/admin/ToastProvider";

export function UserForm({
  id,
  initial,
  actorRole,
}: {
  id?: string;
  initial?: { email?: string; name?: string; role?: string; disabled?: boolean };
  actorRole: Role;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, start] = useTransition();
  const roles = assignableRoles(actorRole);
  const [email, setEmail] = useState(initial?.email ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [role, setRole] = useState(initial?.role ?? roles[0] ?? "editor");
  const [disabled, setDisabled] = useState(Boolean(initial?.disabled));
  const [password, setPassword] = useState("");

  return (
    <form
      className="admin-card max-w-xl"
      onSubmit={(event) => {
        event.preventDefault();
        start(async () => {
          const result = await saveUserAction({
            id,
            email,
            name,
            role,
            password: password || undefined,
            disabled,
          });
          toast(result.ok ? "User saved in the database" : result.error);
          if (result.ok && result.id) {
            router.push(`/admin/users/${result.id}`);
            router.refresh();
          }
        });
      }}
    >
      <label className="admin-field">
        <span>Email</span>
        <input
          type="email"
          required
          autoComplete="off"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="admin-field">
        <span>Name</span>
        <input value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label className="admin-field">
        <span>Role</span>
        <select value={role} onChange={(event) => setRole(event.target.value)}>
          {roles.map((item) => (
            <option key={item} value={item}>
              {item.replace(/_/g, " ")}
            </option>
          ))}
        </select>
        <small>This role is written to Mongo and used for the next sign-in.</small>
      </label>
      <label className="admin-field">
        <span>{id ? "New password (optional)" : "Password"}</span>
        <input
          type="password"
          required={!id}
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <label className="admin-field flex-row items-center gap-2">
        <input
          type="checkbox"
          checked={disabled}
          onChange={(event) => setDisabled(event.target.checked)}
        />
        <span>Disabled</span>
      </label>
      <button type="submit" className="admin-btn admin-btn-primary" disabled={pending}>
        Save user
      </button>
    </form>
  );
}
