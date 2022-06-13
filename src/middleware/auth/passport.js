import passport from "passport"
import { Strategy } from "passport-local"
import pool from "@DB/connection"
import {encryptPassword, matchPassword} from "@Middleware/auth/bcrypt"

passport.use('local.ingreso', new Strategy({
    passReqToCallback: true
}, async (req, done) => {
    const {correo, contrasena, rol} = req.body
    console.log(correo)
    let usuario
    if(rol == 1){
        //usuario = await pool.query('select * from empleados where correo = ?', [correo])
    }else {
        //usuario = await pool.query('select * from clientes where correo = ?', [correo])
    }
    if(usuario.length > 0){
        let usuario2 = usuario[0]
        let valido =  await matchPassword(contrasena, usuario2.contrasena)
        if(valido){
            done(null, usuario2)
        }else{
            done(null, false, "Contraseña incorrecta")
        }
    }else {
        done(null, false, "El usuario no existe")
    }
}))

passport.use('local.registroCLI', new Strategy({
    passReqToCallback: true
}, async (req, done) => {
    const { cedula, nombre, apellido, telefono, 
        correo, contrasena, es_flota} = req.body
        console.log(nombre)
    let cliente = {
        cedula,
        nombres: nombre,
        apellidos: apellido,
        telefono, 
        correo,
        contrasena,
        es_flota
    }
    cliente.contrasena = await encryptPassword(contrasena)
    //await pool.query('insert into clientes set ?', [cliente])
    done(null, cliente)
}))

passport.use('local.registroEMP', new Strategy({
    passReqToCallback: true
}, async (req, done) => {
    const { id_mecanico, cedula, nombre, apellido, 
        correo, contrasena, telefono, fecha_ingreso,
         id_sede, rol} = req.body
         console.log('nombre')
    let empleado = {
        cedula, 
        nombres: nombre,
        apellidos: apellido,
        correo,
        contrasena,
        telefono,
        fecha_ingreso,
        id_sede,
        rol
    }
    empleado.contrasena = await encryptPassword(contrasena)
    console.log(empleado)
    //await pool.query('insert into empleados set ?', [empleado])
    if(rol == 0){
        let mecanico = {
            id: id_mecanico,
            cedula
        }
        console.log('Es un mecanico')
        //await pool.query('insert into mecanicos set ?', [mecanico])
    }
    delete empleado.contrasena
    console.log(empleado)
    done(null, empleado)
}))

passport.serializeUser((usuario, done) => {
    done(null,{ cedula: usuario.cedula, rol: usuario.rol})
})

passport.deserializeUser(async (cedula, rol, done) => {
    if(rol == 1){
        //const usuario = await pool.query('select * from empleados where cedula = ?', [cedula])
    }else {
        //const usuario = await pool.query('select * from clientes where cedula = ?', [cedula]) 
    }
    done(null, usuario[0])
})