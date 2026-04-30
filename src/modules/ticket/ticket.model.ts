import { t } from "elysia";

export enum ticketStatus {
  Pending = "Pending",
  Purchased = "Purchased",
  Cancelled = "Cancelled"
}

export const TicketSchema = t.Object({
  event_id: t.String(),
  user_id: t.String(),
  type: t.String(),
  price: t.Number(),
  qr_code: t.String(),
  status: t.Enum(ticketStatus),
});
export type TicketSchema = typeof TicketSchema.static;