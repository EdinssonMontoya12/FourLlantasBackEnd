//Importar express
import express from 'express'
//Importar cors
import cors from 'cors'
//Importar module-alias para implementarlo
import "module-alias/register"

const app = express()

//Set port
app.set("port", process.env.PORT || 3000)

//Middlewares
app.use(express.json())
app.use(cors({
    origin: '*'
}))

//Routes
import {prueba, empleado} from "@Router"

app.use("/api", prueba)
app.use("/api", empleado)

//Server listen
app.listen(app.get("port"), () => {
    console.log("Servidor ejecutandose en el puerto:", app.get("port"))
})