import pool from "@database/connection"
import { matchPassword } from "@middleware/auth/bcrypt"

async function ingresarCliente(req, res) {
  let { correo, contrasena } = req.body

  let [cliente] = await pool.query('select * from clientes where correo = ?', [correo])

  if (cliente.length > 0) {
    let valido = await matchPassword(contrasena, cliente[0].contrasena)
    if (valido) {
      delete cliente[0].contrasena
      res.json(cliente[0])
    } else {
      res.json('Contraseña incorrecta')
    }
  } else {
    res.json('El usuario no existe')
  }
}

async function ingresarEmpleado(req, res) {
  let { correo, contrasena, rol } = req.body

  let [empleado] = await pool.query('select * from empleados where correo = ?', [correo])
  
  if (empleado.length > 0) {
    let valido = await matchPassword(contrasena, empleado[0].contrasena)
    if (valido) {
      delete empleado[0].contrasena
      res.json(empleado[0])
    } else {
      res.json('Contraseña incorrecta')
    }
  } else {
    res.json('El usuario no existe')
  }
}

export default async (req, res) => {
  let { tipo } = req.body

  if (tipo == 1) {
    ingresarCliente(req, res)
  } else {
    ingresarEmpleado(req, res)
  }
}
