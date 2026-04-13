import { prisma } from "../../src/lib/db";
import { TicketSchema } from "../../src/modules/ticket/ticket.model";

export const ticketSeed = async () => {
  const tickets: (TicketSchema & { id: string })[] = [
    // Bangkok Music Festival tickets
    {
      id: "tkt_001_001",
      event_id: "evt_001",
      user_id: "user_001",
      type: "VIP",
      price: 5000,
      qr_code: "QR001-MUSIC-VIP-001"
    },
    {
      id: "tkt_001_002",
      event_id: "evt_001",
      user_id: "user_002",
      type: "General",
      price: 2500,
      qr_code: "QR001-MUSIC-GEN-001"
    },
    {
      id: "tkt_001_003",
      event_id: "evt_001",
      user_id: "user_003",
      type: "General",
      price: 2500,
      qr_code: "QR001-MUSIC-GEN-002"
    },
    // Tech Conference tickets
    {
      id: "tkt_002_001",
      event_id: "evt_002",
      user_id: "user_001",
      type: "Early Bird",
      price: 3000,
      qr_code: "QR002-TECH-EB-001"
    },
    {
      id: "tkt_002_002",
      event_id: "evt_002",
      user_id: "user_004",
      type: "Regular",
      price: 5000,
      qr_code: "QR002-TECH-REG-001"
    },
    // Stand-up Comedy tickets
    {
      id: "tkt_003_001",
      event_id: "evt_003",
      user_id: "user_002",
      type: "Standard",
      price: 800,
      qr_code: "QR003-COMEDY-STD-001"
    },
    {
      id: "tkt_003_002",
      event_id: "evt_003",
      user_id: "user_005",
      type: "Standard",
      price: 800,
      qr_code: "QR003-COMEDY-STD-002"
    },
    // Art Exhibition tickets
    {
      id: "tkt_004_001",
      event_id: "evt_004",
      user_id: "user_001",
      type: "General",
      price: 0,
      qr_code: "QR004-ART-GEN-001"
    },
    {
      id: "tkt_004_002",
      event_id: "evt_004",
      user_id: "user_004",
      type: "General",
      price: 0,
      qr_code: "QR004-ART-GEN-002"
    },
    // Startup Pitch Day tickets
    {
      id: "tkt_005_001",
      event_id: "evt_005",
      user_id: "user_003",
      type: "Attendee",
      price: 1500,
      qr_code: "QR005-STARTUP-ATT-001"
    }
  ];

  for (const ticketData of tickets) {
    await prisma.ticket.upsert({
      where: { id: ticketData.id },
      update: {},
      create: ticketData,
    });
  }
}
