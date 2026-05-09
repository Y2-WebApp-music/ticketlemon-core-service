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
  price: t.Numeric(),
  qr_code: t.String(),
  status: t.Optional(t.Enum(ticketStatus)),
  is_used: t.Optional(t.Boolean())
});
export type TicketSchema = typeof TicketSchema.static;

export const TicketRequestBody = t.Object({
  event_id: t.String(),
  user_id: t.String(),
  type: t.String(),
  price: t.Numeric(),
  qr_code: t.Optional(t.String()),
  status: t.Optional(t.Enum(ticketStatus)),
});
export type TicketRequestBody = typeof TicketRequestBody.static;
