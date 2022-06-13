import { Router } from "express";
import {mostrarTodo, mostrarUno, crearUno, desactivarUno} from "@Controller/empleado"

const router = new Router()

router.get('/empleados', mostrarTodo)
router.get('/empleado/:id', mostrarUno)
router.post('/empleado', crearUno)
router.put('/empleadoDes/:id', desactivarUno)
//router.put('/empleado/editar', editarUno)

export default router