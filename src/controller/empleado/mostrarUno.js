import pool from "@database/connection"

export default async (req, res) => {
  const { id } = req.params
  const [empleado] = await pool.query('select * from empleados where cedula=?', [id])

  if(empleado.length === 0) {
    return res.status(404).json({ message: 'No se encontró el empleado' })
  }

  res.status(200).json(empleado[0])
}
