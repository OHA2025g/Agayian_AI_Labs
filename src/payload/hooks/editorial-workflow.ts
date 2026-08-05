import type { CollectionBeforeChangeHook } from "payload";
import {
  canPublish,
  hasRole,
  type UserWithRole,
} from "../access/roles";

const EDITOR_STATUSES = new Set(["draft", "in_review"]);
const REVIEWER_STATUSES = new Set(["draft", "in_review", "approved"]);
const PUBLISHER_STATUSES = new Set([
  "draft",
  "in_review",
  "approved",
  "published",
  "archived",
]);

export const enforceEditorialStatus: CollectionBeforeChangeHook = ({
  data,
  req,
  operation,
}) => {
  if (!data || typeof data !== "object" || !("status" in data)) return data;
  const status = String(data.status ?? "");
  const user = req.user as UserWithRole | undefined;

  // Seed / Local API with overrideAccess often has no req.user — allow.
  if (!user) {
    return data;
  }

  void operation;

  if (canPublish(user) || hasRole(user, ["super_admin", "administrator"])) {
    if (!PUBLISHER_STATUSES.has(status)) {
      throw new Error(`Invalid status: ${status}`);
    }
    return data;
  }

  if (hasRole(user, ["reviewer"])) {
    if (!REVIEWER_STATUSES.has(status)) {
      throw new Error(
        "Reviewers may set draft, in_review, or approved only.",
      );
    }
    return data;
  }

  if (hasRole(user, ["editor"])) {
    if (!EDITOR_STATUSES.has(status)) {
      throw new Error("Editors may set draft or in_review only.");
    }
    return data;
  }

  throw new Error("You cannot change editorial status.");
};
