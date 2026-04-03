import { prisma } from "../../src/lib/db";

async function main() {
  console.log("Cleaning up database...");

  const { count } = await prisma.event.deleteMany();
  console.log(`Deleted ${count} rows.`);
}

try {
  await main();
  console.log("Cleaning up completed.");
} catch (e) {
  console.error("Cleaning up failed:", e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
