import { Router } from "express"

import empleado from "./empleado"
import cliente from "./cliente"
import auth from "./auth"
import servicio from "./servicio"
import ordenes from "./ordenes"
import productos from './productos';
import sedes from './sedes';

const router = Router();

router.use('/empleados', empleado);
router.use('/clientes', cliente);
router.use('/auth', auth);
router.use('/servicios', servicio);
router.use('/ordenes', ordenes);
router.use('/productos', productos);
router.use('/sedes', sedes);

export default router;
