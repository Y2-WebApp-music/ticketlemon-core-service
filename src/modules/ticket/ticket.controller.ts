import { Elysia } from "elysia";
import { TicketService } from "./ticket.service";
import { TicketSchema } from "./ticket.model";
import { HttpStatus } from "../../types/http";

const service = new TicketService();

export const ticketController = new Elysia({ prefix: "/ticket" })
  .post("/", async ({ body, status }) => {
    try {
      const ticket = await service.create(body);
      return status(HttpStatus.CREATED, {
        message: "Ticket created successfully",
        ticket
      });
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }, { body: TicketSchema })

  .get("/", async ({ status }) => {
    try {
      const tickets = await service.getAll();
      return status(HttpStatus.OK, tickets);
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  .get("/:id", async ({ params: { id }, status }) => {
    try {
      const ticket = await service.getById(id);
      if (!ticket) {
        return status(
          HttpStatus.NOT_FOUND,
          { message: "Ticket not found" }
        );
      }
      return status(HttpStatus.OK, ticket);
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  .put("/:id", async ({ params: { id }, body, status }) => {
    try {
      const ticket = await service.getById(id);
      if (!ticket) {
        return status(
          HttpStatus.NOT_FOUND,
          { message: "Ticket not found" }
        );
      }

      const updatedTicket = await service.update(id, body);
      return status(HttpStatus.OK, {
        message: "Ticket updated successfully",
        ticket: updatedTicket
      });
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }, { body: TicketSchema })

  .delete("/:id", async ({ params: { id }, status }) => {
    try {
      const ticket = await service.getById(id);
      if (!ticket) {
        return status(
          HttpStatus.NOT_FOUND,
          { message: "Ticket not found" }
        );
      }

      await service.delete(id);
      return status(HttpStatus.OK, {
        message: "Ticket deleted successfully"
      });
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })
