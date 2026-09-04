import { CollectionIndex } from "@/components/admin/CollectionModule";

export default function AdminImpactStoriesPage() {
  return (
    <CollectionIndex
      collection="impact-stories"
      title="Impact Stories"
      createHref="/admin/impact-stories/new"
      columns={[
        { key: "name", label: "Title" },
        { key: "slug", label: "Slug" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
