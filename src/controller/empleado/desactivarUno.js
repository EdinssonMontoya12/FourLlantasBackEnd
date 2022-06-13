import pool from "@DB/connection"

export default async (req, res) => {
    let {id} = req.params
    await pool.query('update empleados set activo = ? where id = ?', [0, id])
    res.status(200)
}