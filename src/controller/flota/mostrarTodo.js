import pool from "@DB/connection"

export default async (req, res) => {
    let flota =  await pool.query('select * from clientes where es_flota = 1')
    res.status(200).json(flota)    
}