import { Router } from "express"

import empleado from "./empleado"
import cliente from "./cliente"
import auth from "./auth"
import flota from "./flota"
import servicio from "./servicio"
import vehiculo from "./vehiculo"
import historial from "./historial"
import ordenes from "./ordenes"

const router = Router();

router.use('/empleados', empleado);
router.use('/clientes', cliente);
router.use('/auth', auth);
router.use('/flotas', flota);
router.use('/servicios', servicio);
router.use('/vehiculos', vehiculo);
router.use('/historial', historial);
router.use('/ordenes', ordenes);

export default router;
