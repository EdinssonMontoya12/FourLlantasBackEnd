import pool from "@DB/connection"
import { encryptPassword, matchPassword} from "@Middleware/auth/bcrypt"

export default async (req, res) => {
    const { cedula, nombre, apellido, telefono, 
        correo, contrasena, es_flota} = req.body
    let activo = 1
    let cliente = {
        id: cedula,
        nombres: nombre,
        apellidos: apellido,
        telefono, 
        correo,
        contrasena,
        es_flota,
        activo
    }
    cliente.contrasena = await encryptPassword(contrasena)
    await pool.query('insert into clientes set ?', [cliente])
    delete cliente.contrasena
    res.status(200).json(cliente)
}