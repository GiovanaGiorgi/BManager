import { Request, Response } from 'express';
import { ClienteService } from './clientes.service.js';
import { clienteValidator } from './clientes.validator.js';

export const ClienteController = {
  async getAll(req: Request, res: Response) {
    const clientes = await ClienteService.getAll();

    res.json(clientes);
  },

  async create(req: Request, res: Response) {
    const dados = clienteValidator.parse(req.body);
    const clienteExistente = await ClienteService.duplicateValidation(dados);
    if (clienteExistente) {
      return res.status(400).json({ error: 'Cliente idêntico já existe' });
    }
    const cliente = await ClienteService.create(dados);

    res.status(201).json(cliente);
  },

  async update(req: Request, res: Response) {
    const dados = clienteValidator.partial().parse(req.body);
    const cliente = await ClienteService.update(Number(req.params.id), dados);

    res.json(cliente);
  },

  async delete(req: Request, res: Response) {
    await ClienteService.delete(Number(req.params.id));

    res.status(204).send();
  },
};
