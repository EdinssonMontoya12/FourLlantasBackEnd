import pool from '@database/connection';

export async function mostrarTodo(req, res) {
  try {
    const [rows] = await pool.query('select * from sedes');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function mostrarUno(req, res) {
  try {
    const [rows] = await pool.query(
      `
        select *
        from sedes
        where id = ?
      `,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontró la sede' });
    }

    const sede = {
      id: rows[0].id,
      nombre: rows[0].nombre,
      direccion: rows[0].direccion,
      telefono: rows[0].telefono,
      activo: rows[0].activo
    };

    res.status(200).json(sede);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function crearUno(req, res) {
  try {
    await pool.query('insert into sedes set ?', req.body);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function editarUno(req, res) {
  try {
    await pool.query('START TRANSACTION');
    const [rows] = await pool.query('select * from sedes where id = ?', [
      req.params.id
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontró la sede' });
    }

    const { 
      nombre,
      direccion, 
      telefono, 
      activo,
      servicios, 
      productos 
    } = req.body;

    await pool.query(
      'update sedes set nombre = ?, direccion = ?, telefono = ?, activo = ? where id = ?',
      [nombre, direccion, telefono, activo, req.params.id]
    );

    if (!Array.isArray(servicios)) {
      await pool.query('COMMIT');
      return res.sendStatus(200);
    }

    await pool.query('delete from servicios_sedes where id_sede = ?', [
      req.params.id
    ]);

    for (const iterator of servicios) {
      await pool.query(
        'insert into servicios_sedes (id_sede, id_servicio) values (?, ?)',
        [req.params.id, iterator.id]
      );
    }

    if (!Array.isArray(productos)) {
      await pool.query('COMMIT');
      return res.sendStatus(200);
    }

    await pool.query('delete from productos_sedes where id_sede = ?', [
      req.params.id
    ]);

    for (const iterator of productos) {
      await pool.query(
        'insert into productos_sedes (id_sede, id_producto, cantidad) values (?, ?, ?)',
        [req.params.id, iterator.id, iterator.cantidad]
      );
    }

    await pool.query('COMMIT');
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    await pool.query('ROLLBACK');
    res.sendStatus(500);
  }
}

export async function desactivarUno(req, res) {
  let { id } = req.params;

  let [rows] = await pool.query('select * from sedes where id = ?', [id]);

  if (rows.length === 0) {
    return res.status(404).json({ message: 'No se encontró la sede' });
  }

  await pool.query('update sede set activo = ? where id = ?', [0, id]);
  res.status(200);
}
