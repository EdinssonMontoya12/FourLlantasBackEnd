import { Router } from "express";
import * as controllers from "@controllers/empleado"

const router = Router()

router.get('/', controllers.mostrarTodo)
router.get('/:id', controllers.mostrarUno)
router.post('/', controllers.crearUno)
router.put('/:id', controllers.editarUno)
router.delete('/:id', controllers.desactivarUno)

export default router
