import type { Field } from "payload";
import { isSuperAdmin, type UserWithRole } from "../access/roles";

export function hideFromOrdinaryEditors<T extends Field>(field: T): T {
  return {
    ...field,
    admin: {
      ...(field.admin ?? {}),
      condition: (
        _data: unknown,
        _sibling: unknown,
        { user }: { user?: UserWithRole | null },
      ) => isSuperAdmin(user),
    },
  } as T;
}
