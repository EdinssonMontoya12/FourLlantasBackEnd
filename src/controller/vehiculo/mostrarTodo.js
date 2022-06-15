import pool from "@DB/connection"

export default async (req, res) => {
    let vehiculos =  await pool.query('select * from vehiculos')
    res.status(200).json(vehiculos)    
}
