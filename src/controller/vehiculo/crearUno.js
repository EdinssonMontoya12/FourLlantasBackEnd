import pool from "@DB/connection"

export default async (req, res) => {
    let {placa, modelo, id_tipo, id_cliente, fecha_registro} = req.body

    let vehiculo =  {
        placa,
        modelo,
        id_tipo,
        id_cliente,
        fecha_registro
    }
    
    await pool.query('insert into vehiculos set ?', [vehiculo])
    res.status(200).json(vehiculo)    
}
