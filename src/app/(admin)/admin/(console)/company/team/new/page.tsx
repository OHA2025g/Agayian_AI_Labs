import { CollectionEditor } from "@/components/admin/CollectionModule";
import { teamRecordFields } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function NewTeamPage() {
  const user = await requireAdminUser();
  return (
    <CollectionEditor
      user={user}
      collection="team-members"
      title="New team member"
      fields={teamRecordFields}
      previewPath="/company/leadership"
    />
  );
}
