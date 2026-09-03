type HiddenUser = { role?: string | null } | null | undefined;

type HiddenArgs = { user?: HiddenUser };

export function hideUnlessSuperAdmin({ user }: HiddenArgs) {
  return user?.role !== "super_admin";
}

export function hideWebsiteFromSpecialists({ user }: HiddenArgs) {
  return user?.role === "enquiry_manager" || user?.role === "media_manager";
}

export function hideLeadsFromMedia({ user }: HiddenArgs) {
  return user?.role === "media_manager";
}

export function hideMediaFromEnquiry({ user }: HiddenArgs) {
  return user?.role === "enquiry_manager";
}
