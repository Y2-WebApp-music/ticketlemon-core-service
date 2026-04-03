import { Elysia } from "elysia";
import { eventController } from "./modules/event/event.controller";

const port = Number(process.env.PORT) || 8003;

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(eventController)
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
