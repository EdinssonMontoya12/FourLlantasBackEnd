import pool from '@database/connection';

export async function mostrarTodo (req, res) {
  try {
    const [rows] = await pool.query('select * from ordenes_pedido');
    return res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el historial' });
  }
};
