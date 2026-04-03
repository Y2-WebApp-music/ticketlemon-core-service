import { prisma } from "../../lib/db";
import { EventSchema } from "./event.model";

export class EventService {
  async create(data: EventSchema) {
    return prisma.event.create({ data });
  }

  async getAll() {
    return prisma.event.findMany();
  }

  async update(id: string, data: Partial<EventSchema>) {
    return prisma.event.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.event.delete({ where: { id } });
  }

  async findById(id: string) {
    return prisma.event.findUnique({ where: { id } });
  }
}