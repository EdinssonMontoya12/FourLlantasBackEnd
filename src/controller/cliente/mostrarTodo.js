import pool from "@DB/connection"

export default async (req, res) => {
    const empleados = await pool.query("select * from clientes where es_flota = 0")
    res.status(200).json(empleados)
}