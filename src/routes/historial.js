import { Router } from "express";
import controllers from '@Controller/historial';

const router = Router();

router.get('/:cliente', controllers.mostrarTodo)

export default router;
