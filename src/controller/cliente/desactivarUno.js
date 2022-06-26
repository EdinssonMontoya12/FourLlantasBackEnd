import pool from "@database/connection"

export default async (req, res) => {
  let { id } = req.params

  let [rows] = await pool.query('select * from clientes where cedula = ?', [id])

  if (rows.length === 0) {
    return res.status(404).json({ message: 'No se encontró el cliente' })
  }

  await pool.query('update clientes set activo = ? where id = ?', [0, id])
  res.status(200)
}
