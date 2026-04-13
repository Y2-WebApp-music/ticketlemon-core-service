import { prisma } from "../../src/lib/db";

async function main() {
  console.log("Cleaning up database...");

  const { count: ticketCount } = await prisma.ticket.deleteMany();
  console.log(`Deleted ${ticketCount} rows.`);

  const { count: eventCount } = await prisma.event.deleteMany();
  console.log(`Deleted ${eventCount} rows.`);
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
