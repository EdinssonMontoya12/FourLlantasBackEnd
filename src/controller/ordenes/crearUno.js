import pool from "@DB/connection"

export default async function crearUno(req, res) {
  try {
    const { id_cliente, id_mecanico, id_sede, placa_vehiculo, servicios } = req.body;

    const orden = await pool.query(`
      insert into ordenes_pedido (id_cliente, id_mecanico, id_sede, placa_vehiculo)
      values (?, ?, ?, ?)
    `, [id_cliente, id_mecanico, id_sede, placa_vehiculo]
    );

    if (!Array.isArray(servicios) || servicios.length === 0) {
      return res.status(400).json({ message: 'No se ha agregado ningun servicio' });
    }

    const array = [];
    let valorTotal = 0;

    for (const servicioRaw of servicios) {
      const { id_servicio, cantidad } = servicioRaw;

      const result = await pool.query(`
          select * from servicios_sedes 
          where id_servicio = ?
          and id_sede = ?
        `, 
        [id_servicio, id_sede]
      );

      const ss = result[0];

      const servicio = await pool.query(`
        insert into ordenes_servicios (id_orden, id_ss, cantidad) 
        values (?, ?, ?)
      `, [orden.insertId, ss.id, cantidad]
      );

      let subtotal = servicio.valor_unit * cantidad;
      valorTotal += subtotal;
      servicio.subtotal = subtotal;
      array.push(servicio);
    }

    orden.servicios = array;
    orden.valor_total = valorTotal;
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
