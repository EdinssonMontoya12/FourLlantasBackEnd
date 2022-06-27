import { Router } from "express"
import * as controllers from "@controllers/ordenes"

const router = Router()

router.get('/', controllers.mostrarTodo)
router.get('/:cliente', controllers.mostrarTodoPorCliente)
router.post('/', controllers.crearUno);

export default router;
