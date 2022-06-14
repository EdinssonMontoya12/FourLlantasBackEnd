import pool from "@DB/connection"

export default function mostrarTodoHistorial(req, res) {
  pool.query(`
    select * from ordenes_servicios as os
    inner join ordenes_pedido as op on os.id_orden = op.id
    inner join servicios_sedes as ss on os.id_ss = ss.id
    inner join servicios as s on ss.id_servicio = s.id
    where op.id_cliente = ?
  `, [req.params.cliente], (err, result, fields) => {

    if (err !== null) {
      console.error(err);
      res.sendStatus(500);
    }

    if (result.length === 0) {
      return res.json([]);
    }

    const { id_orden, fecha_registro, id_cliente, id_mecanico, id_sede, placa_vehiculo } = result[0];
    let valor_total = 0;
    let servicios = [];

    result.forEach((element) => {
      const { id_servicio, nombre, valor_unit, cantidad } = element;

      let subtotal = valor_unit * cantidad;
      valor_total += subtotal;

      servicios.push({
        id_servicio,
        nombre,
        valor_unit,
        cantidad,
        subtotal
      })
    });

    let historial = {
      id_orden,
      fecha_registro,
      id_cliente,
      id_mecanico,
      placa_vehiculo,
      id_sede,
      valor_total
    };

    res.json(historial)
  });
}
