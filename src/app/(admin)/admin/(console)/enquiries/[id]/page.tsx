import { adminCanManageInbox } from "@/lib/admin/rbac";
import { loadCollectionDoc, loadCollectionList } from "@/lib/admin/queries";
import { requireAdminUser } from "@/lib/admin/session";
import { EnquiryActions } from "./EnquiryActions";

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAdminUser();
  if (!adminCanManageInbox(user)) return <p>You cannot view the inbox.</p>;
  const { id } = await params;
  const [doc, users] = await Promise.all([
    loadCollectionDoc("enquiries", id),
    loadCollectionList("users"),
  ]);
  const notes = Array.isArray(doc.notes)
    ? (doc.notes as { body?: string; createdAt?: string }[])
    : [];

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="admin-card">
        <h1 className="text-2xl font-semibold">{String(doc.fullName ?? "Enquiry")}</h1>
        <dl className="mt-4 space-y-2 text-sm">
          <div>
            <dt className="text-[var(--admin-muted)]">Email</dt>
            <dd>{String(doc.workEmail ?? "")}</dd>
          </div>
          <div>
            <dt className="text-[var(--admin-muted)]">Organisation</dt>
            <dd>{String(doc.organisation ?? "—")}</dd>
          </div>
          <div>
            <dt className="text-[var(--admin-muted)]">Interest</dt>
            <dd>{String(doc.areaOfInterest ?? "—")}</dd>
          </div>
          <div>
            <dt className="text-[var(--admin-muted)]">Summary</dt>
            <dd>{String(doc.projectSummary ?? "—")}</dd>
          </div>
        </dl>
      </div>
      <div className="admin-card">
        <EnquiryActions
          id={id}
          status={String(doc.status ?? "new")}
          archived={Boolean(doc.archived)}
          assignee={
            typeof doc.assignee === "object" && doc.assignee && "id" in doc.assignee
              ? String((doc.assignee as { id: unknown }).id)
              : String(doc.assignee ?? "")
          }
          users={users.docs.map((item) => ({
            id: String(item.id),
            email: String(item.email ?? ""),
          }))}
        />
        <h2 className="mt-5 text-sm font-semibold">Notes</h2>
        <ul className="mt-2 space-y-2 text-sm">
          {notes.map((note, index) => (
            <li key={`${note.createdAt}-${index}`}>
              {note.body}
              <div className="text-xs text-[var(--admin-muted)]">
                {note.createdAt ? new Date(note.createdAt).toLocaleString() : ""}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
