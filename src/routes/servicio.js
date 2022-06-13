import { Router } from "express";
import {mostrarTodo, mostrarUno, crearUno} from "@Controller/servicio"

const router = new Router()

router.get('/servicios', mostrarTodo)
router.get('/servicio/:id', mostrarUno)
router.post('/servicio', crearUno)
//router.put('/servicio/:id', editarUno)

export default router