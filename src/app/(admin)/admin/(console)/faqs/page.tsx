import { CollectionIndex } from "@/components/admin/CollectionModule";

export default function AdminFaqsPage() {
  return (
    <CollectionIndex
      collection="faqs"
      title="FAQs"
      createHref="/admin/faqs/new"
      columns={[
        { key: "name", label: "Question" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
