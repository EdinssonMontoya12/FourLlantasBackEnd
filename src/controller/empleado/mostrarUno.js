import pool from '@database/connection';

export default async (req, res) => {
  try {
    const { id } = req.params;
    const [empleado] = await pool.query(`
      select
        e.cedula,
        e.codigo,
        e.nombres,
        e.apellidos,
        e.correo,
        e.telefono,
        e.activo,
        s.id as id_sede,
        s.nombre as sede,
        r.id as id_rol,
        r.nombre as rol
      from
        empleados e
        inner join sedes s on e.id_sede = s.id
        inner join roles r on e.id_rol = r.id
      where e.cedula = ?
      `,
      [id]
    );

    if (empleado.length === 0) {
      return res.status(404).json({ message: 'No se encontró el empleado' });
    }

    delete empleado[0].contrasena;
    res.status(200).json(empleado[0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
