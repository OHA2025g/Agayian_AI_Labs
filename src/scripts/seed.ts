import "dotenv/config";
import { getPayload } from "payload";
import config from "../payload.config";
import { seedSiteContent } from "../lib/admin/seed-site";

async function run() {
  const payload = await getPayload({ config });

  const adminEmail = process.env.ADMIN_EMAIL || "admin@agrayian.ai";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMeNow!123";
  const users = await payload.find({
    collection: "users",
    where: { email: { equals: adminEmail } },
    limit: 1,
    overrideAccess: true,
  });
  if (!users.docs[0]) {
    await payload.create({
      collection: "users",
      data: {
        email: adminEmail,
        password: adminPassword,
        role: "super_admin",
        name: "Super Admin",
      },
      overrideAccess: true,
    });
    console.log(`Created super_admin ${adminEmail}`);
  }

  const imported = await seedSiteContent(payload);
  console.log("Seed complete.", imported);
  process.exit(0);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
