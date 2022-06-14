import { Router } from "express"
import controllers from "@Controller/ordenes"

const router = Router()

router.post('/', controllers.crearUno);

export default router;
