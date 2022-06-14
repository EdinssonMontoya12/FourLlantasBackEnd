import config from "./config"
import mysql from "mysql"
import { promisify } from "util"

const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
})

pool.getConnection((err, connection) => {
    if(err){
        if(err.code == 'PROTOCOL_CONNECTION_LOST'){
            console.error('Se ha perdido la conexión con la base de datos')
        }
        if(error.code === 'ER_CON_COUNT_ERROR'){
            console.error('La base de datos tiene muchas conexiones')
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Se ha rechazado la conexion')
        }
    }
    if(connection) connection.release()
    console.log("La base de datos esta conectada")
    return
})

pool.query = promisify(pool.query)

export default pool
