import pool from '@database/connection';

export default async (req, res) => {
  try {
    let { nombre, precio } = req.body;
    let servicio = {
      nombre,
      precio
    };
    await pool.query('insert into servicios set ?', [servicio]);
    res.status(200).json(servicio);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
