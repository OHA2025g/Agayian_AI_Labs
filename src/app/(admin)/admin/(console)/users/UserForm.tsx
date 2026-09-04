"use client";

import { useState, useTransition } from "react";
import { saveCollectionAction } from "@/lib/admin/content-actions";
import { ADMIN_ROLES } from "@/lib/admin/validation";
import { useToast } from "@/components/admin/ToastProvider";

export function UserForm({
  id,
  initial,
}: {
  id?: string;
  initial?: { email?: string; name?: string; role?: string; disabled?: boolean };
}) {
  const { toast } = useToast();
  const [pending, start] = useTransition();
  const [email, setEmail] = useState(initial?.email ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [role, setRole] = useState(initial?.role ?? "editor");
  const [disabled, setDisabled] = useState(Boolean(initial?.disabled));
  const [password, setPassword] = useState("");

  return (
    <form
      className="admin-card max-w-xl"
      onSubmit={(event) => {
        event.preventDefault();
        start(async () => {
          const data: Record<string, unknown> = { email, name, role, disabled };
          if (password) data.password = password;
          const result = await saveCollectionAction("users", id, data);
          toast(result.ok ? "User saved" : result.error);
        });
      }}
    >
      <label className="admin-field">
        <span>Email</span>
        <input
          type="email"
          required
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
          {ADMIN_ROLES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="admin-field">
        <span>{id ? "New password (optional)" : "Password"}</span>
        <input
          type="password"
          required={!id}
          minLength={8}
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
