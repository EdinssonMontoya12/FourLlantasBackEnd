import { Router } from "express";
import {mostrarTodo, mostrarUno, crearUno, desactivarUno} from "@Controller/cliente"

const router = new Router()

router.get('/clientes', mostrarTodo)
router.get('/cliente/:id', mostrarUno)
router.post('/cliente', crearUno)
router.put('/clienteDes/:id', desactivarUno)
//router.put('/empleado/editar', editarUno)

export default router