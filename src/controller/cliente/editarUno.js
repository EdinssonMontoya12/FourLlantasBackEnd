import pool from '@database/connection';
import { encryptPassword } from '@middleware/auth/bcrypt';

export default async (req, res) => {
  try {
    let { id } = req.params;
    let [rows] = await pool.query('select * from clientes where cedula = ?', [
      id
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontró el cliente' });
    }

    const result = await pool.query(
      'select * from clientes where correo = ? and cedula != ?',
      [req.body.correo, id]
    );

    if (result[0].length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const { cedula, contrasena, ...rest } = req.body;

    if (contrasena && contrasena.trim().length > 0) {
      rest.contrasena = await encryptPassword(contrasena);
    }

    await pool.query('update clientes set ? where cedula = ?', [rest, id]);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
