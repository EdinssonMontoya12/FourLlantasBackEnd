import pool from '@database/connection';

export default async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      select
        sv.*
      from
        servicios sv
        inner join servicios_sedes ss on sv.id = ss.id_servicio
    `,
      [req.params.id]
    );

    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
