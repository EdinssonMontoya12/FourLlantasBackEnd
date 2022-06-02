import { Router } from "express";
import {mostrarTodo, mostrarUno} from "@Controller/empleado"

const router = new Router()

router.get('/empelados', mostrarTodo)
router.get('/empelado/:id', mostrarUno)
//router.get('/empelado/editar', editarUno)

export default router