import pool from "@DB/connection"

export default async (req, res) => {
    let {id} =  req.params
    let flota = await pool.query('select * from clientes where id = ?', [id])
    res.status(200).json(flota)    
}