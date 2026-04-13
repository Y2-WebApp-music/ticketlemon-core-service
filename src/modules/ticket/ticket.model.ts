import { t } from "elysia";

export const TicketSchema = t.Object({
  event_id: t.String(),
  user_id: t.String(),
  type: t.String(),
  price: t.Number(),
  qr_code: t.String(),
});
export type TicketSchema = typeof TicketSchema.static;