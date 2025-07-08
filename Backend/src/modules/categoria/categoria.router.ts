import { Router } from 'express';
import { CategoriaController } from './categorias.controller.js';

const router = Router();

router.get('/', CategoriaController.getAll);
router.get('/:id/produtos', CategoriaController.getProdutosByCategoria);


export const categoriaRoutes = router;