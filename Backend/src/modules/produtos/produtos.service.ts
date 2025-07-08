import { PrismaClient } from "@prisma/client";
import { ProdutoInput } from "./produtos.validator.js";

const prisma = new PrismaClient();

export const ProdutoService = {
  async getAll() {
    return await prisma.produto.findMany({
      include: { categoria: true },
    });
  },

  async create(data: ProdutoInput) {
    const categoria = await prisma.categoria.findUnique({
      where: { id: data.idCategoria },
    });
    if (!categoria) throw new Error("Categoria não existe");

    return await prisma.produto.create({ data });
  },

  async update(id: number, data: Partial<ProdutoInput>) {
    return await prisma.produto.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    const produto = await prisma.produto.findUnique({
      where: { id },
    });
    if (!produto) throw new Error("Produto não encontrado");

    return await prisma.produto.delete({ where: { id } });
  },
  async duplicateValidation(data: {
    nome: string;
    custo: number;
    valor: number;
    qntEstoque: number;
    idCategoria: number;
  }) {
    return await prisma.produto.findFirst({
      where: {
        nome: data.nome,
        custo: data.custo,
        valor: data.valor,
        qntEstoque: data.qntEstoque,
        idCategoria: data.idCategoria,
      },
    });
  },
};
