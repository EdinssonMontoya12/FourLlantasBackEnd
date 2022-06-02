import { Router } from "express";
import pool from "@DB/connection";

const router = new Router()

router.get('/prueba', async (req, res) => {
    const usuarios = await pool.query("select * from cliente")
    res.status(200).json(usuarios)
})

export default router