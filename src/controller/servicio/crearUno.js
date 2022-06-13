import pool from "@DB/connection"

export default async (req, res) => {
    let {nombre, valor} = req.body
    let servicio = {
        nombre,
        valor_unit: valor
    }
    await pool.query('insert into servicios set ?', [servicio])
    res.status(200).json(flota)    
}