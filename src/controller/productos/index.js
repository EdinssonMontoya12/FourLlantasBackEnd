import pool from '@database/connection';

export async function mostrarTodo(req, res) {
  try {
    const [rows] = await pool.query('select * from productos');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
}

export async function mostrarUno(req, res) {
  try {
    const [rows] = await pool.query('select * from productos where id = ?', [
      req.params.id
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontró el producto' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
}

export async function crearUno(req, res) {
  try {
    const producto = req.body;
    pool.query('insert into productos set ?', [producto]);
    res.status(201).json({ message: 'Producto creado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
}

export async function editarUno(req, res) {
  try {
    const { precio, cantidad, activo } = req.body;

    const [rows] = await pool.query('select * from productos where id = ?', [
      req.params.id
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontró el producto' });
    }

    await pool.query(
      'update productos set precio = ?, cantidad = ?, activo = ? where id = ?',
      [precio, cantidad, activo, req.params.id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al editar el producto' });
  }
}

export async function desactivarUno(req, res) {
  pool.query('update productos set activo = 0 where id = ?', [req.params.id]);
  res.sendStatus(200);
}
