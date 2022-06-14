import { Router } from "express";
import {mostrarTodo, mostrarUno, crearUno} from "@Controller/servicio"

const router = new Router()

router.get('/', mostrarTodo)
router.get('/:id', mostrarUno)
router.post('/', crearUno)
//router.put('/:id', editarUno)

export default router
