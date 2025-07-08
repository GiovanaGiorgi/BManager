import { z } from 'zod';

export const clienteValidator = z.object({
  nome: z.string(),
  endereco: z.string()
});

export type ClienteInput = z.infer<typeof clienteValidator>;
