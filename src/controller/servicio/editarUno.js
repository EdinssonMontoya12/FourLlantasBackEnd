import pool from "@database/connection";

export default async (req, res) => {
  try {
    await pool.query('START TRANSACTION');
    const [rows] = await pool.query('select * from servicios where id = ?', [
      req.params.id
    ]);
  
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontró el servicio' });
    }
  
    const { nombre, precio, activo } = req.body;
  
    await pool.query(
      'update servicios set nombre = ?, precio = ?, activo = ? where id = ?',
      [nombre, precio, activo, req.params.id]
    ) 

    await pool.query('COMMIT');
    res.sendStatus(200);
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error(error);
    res.sendStatus(500);
  }
}
