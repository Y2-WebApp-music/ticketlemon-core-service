import { t } from "elysia";

export const EventSchema = t.Object({
  id: t.String(),
  name: t.String(),
  org_name: t.String(),
  description: t.Optional(t.Any()),
  category: t.String(),
  location: t.String(),
  event_start: t.Date(),
  event_end: t.Date(),
  sale_start: t.Date(),
  sale_end: t.Date(),
  ticket_type: t.Optional(t.Array(t.Any())),
  status: t.String()
});

export type Event = typeof EventSchema.static;