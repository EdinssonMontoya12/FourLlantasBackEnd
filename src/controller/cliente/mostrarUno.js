import pool from "@DB/connection"

export default async (req, res) => {
    const {id} = req.params
    const empleado = await pool.query('select * from clientes where cedula=?', [id])
    res.status(200).json(empleado)
}