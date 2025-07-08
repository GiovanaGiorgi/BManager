import { Router } from 'express';
import { ProdutoController } from './produtos.controller.js';

const router = Router();

router.get('/', ProdutoController.getAll);
router.post('/', ProdutoController.create);
router.put('/:id', ProdutoController.update);
router.delete('/:id', ProdutoController.delete);

export const produtoRoutes = router;