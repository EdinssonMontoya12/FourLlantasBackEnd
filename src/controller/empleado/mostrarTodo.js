import pool from "@database/connection"

export default async (req, res) => {
  const [empleados] = await pool.query("select * from empleados where id_rol = 0")
  res.status(200).json(empleados)
}
