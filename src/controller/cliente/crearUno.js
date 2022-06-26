import pool from '@database/connection';
import { encryptPassword, matchPassword } from '@middleware/auth/bcrypt';

export default async (req, res) => {
  const cliente = {
    ...req.body,
    activo: 1
  };

  cliente.contrasena = await encryptPassword(contrasena);
  await pool.query('insert into clientes set ?', [cliente]);
  delete cliente.contrasena;
  res.status(200).json(cliente);
};
