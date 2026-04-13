import { prisma } from "../../lib/db";
import { TicketSchema } from "./ticket.model";

export class TicketService {
  async create(data: TicketSchema) {
    return prisma.ticket.create({ data });
  }

  async getAll() {
    return prisma.ticket.findMany();
  }

  async update(id: string, data: Partial<TicketSchema>) {
    return prisma.ticket.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.ticket.delete({ where: { id } });
  }

  async getById(id: string) {
    return prisma.ticket.findUnique({ where: { id } });
  }
}