import pool from '@database/connection';
import { encryptPassword } from '@middleware/auth/bcrypt';

export default async (req, res) => {
  let { id } = req.params;

  let [rows] = await pool.query('select * from empleados where cedula = ?', [
    id
  ]);

  if (rows.length === 0) {
    return res.status(404).json({ message: 'No se encontró el empleado' });
  }

  const result = await pool.query(
    'select * from empleados where correo = ? and cedula != ?',
    [req.body.correo, id]
  );

  if (result[0].length > 0) {
    return res.status(400).json({ message: 'El correo ya está registrado' });
  }

  const empleado = {
    codigo: req.body.codigo,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    telefono: req.body.telefono,
    id_sede: req.body.id_sede,
    id_rol: req.body.id_rol,
    activo: req.body.activo
  };

  const { contrasena } = req.body;

  if (contrasena && contrasena.trim().length > 0) {
    empleado.contrasena = await encryptPassword(contrasena);
  }

  await pool.query('update empleados set ? where cedula = ?', [empleado, id]);
  res.sendStatus(200);
};
