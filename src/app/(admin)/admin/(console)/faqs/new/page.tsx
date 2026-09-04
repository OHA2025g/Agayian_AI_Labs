import { CollectionEditor } from "@/components/admin/CollectionModule";
import { faqRecordFields } from "@/lib/admin/fields";
import { requireAdminUser } from "@/lib/admin/session";

export default async function NewFaqPage() {
  const user = await requireAdminUser();
  return (
    <CollectionEditor
      user={user}
      collection="faqs"
      title="New FAQ"
      fields={faqRecordFields}
    />
  );
}
