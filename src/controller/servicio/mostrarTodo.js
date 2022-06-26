import pool from "@database/connection"

export default async (req, res) => {
  let [servicios] = await pool.query('select * from servicios')
  res.status(200).json(servicios)
}
