import express from "express";
import cors from "cors";

import { clientes, producto } from "./db.js";

const app = express();
app.use(express.json());

app.use(cors({ origin: "*", methods: ["GET"], credentials: true }));
const port = process.env.PORT || 3000;

app.get("/api/vista1/", async (req, res) => {
    try {
        const resultado = await clientes();
        res.json(resultado);
    } catch (e) {
        res.status(500).json({ mensaje: "Error al procesar la consulta", error: e.message });
    }
});
app.get("/api/vista2/", async (req, res) => {
    try {
        const resultado = await producto();
        console.log(resultado);
        res.json(resultado);
    } catch (e) {
        res.status(500).json({ mensaje: "Error al procesar la consulta", error: e.message });
    }
});
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});
