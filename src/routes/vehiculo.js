import { Router } from "express";
import {mostrarTodo, mostrarUno, crearUno} from "@Controller/vehiculo"

const router = new Router()

router.get('/', mostrarTodo)
router.get('/:placa', mostrarUno)
router.post('/', crearUno)
//router.put('/vehiculo/:id', editarUno)

export default router
