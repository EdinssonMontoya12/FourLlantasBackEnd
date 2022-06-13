import pool from "@DB/connection"

export default async (req, res) => {
    let {id} = req.params
     let servicio =  await pool.query('select * from servicios where id = ?',[id])
    res.status(200).json(servicio)    
}