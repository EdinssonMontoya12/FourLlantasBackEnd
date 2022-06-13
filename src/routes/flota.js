import { Router } from "express";
import {mostrarTodo, mostrarUno, crearUno, desactivarUno} from "@Controller/flota"

const router = new Router()

router.get('/flotas', mostrarTodo)
router.get('/flota/:id', mostrarUno)
router.post('/flota', crearUno)
router.put('/flotaDes/:id', desactivarUno)
//router.put('/empleado/editar', editarUno)

export default router