import { CollectionEditor } from "@/components/admin/CollectionModule";
import { teamRecordFields } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function EditTeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAdminUser();
  const { id } = await params;
  return (
    <CollectionEditor
      user={user}
      collection="team-members"
      id={id}
      title="Edit team member"
      fields={teamRecordFields}
      previewPath="/company/leadership"
    />
  );
}
