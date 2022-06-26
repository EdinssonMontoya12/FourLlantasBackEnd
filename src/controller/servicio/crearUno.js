import pool from "@database/connection"

export default async (req, res) => {
  let { nombre, valor } = req.body
  let servicio = {
    nombre,
    precio: valor
  }
  await pool.query('insert into servicios set ?', [servicio])
  res.status(200).json(servicio)
}
