import { Router } from 'express';
import * as controllers from '@controllers/cliente';

const router = new Router();

router.get('/', controllers.mostrarTodo);
router.get('/:id', controllers.mostrarUno);
router.post('/', controllers.crearUno);
router.delete('/:id', controllers.desactivarUno);
router.put('/:id', controllers.editarUno);

export default router;
