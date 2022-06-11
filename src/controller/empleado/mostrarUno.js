import pool from "@DB/connection"

export default async (req, res) => {
    const {id} = req.params
    const empleado = await pool.query('select * from empleados where id=?', [id])
    res.status(200).json(empleado)
}