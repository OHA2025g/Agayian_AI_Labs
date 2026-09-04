import {
  canEditContent,
  canManageEnquiries,
  canManageMedia,
  canManageUsers,
  canPublish,
  isReadOnly,
  isSuperAdmin,
  type Role,
  type UserWithRole,
} from "@/payload/access/roles";

export type AdminUiRole = "Administrator" | "Editor";

export type AdminUser = {
  id: string;
  email: string;
  name?: string;
  role: Role;
  uiRole: AdminUiRole;
};

export function toUiRole(role: Role | null | undefined): AdminUiRole {
  if (
    role === "super_admin" ||
    role === "administrator" ||
    role === "publisher"
  ) {
    return "Administrator";
  }
  return "Editor";
}

export function mapAdminUser(user: {
  id?: string | number;
  email?: string | null;
  name?: string | null;
  role?: Role | null;
}): AdminUser {
  const role = user.role ?? "viewer";
  return {
    id: String(user.id ?? ""),
    email: user.email ?? "",
    name: user.name ?? undefined,
    role,
    uiRole: toUiRole(role),
  };
}

export function asUser(user: AdminUser): UserWithRole {
  return { id: user.id, role: user.role, collection: "users" };
}

export function adminCanPublish(user: AdminUser) {
  return canPublish(asUser(user));
}

export function adminCanEdit(user: AdminUser) {
  return canEditContent(asUser(user)) && !isReadOnly(asUser(user));
}

export function adminCanManageUsers(user: AdminUser) {
  return canManageUsers(asUser(user));
}

export function adminCanManageInbox(user: AdminUser) {
  return canManageEnquiries(asUser(user)) || adminCanEdit(user);
}

export function adminCanManageMedia(user: AdminUser) {
  return canManageMedia(asUser(user));
}

export function adminCanOpenCms(user: AdminUser) {
  return isSuperAdmin(asUser(user));
}

export function forbiddenHref(path: string) {
  return `/admin/login?from=${encodeURIComponent(path)}`;
}
