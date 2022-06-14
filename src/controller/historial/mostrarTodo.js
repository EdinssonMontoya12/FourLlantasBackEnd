import pool from "@DB/connection"

 export default async function mostrarTodoHistorial(req, res) {
  try {
    let historial = [];
    const ordenes = await obtenerOrdenesPedidos(req.params.cliente);

    for (const orden of ordenes) {
      const servicios = await obtenerOrdenesServicios(orden.id);
      let total = 0;
      let array = [];

      servicios.forEach((servicio) => {
        const { id_servicio, nombre, valor_unit, cantidad } = servicio;

        let subtotal = valor_unit * cantidad;
        total += subtotal;

        array.push({
          id_servicio,
          nombre,
          valor_unit,
          cantidad,
          subtotal
        });
      });

      orden.servicios = array;
      orden.valor_total = total;
      historial.push(orden);
    }

    res.json(historial);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

function obtenerOrdenesPedidos(cliente){
  return pool.query(`select * from ordenes_pedido where id_cliente = ?`, [cliente]);
}

function obtenerOrdenesServicios(orden){
  return pool.query(`
    select * from ordenes_servicios as os
    inner join servicios_sedes ss on os.id_ss = ss.id
    inner join servicios s on s.id = ss.id_servicio
    where os.id_orden = ?
  `, [orden]);
}
