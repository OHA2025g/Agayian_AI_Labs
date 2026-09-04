import { CollectionIndex } from "@/components/admin/CollectionModule";

export default function AdminInsightsPage() {
  return (
    <CollectionIndex
      collection="insights"
      title="Insights"
      description="Public Insights stays a standalone module. Do not label this Resources."
      createHref="/admin/insights/new"
      columns={[
        { key: "name", label: "Title" },
        { key: "slug", label: "Slug" },
        { key: "category", label: "Type" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
