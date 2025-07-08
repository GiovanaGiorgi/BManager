import { PrismaClient } from "@prisma/client";
import { ClienteInput } from "./clientes.validator.js";

const prisma = new PrismaClient();

export const ClienteService = {
  async getAll() {
    return await prisma.cliente.findMany();
  },

  async create(data: ClienteInput) {
    return await prisma.cliente.create({ data });
  },

  async update(id: number, data: Partial<ClienteInput>) {
    return await prisma.cliente.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    const cliente = await prisma.cliente.findUnique({ where: { id } });
    if (!cliente) throw new Error("Cliente não encontrado");

    return await prisma.cliente.delete({ where: { id } });
  },

  async duplicateValidation(data: { nome: string; endereco: string }) {
    return await prisma.cliente.findFirst({
      where: { nome: data.nome, endereco: data.endereco },
    });
  },
};
