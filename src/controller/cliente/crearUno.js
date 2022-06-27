import pool from '@database/connection';
import { encryptPassword } from '@middleware/auth/bcrypt';

export default async (req, res) => {
  try {
    const cliente = {
      cedula: req.body.cedula,
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      correo: req.body.correo,
      telefono: req.body.telefono,
      activo: 1
    };

    let result = await pool.query('select cedula from clientes where cedula = ?', [
      cliente.cedula
    ]);

    if (result[0].length > 0) {
      return res.status(400).json({
        message: 'El cliente ya está registrado'
      });
    }

    result = await pool.query('select correo from clientes where correo = ?', [
      cliente.correo
    ]);

    if (result[0].length > 0) {
      return res.status(400).json({
        message: 'El correo ya está registrado.'
      });
    }

    result = await pool.query('select telefono from clientes where telefono = ?', [
      cliente.telefono
    ]);

    if (result[0].length > 0) {
      return res.status(400).json({
        message: 'El teléfono ya está registrado.'
      });
    }

    cliente.contrasena = await encryptPassword(req.body.contrasena);
    await pool.query('insert into clientes set ?', [cliente]);
    delete cliente.contrasena;

    res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
