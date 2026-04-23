import { Elysia, t } from "elysia";
import { EventService } from "./event.service";
import { EventSchema } from "./event.model";
import { HttpStatus } from "../../types/http";
import { uploadFile, deleteFile } from "../../utils/fileManager";

const service = new EventService();

export const eventController = new Elysia({ prefix: "/event" })
  .post("/", async ({ body, status }) => {
    try {
      const { poster_url: posterFile, thumbnail_url: thumbnailFile, ...rest } = body;
      let poster_url = "";
      let thumbnail_url = "";
      if (posterFile) poster_url = await uploadFile(posterFile);
      if (thumbnailFile) thumbnail_url = await uploadFile(thumbnailFile);

      const payload = {
        ...rest,
        poster_url,
        thumbnail_url,
      };

      const event = await service.create(payload);

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
      const event = await service.getById(id);
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
      const event = await service.getById(id);
      if (!event) {
        return status(
          HttpStatus.NOT_FOUND,
          { message: "Event not found" }
        );
      }

      const { poster_url: posterFile, thumbnail_url: thumbnailFile, ...rest } = body;
      let poster_url: string | undefined;
      let thumbnail_url: string | undefined;
      if (posterFile) {
        if (event.poster_url) await deleteFile(event.poster_url);
        poster_url = await uploadFile(posterFile);
      }
      if (thumbnailFile) {
        if (event.thumbnail_url) await deleteFile(event.thumbnail_url);
        thumbnail_url = await uploadFile(thumbnailFile);
      }

      const payload = {
        ...rest,
        ...(poster_url !== undefined && { poster_url }),
        ...(thumbnail_url !== undefined && { thumbnail_url }),
      };

      const updatedEvent = await service.update(id, payload);
      return status(HttpStatus.OK, {
        message: "Event updated successfully",
        event: updatedEvent
      });
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }, { body: t.Partial(EventSchema) })

  .delete("/:id", async ({ params: { id }, status }) => {
    try {
      const event = await service.getById(id);
      if (!event) {
        return status(
          HttpStatus.NOT_FOUND,
          { message: "Event not found" }
        );
      }

      if (event.poster_url) await deleteFile(event.poster_url);
      if (event.thumbnail_url) await deleteFile(event.thumbnail_url);
      await service.delete(id);
      return status(HttpStatus.OK, { message: "Event deleted successfully" });
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })