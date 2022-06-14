import { Router } from "express";
import { mostrarTodo, mostrarUno, crearUno, desactivarUno } from "@Controller/empleado"

const router = Router()

router.get('/', mostrarTodo)
router.get('/:id', mostrarUno)
router.post('/', crearUno)
router.put('/:id', desactivarUno)
//router.put('/empleado/editar', editarUno)

export default router
