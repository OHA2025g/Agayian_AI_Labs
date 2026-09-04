import { CollectionEditor } from "@/components/admin/CollectionModule";
import { faqRecordFields } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAdminUser();
  const { id } = await params;
  return (
    <CollectionEditor
      user={user}
      collection="faqs"
      id={id}
      title="Edit FAQ"
      fields={faqRecordFields}
    />
  );
}
