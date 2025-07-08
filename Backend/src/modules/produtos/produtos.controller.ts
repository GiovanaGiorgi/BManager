import { Request, Response } from "express";
import { ProdutoService } from "./produtos.service.js";
import { produtoValidator } from "./produtos.validator.js";

export const ProdutoController = {
  async getAll(req: Request, res: Response) {
    const produtos = await ProdutoService.getAll();

    res.json(produtos);
  },

  async create(req: Request, res: Response) {
    const dados = produtoValidator.parse(req.body);
    const produtoExistente = await ProdutoService.duplicateValidation(dados);
    if (produtoExistente) {
      return res.status(400).json({ error: "Produto idêntico já existe" });
    }
    const produto = await ProdutoService.create(dados);

    res.status(201).json(produto);
  },

  async update(req: Request, res: Response) {
    const dados = produtoValidator.partial().parse(req.body);
    const produto = await ProdutoService.update(Number(req.params.id), dados);

    res.json(produto);
  },

  async delete(req: Request, res: Response) {
    await ProdutoService.delete(Number(req.params.id));

    res.status(204).send();
  },
};
