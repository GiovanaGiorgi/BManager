import { z } from 'zod';

export const produtoValidator = z.object({
  nome: z.string().min(3),
  valor: z.coerce.number().positive(),
  custo: z.coerce.number().positive(),
  qntEstoque: z.coerce.number().int().nonnegative(),
  idCategoria: z.number().int().positive()
});


export type ProdutoInput = z.infer<typeof produtoValidator>;