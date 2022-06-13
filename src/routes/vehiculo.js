import { Router } from "express";
import {mostrarTodo, mostrarUno, crearUno} from "@Controller/vehiculo"

const router = new Router()

router.get('/vehiculos', mostrarTodo)
router.get('/vehiculo/:placa', mostrarUno)
router.post('/vehiculo', crearUno)
//router.put('/vehiculo/:id', editarUno)

export default router