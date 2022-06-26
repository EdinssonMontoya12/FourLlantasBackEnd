//Importar express
import express from 'express'
//Importar cors
import cors from 'cors'
//Importar module-alias para implementarlo
import "module-alias/register"
//Importar passport para autentificación
import passport from "passport"
//Importar configuracion de passport
import "@middleware/auth/passport"

import router from "@router"

//Inicilizar
const app = express()

//Establecer puerto
app.set("port", process.env.PORT || 3000)

//Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
  origin: '*'
}))
app.use(passport.initialize())

//Rutas
app.use(router);

//iniciar servidor
app.listen(app.get("port"), () => {
  console.log("Servidor ejecutandose en el puerto:", app.get("port"))
})
