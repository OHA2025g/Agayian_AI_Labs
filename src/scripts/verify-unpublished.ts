import "dotenv/config";
import { getPayload } from "payload";
import config from "../payload.config";

async function main() {
  const payload = await getPayload({ config });
  const draft = await payload.create({
    collection: "products",
    data: {
      slug: "unpublished-smoke-test",
      name: "Unpublished Smoke",
      category: "Test",
      shortDescription: "Should not be public",
      status: "draft",
    },
    draft: true,
    overrideAccess: true,
  });

  const published = await payload.find({
    collection: "products",
    where: {
      and: [
        { slug: { equals: "unpublished-smoke-test" } },
        { status: { equals: "published" } },
      ],
    },
    overrideAccess: false,
    limit: 1,
  });

  const publicAccess = await payload.find({
    collection: "products",
    where: { slug: { equals: "unpublished-smoke-test" } },
    overrideAccess: false,
    limit: 1,
  });

  await payload.delete({
    collection: "products",
    id: draft.id,
    overrideAccess: true,
  });

  const ok = published.docs.length === 0 && publicAccess.docs.length === 0;
  console.log(
    JSON.stringify({
      published_query_count: published.docs.length,
      public_access_count: publicAccess.docs.length,
      unpublished_gated_ok: ok,
    }),
  );
  process.exit(ok ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
