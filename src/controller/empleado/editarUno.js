import pool from "@database/connection"

export default async (req, res) => {
  let { codigo } = req.params;

  let [rows] = await pool.query('select * from empleados where codigo = ?', [codigo]);

  if (rows.length === 0) {
    return res.status(404).json({ message: 'No se encontró el empleado' });
  }

  //Quitar de la actualización los campos que no se deben actualizar
  const { cedula, fecha_registro, ...rest } = req.body;

  await pool.query('update empleados set ? where codigo = ?', [rest, codigo]);
}
