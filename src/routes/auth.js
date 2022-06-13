import { Router } from "express";
import ingresar from "@Controller/auth/ingresar"

const router = new Router()

//variable tipo 1 si es cliente y 0 si e administrador
router.post('/ingresar', ingresar)

export default router