import pool from '@database/connection';

export default async (req, res) => {
  try {
    await pool.query('update sedes set activo = 0 where id = ?', [req.params.id]);
    res.sendStatus(200);
  } catch (error) {
    console.error(error)
    res.sendStatus(500);
  }
}
