import { randomUUIDv7 } from "bun";
import { prisma } from "../../src/lib/db";
import { EventSchema, eventStatus } from "../../src/modules/event/event.model";

export const eventSeed = async () => {
  const events: EventSchema[] = [
    {
      id: randomUUIDv7(),
      name: "Bangkok Music Festival 2026",
      org_name: "Live Nation Thailand",
      description: "A large-scale outdoor music festival featuring international artists.",
      category: "Music",
      location: "Impact Arena, Bangkok",
      event_start: new Date("2026-06-10T18:00:00Z"),
      event_end: new Date("2026-06-10T23:59:00Z"),
      sale_start: new Date("2026-04-01T00:00:00Z"),
      sale_end: new Date("2026-06-09T23:59:00Z"),
      ticket_type: [
        { name: "VIP", price: 5000 },
        { name: "General", price: 2500 }
      ],
      status: eventStatus.OnSale,
      poster_url: "https://picsum.photos/200/300",
      age_restriction: 18
    },
    {
      id: randomUUIDv7(),
      name: "Tech Conference Thailand 2026",
      org_name: "TechHub Asia",
      description: "Annual tech conference focusing on cloud and AI.",
      category: "Conference",
      location: "Queen Sirikit Convention Center",
      event_start: new Date("2026-08-15T09:00:00Z"),
      event_end: new Date("2026-08-17T17:00:00Z"),
      sale_start: new Date("2026-05-01T00:00:00Z"),
      sale_end: new Date("2026-08-14T23:59:00Z"),
      ticket_type: [
        { name: "Early Bird", price: 3000 },
        { name: "Regular", price: 5000 }
      ],
      status: eventStatus.Scheduled,
      poster_url: "https://picsum.photos/200/300",
      age_restriction: 0
    },
    {
      id: randomUUIDv7(),
      name: "Stand-up Comedy Night",
      org_name: "Bangkok Comedy Club",
      description: "A night of laughs with top comedians.",
      category: "Comedy",
      location: "สุขุมวิท, Bangkok",
      event_start: new Date("2026-05-20T20:00:00Z"),
      event_end: new Date("2026-05-20T22:00:00Z"),
      sale_start: new Date("2026-03-15T00:00:00Z"),
      sale_end: new Date("2026-05-19T23:59:00Z"),
      ticket_type: [
        { name: "Standard", price: 800 }
      ],
      status: eventStatus.SoldOut,
      poster_url: "https://picsum.photos/200/300",
      age_restriction: 16
    },
    {
      id: randomUUIDv7(),
      name: "Art Exhibition: Modern Bangkok",
      org_name: "BACC",
      description: "Contemporary art exhibition by local artists.",
      category: "Art",
      location: "Bangkok Art & Culture Centre",
      event_start: new Date("2026-04-10T10:00:00Z"),
      event_end: new Date("2026-05-10T18:00:00Z"),
      sale_start: new Date("2026-03-20T00:00:00Z"),
      sale_end: new Date("2026-05-09T23:59:00Z"),
      ticket_type: [],
      status: eventStatus.Show,
      poster_url: "https://picsum.photos/200/300",
      age_restriction: 0
    },
    {
      id: randomUUIDv7(),
      name: "Startup Pitch Day",
      org_name: "Startup Thailand",
      description: "Pitch your startup to top investors.",
      category: "Business",
      location: "True Digital Park",
      event_start: new Date("2026-07-01T13:00:00Z"),
      event_end: new Date("2026-07-01T18:00:00Z"),
      sale_start: new Date("2026-05-10T00:00:00Z"),
      sale_end: new Date("2026-06-30T23:59:00Z"),
      ticket_type: [
        { name: "Attendee", price: 1500 }
      ],
      status: eventStatus.Draft,
      poster_url: "https://picsum.photos/200/300",
      age_restriction: 0
    }
  ];

  for (const eventData of events) {
    await prisma.event.upsert({
      where: { id: eventData.id },
      update: {},
      create: eventData,
    });
  }
}
