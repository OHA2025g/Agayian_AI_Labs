import type { Access, FieldAccess } from "payload";
import {
  canEditContent,
  canManageEnquiries,
  canManageMedia,
  canManageUsers,
  canPublish,
  isReadOnly,
  isSuperAdmin,
  type UserWithRole,
} from "./roles";

export const authenticated: Access = ({ req }) => Boolean(req.user);

export const anyone: Access = () => true;

export const adminOnly: Access = ({ req }) =>
  canManageUsers(req.user as UserWithRole);

export const contentRead: Access = ({ req }) => {
  if (req.user)
    return (
      canEditContent(req.user as UserWithRole) ||
      isReadOnly(req.user as UserWithRole)
    );
  return {
    status: {
      equals: "published",
    },
  };
};

/** Globals do not support query constraints — filter published in app helpers. */
export const globalRead: Access = ({ req }) => {
  if (!req.user) return true;
  return (
    canEditContent(req.user as UserWithRole) ||
    isReadOnly(req.user as UserWithRole)
  );
};

export const contentCreate: Access = ({ req }) =>
  canEditContent(req.user as UserWithRole) && !isReadOnly(req.user as UserWithRole);

export const contentUpdate: Access = ({ req }) => {
  const user = req.user as UserWithRole;
  if (isReadOnly(user)) return false;
  return canEditContent(user);
};

export const contentDelete: Access = ({ req }) =>
  isSuperAdmin(req.user as UserWithRole) ||
  canPublish(req.user as UserWithRole);

export const mediaAccess: Access = ({ req }) => {
  if (!req.user) return false;
  return canManageMedia(req.user as UserWithRole) || isReadOnly(req.user as UserWithRole);
};

export const mediaMutate: Access = ({ req }) =>
  canManageMedia(req.user as UserWithRole) && !isReadOnly(req.user as UserWithRole);

export const enquiryAccess: Access = ({ req }) =>
  canManageEnquiries(req.user as UserWithRole) || isReadOnly(req.user as UserWithRole);

export const enquiryMutate: Access = ({ req }) =>
  canManageEnquiries(req.user as UserWithRole);

export const publishedOnlyField: FieldAccess = ({ req }) => Boolean(req.user);

/** Who may touch the status field at all (values constrained in editorial-workflow hook). */
export const statusFieldAccess: FieldAccess = ({ req }) => {
  const user = req.user as UserWithRole;
  if (!user) return false;
  if (isReadOnly(user)) return false;
  return canEditContent(user);
};

export { isSuperAdmin, canPublish, canManageEnquiries };
