import pool from "@DB/connection"

export default async (req, res) => {
    let {placa} = req.params
    let vehiculo =  await pool.query('select * from vehiculos where placa = ?', [placa])
    res.status(200).json(vehiculo)    
}
