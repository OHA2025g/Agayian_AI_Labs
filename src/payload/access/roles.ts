export const ROLES = [
  "super_admin",
  "administrator",
  "editor",
  "reviewer",
  "publisher",
  "enquiry_manager",
  "media_manager",
  "viewer",
] as const;

export type Role = (typeof ROLES)[number];

export type UserWithRole = {
  id?: string | number;
  role?: Role | null;
  collection?: string;
};

export function hasRole(
  user: UserWithRole | null | undefined,
  roles: Role[],
): boolean {
  if (!user?.role) return false;
  return roles.includes(user.role);
}

export function isSuperAdmin(user: UserWithRole | null | undefined) {
  return hasRole(user, ["super_admin"]);
}

export function canAccessAdmin(user: UserWithRole | null | undefined) {
  return hasRole(user, [...ROLES]);
}

export function canManageUsers(user: UserWithRole | null | undefined) {
  return hasRole(user, ["super_admin"]);
}

export function canPublish(user: UserWithRole | null | undefined) {
  return hasRole(user, ["super_admin", "administrator", "publisher"]);
}

export function canEditContent(user: UserWithRole | null | undefined) {
  return hasRole(user, [
    "super_admin",
    "administrator",
    "editor",
    "reviewer",
    "publisher",
  ]);
}

export function canManageEnquiries(user: UserWithRole | null | undefined) {
  return hasRole(user, [
    "super_admin",
    "administrator",
    "enquiry_manager",
  ]);
}

export function canManageMedia(user: UserWithRole | null | undefined) {
  return hasRole(user, [
    "super_admin",
    "administrator",
    "media_manager",
    "editor",
    "publisher",
  ]);
}

export function isReadOnly(user: UserWithRole | null | undefined) {
  return hasRole(user, ["viewer"]);
}
