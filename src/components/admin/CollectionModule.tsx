import Link from "next/link";
import type { EditableCollection } from "@/lib/admin/content-actions";
import type { AdminField, EditorTab } from "@/lib/admin/fields";
import { loadCollectionDoc, loadCollectionList, loadVersions } from "@/lib/admin/queries";
import { adminCanEdit, adminCanPublish, type AdminUser } from "@/lib/admin/rbac";
import { getAdminUser } from "@/lib/admin/session";
import { DataTable } from "./DataTable";
import { DocumentEditor } from "./DocumentEditor";
import { RecordActions } from "./RecordActions";

export async function CollectionIndex({
  collection,
  title,
  description,
  columns,
  createHref,
  extra,
}: {
  collection: EditableCollection;
  title: string;
  description?: string;
  columns: { key: string; label: string }[];
  createHref: string;
  extra?: React.ReactNode;
}) {
  const actor = await getAdminUser();
  const canDelete = Boolean(actor && adminCanPublish(actor));
  const { docs } = await loadCollectionList(collection);
  const rows = docs.map((doc) => {
    const href = `${createHref.replace(/\/new$/, "")}/${doc.id}`;
    const name = String(
      doc.name ?? doc.title ?? doc.question ?? doc.fromPath ?? doc.email ?? doc.id,
    );
    return {
      id: String(doc.id ?? ""),
      href,
      name,
      slug: String(doc.slug ?? doc.toPath ?? ""),
      status: String(doc.status ?? doc.type ?? ""),
      updatedAt: doc.updatedAt
        ? new Date(String(doc.updatedAt)).toLocaleString()
        : "",
      category: Array.isArray(doc.categories) && doc.categories.length
        ? doc.categories.join(", ")
        : String(doc.category ?? doc.type ?? ""),
      actions: (
        <RecordActions
          href={href}
          collection={collection}
          id={String(doc.id ?? "")}
          name={name}
          canDelete={canDelete}
        />
      ),
    };
  });

  return (
    <section className="admin-panel">
      <div className="admin-panel-head">
        <div>
          <p className="admin-kicker">Records</p>
          <h1 className="admin-title">{title}</h1>
          {description ? (
            <p className="admin-lede">{description}</p>
          ) : (
            <p className="admin-lede">
              Open a row to edit it, or delete it from this list.
            </p>
          )}
        </div>
        <Link href={createHref} className="admin-btn admin-btn-primary">
          New
        </Link>
      </div>
      {extra}
      <div className="admin-card admin-card-table">
        <DataTable
          columns={[...columns, { key: "actions", label: "Actions" }]}
          rows={rows}
          empty="No records in this database yet. Import original site content from the Dashboard."
        />
      </div>
    </section>
  );
}

export async function CollectionEditor({
  user,
  collection,
  id,
  title,
  fields,
  previewPath,
}: {
  user: AdminUser;
  collection: EditableCollection;
  id?: string;
  title: string;
  fields: AdminField[];
  previewPath?: string;
}) {
  const initial = id
    ? await loadCollectionDoc(collection, id)
    : { status: "draft" };
  const versions = id ? await loadVersions("collection", collection, id) : [];
  const tabs: EditorTab[] = [{ id: "content", label: "Content", fields }];

  return (
    <DocumentEditor
      title={title}
      tabs={tabs}
      initial={initial}
      canEdit={adminCanEdit(user)}
      canPublish={adminCanPublish(user)}
      previewPath={previewPath}
      versions={versions}
      target={{ kind: "collection", collection, id }}
    />
  );
}
