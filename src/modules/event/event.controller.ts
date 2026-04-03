import { Elysia } from "elysia";
import { EventService } from "./event.service";
import { EventSchema } from "./event.model";
import { HttpStatus } from "../../types/http";

const service = new EventService();

export const eventController = new Elysia({ prefix: "/event" })
  .post("/", async ({ body, status }) => {
    try {
      const event = await service.create(body);
      return status(HttpStatus.CREATED, {
        message: "Event created successfully",
        event
      });
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }, { body: EventSchema })

  .get("/", async ({ status }) => {
    try {
      const events = await service.getAll();
      return status(HttpStatus.OK, events);
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  .get("/:id", async ({ params: { id }, status }) => {
    try {
      const event = await service.findById(id);
      if (!event) {
        return status(
          HttpStatus.NOT_FOUND,
          { message: "Event not found" }
        );
      }
      return status(HttpStatus.OK, event);
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  .put("/:id", async ({ params: { id }, body, status }) => {
    try {
      const event = await service.findById(id);
      if (!event) {
        return status(
          HttpStatus.NOT_FOUND,
          { message: "Event not found" }
        );
      }

      const updatedEvent = await service.update(id, body);
      return status(HttpStatus.OK, {
        message: "Event updated successfully",
        event: updatedEvent
      });
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }, { body: EventSchema })

  .delete("/:id", async ({ params: { id }, status }) => {
    try {
      const event = await service.findById(id);
      if (!event) {
        return status(
          HttpStatus.NOT_FOUND,
          { message: "Event not found" }
        );
      }

      await service.delete(id);
      return status(HttpStatus.OK, { message: "Event deleted successfully" });
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })