import pool from "@database/connection"

export async function mostrarTodoPorCliente(req, res) {
  try {
    const ordenes = await obtenerOrdenes(req.params.cliente);

    for (const orden of ordenes) {
      orden.mecanico = await obtenerMecanico(orden.cod_mecanico);
      orden.servicios = await obtenerServicios(orden.id);
      orden.productos = await obtenerProductos(orden.id);
    }

    res.json(ordenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Error al obtener el historial'});
  }
}

async function obtenerOrdenes(cliente) {
  const [rows] = await pool.query(`select * from ordenes_pedido where cc_cliente = ?`, [cliente]);
  return rows;
}

async function obtenerServicios(idOrden) {
  const [rows] = await pool.query(`
    select
      s.id,
      s.nombre,
      os.cantidad,
      os.precio
    from
      ordenes_servicios as os
      inner join servicios_sedes ss on os.id_ss = ss.id
      inner join servicios s on s.id = ss.id_servicio
    where
      os.id_orden = ?
  `, [idOrden]);

  return rows;
}

async function obtenerMecanico(codigo) {
  const [rows] = await pool.query(`
    select
      e.codigo,
      e.nombres,
      e.apellidos
    from
      empleados e
    where e.id_rol = 0
      and e.codigo = ?
  `, [codigo]);

  return rows[0];
}


async function obtenerProductos(idOrden) {
  const [rows] = await pool.query(`
    select
      p.id,
      p.nombre,
      op.cantidad,
      op.precio
    from
      ordenes_productos op
      inner join productos p on op.id_producto = p.id
    where
      op.id_orden = ?
  `, [idOrden]);

  return rows;
}
