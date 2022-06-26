import config from "./config"
import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME
})

pool.getConnection()
  .then((conn) => console.log('Base de datos conectada: ' + conn.config.database))
  .catch((err) => console.error(err));

export default pool
