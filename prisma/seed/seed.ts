import { prisma } from "../../src/lib/db";
import { eventSeed } from "./event";

export async function main() {
  await eventSeed();
}

try {
  await main();
  console.log("Seeding completed.");
} catch (e) {
  console.error("Seeding failed:", e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
