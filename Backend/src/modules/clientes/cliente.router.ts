import { Router } from 'express';
import { ClienteController } from './clientes.controller.js';

const router = Router();

router.get('/', ClienteController.getAll);
router.post('/', ClienteController.create);
router.put('/:id', ClienteController.update);
router.delete('/:id', ClienteController.delete);

export const clienteRoutes = router;
