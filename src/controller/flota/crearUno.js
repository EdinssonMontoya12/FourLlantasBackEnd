import pool from "@DB/connection"

export default async (req, res) => {
    let {id, nombre, telefono, correo, es_flota} = req.body
    let activo = 1
    let flota = {
        id,
        nombres: nombre,
        telefono,
        correo,
        es_flota,
        activo
    }
    await pool.query('insert into clientes set ?', [flota])
    res.status(200).json(flota)
}