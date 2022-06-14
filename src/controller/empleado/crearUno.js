import pool from "@DB/connection"
//import passport from "passport"
import { encryptPassword, matchPassword} from "@Middleware/auth/bcrypt"

export default async (req, res) => {
    const { id_mecanico, cedula, nombre, apellido, 
        correo, contrasena, telefono, fecha_registro,
         id_sede, rol} = req.body
    let activo = 1
    let empleado = {
        cedula, 
        nombres: nombre,
        apellidos: apellido,
        correo,
        contrasena,
        telefono,
        fecha_registro,
        id_sede,
        id_rol: rol,
        activo
    }
    console.log(empleado)
    empleado.contrasena = await encryptPassword(contrasena)
    console.log(empleado)
    await pool.query('insert into empleados set ?', [empleado])
    if(rol == 0){
        let mecanico = {
            id: id_mecanico,
            cc_empleado: cedula,
            activo
        }
        console.log('Es un mecanico')
        console.log(mecanico)
        await pool.query('insert into mecanicos set ?', [mecanico])
    }
    delete empleado.contrasena
    console.log(empleado)
    res.status(200).json(empleado)
}