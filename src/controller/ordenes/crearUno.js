import pool from '@database/connection';

export async function crearUno(req, res) {
  try {
    const {
      cc_cliente,
      cod_mecanico,
      id_sede,
      vehiculo,
      servicios,
      productos
    } = req.body;
    await pool.query('START TRANSACTION');

    const [orden] = await pool.query(
      `
      insert into ordenes_pedido (cc_cliente, cod_mecanico, id_sede, vehiculo)
      values (?, ?, ?, ?)
    `,
      [cc_cliente, cod_mecanico, id_sede, vehiculo]
    );

    if (!Array.isArray(servicios) || servicios.length === 0) {
      return res
        .status(400)
        .json({ message: 'No se ha agregado ningun servicio' });
    }

    let total = 0;

    for (const s of servicios) {
      const { id, cantidad } = s;

      const [result] = await pool.query(
        `
          select ss.id, s.precio from servicios_sedes ss
          inner join servicios s on ss.id_servicio = s.id
          where ss.id_servicio = ?
          and ss.id_sede = ?
        `,
        [id, id_sede]
      );

      const ss = result[0];

      await pool.query(
        'insert into ordenes_servicios (id_orden, id_ss, cantidad, precio) values (?, ?, ?, ?)',
        [orden.insertId, ss.id, cantidad, ss.precio]
      );

      total += ss.precio * cantidad;
    }

    for (const p of productos) {
      const [row] = await pool.query(
        `
        select
          ps.id,
          p.precio,
          ps.cantidad
        from
          productos_sedes ps
          inner join productos p on ps.id_producto = p.id
        where
          ps.id_producto = ?
          and ps.id_sede = ?
        `,
        [p.id, id_sede]
      );

      if (row.length === 0) {
        return res
          .status(400)
          .json({ message: 'No se encontró el producto ' + p.id });
      }

      const productoSede = row[0];

      if (productoSede.cantidad < p.cantidad) {
        return res.status(400).json({
          message: `El producto ${p.id} no tiene existencias suficientes`
        });
      }

      await pool.query(
        'update productos_sedes set cantidad = cantidad - ? where id_producto = ? and id_sede = ?',
        [p.cantidad, productoSede.id, id_sede]
      );
      
      await pool.query(
        'insert into ordenes_productos (id_orden, id_producto, cantidad, precio) values (?, ?, ?, ?)',
        [orden.insertId, productoSede.id, p.cantidad, productoSede.precio]
      );

      total += productoSede.precio * p.cantidad;
    }

    await pool.query('update ordenes_pedido set precio = ? where id = ?', [
      total,
      orden.insertId
    ]);
    await pool.query('COMMIT');

    res.status(201).json({ message: 'Orden creada' });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ message: 'Error al crear la orden' });
  }
}
