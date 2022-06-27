import pool from '@database/connection';

export default async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      'select cedula, nombres, apellidos, telefono, correo from clientes where cedula = ? ',
      [id]
    );

    if (rows.length === 0) {
      return res.sendStatus(404);
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
