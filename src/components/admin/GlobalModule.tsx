import type { GlobalSlug } from "@/lib/admin/content-actions";
import type { EditorTab } from "@/lib/admin/fields";
import { loadGlobal, loadVersions } from "@/lib/admin/queries";
import type { AdminUser } from "@/lib/admin/rbac";
import { adminCanEdit, adminCanPublish } from "@/lib/admin/rbac";
import { DocumentEditor } from "./DocumentEditor";

export async function GlobalModule({
  user,
  slug,
  title,
  description,
  tabs,
  previewPath,
}: {
  user: AdminUser;
  slug: GlobalSlug;
  title: string;
  description?: string;
  tabs: EditorTab[];
  previewPath?: string;
}) {
  const [initial, versions] = await Promise.all([
    loadGlobal(slug),
    loadVersions("global", slug),
  ]);

  return (
    <DocumentEditor
      title={title}
      description={description}
      tabs={tabs}
      initial={initial}
      canEdit={adminCanEdit(user)}
      canPublish={adminCanPublish(user)}
      previewPath={previewPath}
      versions={versions}
      target={{ kind: "global", slug }}
      resettable={slug === "capabilities-page"}
    />
  );
}
