// Importa dotenv para el manejo de variables de entorno
import dotenv from "dotenv";
// Importa la función de formato de PostgreSQL para crear consultas dinámicas y seguras
import format from 'pg-format';
// Carga las variables de entorno del archivo .env
dotenv.config();

// Importa el paquete pg, que permite la conexión y manejo de la base de datos PostgreSQL
import pkg from 'pg';
// Desestructura Pool desde el paquete pg para manejar un pool de conexiones
const { Pool } = pkg;

// Configuración para la conexión a la base de datos usando variables de entorno
const configuracion = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
};

// Crea una instancia de Pool con la configuración para manejar conexiones
const pool = new Pool(configuracion);

//Funcion para la informacion del cliente
export async function clientes(){
    const resultado = await pool.query('SELECT * FROM Vista_Detalles_Cliente');
    return resultado.rows;
}

export async function producto(){
    const resultado = await pool.query('SELECT * FROM Vista_Producto_Seleccionado WHERE id_producto = 1');
    return resultado.rows;
}