import pool from "@DB/connection"

export default async (req, res) => {
    let vehiculo =  await pool.query('select * from vehiculo')
    res.status(200).json(vehiculo)    
}