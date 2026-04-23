import { t } from "elysia";

export enum eventStatus {
  Scheduled = "Scheduled",
  OnSale = "OnSale",
  SoldOut = "SoldOut",
  Draft = "Draft",
  Show = "Show",
  EventEnd = "EventEnd",
  Cancel = "Cancel"
}

export const EventSchema = t.Object({
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
  status: t.Enum(eventStatus),
  poster_url: t.Any(),
  thumbnail_url: t.Optional(t.Any()),
  age_restriction: t.Numeric()
});
export type EventSchema = typeof EventSchema.static;

export type EventCreateInput = Omit<EventSchema, 'poster_url' | 'thumbnail_url'> & {
  poster_url: string;
  thumbnail_url?: string;
};