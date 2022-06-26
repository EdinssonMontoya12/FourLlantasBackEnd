import { Router } from "express"
import * as controllers from "@controllers/ordenes"

const router = Router()

router.post('/', controllers.crearUno);
router.get('/:cliente', controllers.mostrarTodoPorCliente)

export default router;
