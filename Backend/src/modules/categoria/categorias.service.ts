import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const CategoriaService = {

    async getAll() {
        return await prisma.categoria.findMany();
    },
    
    async getProdutoByCategoria(idCategoria: number) {
        return await prisma.produto.findMany({
            where: { idCategoria },
            include: { categoria: true }
        });
    }
};