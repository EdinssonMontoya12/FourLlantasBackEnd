import pool from "@DB/connection"

export default async (req, res) => {
    const empleados = await pool.query("select * from empleados")
    res.status(200).json(empleados)
}