import { Request, Response } from 'express';
import { CategoriaService } from './categorias.service.js';

export const CategoriaController = {
  async getAll(req: Request, res: Response) {
    const categorias = await CategoriaService.getAll();

    res.json(categorias);
  },

  async getProdutosByCategoria(req: Request, res: Response) {
    const produtos = await CategoriaService.getProdutoByCategoria(Number(req.params.id));

    res.json(produtos);
  }
};