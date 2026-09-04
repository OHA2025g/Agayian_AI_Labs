import { CollectionIndex } from "@/components/admin/CollectionModule";

export const dynamic = "force-dynamic";

export default function AdminIndustriesPage() {
  return (
    <CollectionIndex
      collection="industries"
      title="Industries"
      createHref="/admin/industries/new"
      columns={[
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
