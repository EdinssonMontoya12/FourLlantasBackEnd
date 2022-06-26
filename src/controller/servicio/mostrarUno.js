import pool from '@database/connection';

export default async (req, res) => {
  let { id } = req.params;
  let [rows] = await pool.query(
    `
    select
      sv.*,
      sd.id as id_sede,
      sd.nombre as sede
    from
      servicios_sedes ss
      inner join servicios sv on sv.id = ss.id_servicio
      inner join sedes sd on sd.id = ss.id_sede
    where
      sv.id = ?
    `,
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: 'No se encontró el servicio' });
  }

  const sedes = rows.map((row) => ({
    sede: row.sede,
    id: row.id_sede
  }));

  const servicio = {
    id: rows[0].id,
    nombre: rows[0].nombre,
    precio: rows[0].precio,
    activo: rows[0].activo,
    sedes
  };

  res.status(200).json(servicio);
};
