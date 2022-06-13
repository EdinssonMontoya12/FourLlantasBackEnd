import pool from "@DB/connection"

export default async (req, res) => {
    let {id} =  req.body
    let flota = await pool.query('update clientes set activo = 0 where id = ?', [id])
    res.status(200).json(flota)    
}