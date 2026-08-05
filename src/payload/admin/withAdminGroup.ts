import type { CollectionConfig, GlobalConfig } from "payload";

export function withAdminGroup<T extends CollectionConfig>(
  config: T,
  group: string,
): T {
  return {
    ...config,
    admin: {
      ...config.admin,
      group,
    },
  };
}

export function withGlobalGroup<T extends GlobalConfig>(
  config: T,
  group: string,
): T {
  return {
    ...config,
    admin: {
      ...config.admin,
      group,
    },
  };
}
