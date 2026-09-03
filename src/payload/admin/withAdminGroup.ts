import type { CollectionConfig, GlobalConfig } from "payload";

type HiddenFn = (args: { user?: { role?: string | null } | null }) => boolean;

type GroupExtras = {
  labels?: CollectionConfig["labels"];
  description?: string;
  hidden?: boolean | HiddenFn;
};

export function withAdminGroup<T extends CollectionConfig>(
  config: T,
  group: string,
  extras?: GroupExtras,
): T {
  return {
    ...config,
    ...(extras?.labels ? { labels: extras.labels } : {}),
    admin: {
      ...config.admin,
      group,
      ...(extras?.description
        ? { description: extras.description }
        : {}),
      ...(extras?.hidden !== undefined ? { hidden: extras.hidden } : {}),
    },
  };
}

export function withGlobalGroup<T extends GlobalConfig>(
  config: T,
  group: string,
  extras?: { label?: string; description?: string; hidden?: boolean | HiddenFn },
): T {
  return {
    ...config,
    ...(extras?.label ? { label: extras.label } : {}),
    admin: {
      ...config.admin,
      group,
      ...(extras?.description
        ? { description: extras.description }
        : {}),
      ...(extras?.hidden !== undefined ? { hidden: extras.hidden } : {}),
    },
  };
}
