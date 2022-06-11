import pool from "@DB/connection"

export default async (req, res) => {
    let {nombres, apellidos, correo, contrasena, 
        telefono, fecha_registro, id_sede, 
        cedula} = req.body
    let activo = 1
    let empleado = {
        nombres, 
        apellidos, 
        correo, 
        contrasena, 
        telefono, 
        fecha_registro,
        activo, 
        id_sede, 
        cedula
    }
    await pool.query('insert into empelados set ?', [empleado])
    res.status(200)
}