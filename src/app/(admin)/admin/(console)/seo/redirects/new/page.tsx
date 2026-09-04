import { CollectionEditor } from "@/components/admin/CollectionModule";
import { redirectRecordFields } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function NewRedirectPage() {
  const user = await requireAdminUser();
  return (
    <CollectionEditor
      user={user}
      collection="redirects"
      title="New redirect"
      fields={redirectRecordFields}
    />
  );
}
