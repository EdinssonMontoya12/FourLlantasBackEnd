import pool from "@database/connection"

export default async (req, res) => {
  const [empleados] = await pool.query("select * from clientes")
  res.status(200).json(empleados)
}
