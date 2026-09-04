import { CollectionEditor } from "@/components/admin/CollectionModule";
import { redirectRecordFields } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function EditRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAdminUser();
  const { id } = await params;
  return (
    <CollectionEditor
      user={user}
      collection="redirects"
      id={id}
      title="Edit redirect"
      fields={redirectRecordFields}
    />
  );
}
