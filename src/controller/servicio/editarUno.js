export default async (req, res) => {
  try {
    await pool.query('START TRANSACTION');
    const [rows] = await pool.query('select * from servicios where id = ?', [
      req.params.id
    ]);
  
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontró el servicio' });
    }
  
    const { nombre, precio, activo, sedes } = req.body;
  
    await pool.query(
      'update servicios set nombre = ?, direccion = ?, telefono = ?, activo = ? where id = ?',
      [nombre, precio, activo, req.params.id]
    ) 

    if(!Array.isArray(sedes)) {
      await pool.query('COMMIT');
      return res.sendStatus(200);
    }

    await pool.query('delete from servicios_sedes where id_servicio = ?', [req.params.id]); 

    for (const iterator of sedes) {
      await pool.query(
        'insert into servicios_sedes (id_servicio, id_sede) values (?, ?)', 
        [req.params.id, iterator]
      );
    }

    await pool.query('COMMIT');
    res.sendStatus(200);
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error(error);
    res.sendStatus(500);
  }
}
