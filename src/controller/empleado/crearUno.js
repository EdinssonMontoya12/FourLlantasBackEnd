import pool from '@database/connection';
//import passport from "passport"
import { encryptPassword } from '@middleware/auth/bcrypt';

export default async (req, res) => {
  try {
    const { contrasena } = req.body;

    const empleado = {
      cedula: req.body.cedula,
      codigo: req.body.codigo,
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      correo: req.body.correo,
      telefono: req.body.telefono,
      id_sede: req.body.id_sede,
      id_rol: 0,
      activo: 1
    };

    let result = await pool.query('select cedula from empleados where cedula = ?', [
      empleado.cedula
    ]);

    if (result[0].length > 0) {
      return res.status(400).json({
        message: 'El empleado ya está registrado'
      });
    }

    result = await pool.query('select correo from empleados where correo = ?', [
      empleado.correo
    ]);

    if (result[0].length > 0) {
      return res.status(400).json({
        message: 'El correo ya está registrado.'
      });
    }

    result = await pool.query('select telefono from empleados where telefono = ?', [
      empleado.telefono
    ]);

    if (result[0].length > 0) {
      return res.status(400).json({
        message: 'El teléfono ya está registrado.'
      });
    }

    empleado.contrasena = await encryptPassword(contrasena);
    await pool.query('insert into empleados set ?', [empleado]);
    delete empleado.contrasena;

    res.status(200).json(empleado);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
