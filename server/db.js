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

export async function obtenerProductosPorIdCategoria(idCategoria, { minPrice = 0, maxPrice = Number.MAX_SAFE_INTEGER, sortOrder = '', minRating = 0 }) {
    let orderClause;
    switch (sortOrder) {
        case 'priceLowHigh':
            orderClause = 'ORDER BY precio ASC';
            break;
        case 'priceHighLow':
            orderClause = 'ORDER BY precio DESC';
            break;
        default:
            orderClause = 'ORDER BY calificacion DESC, numresenias DESC'; 
            break;
    }

    const query = format(`
        SELECT *
        FROM Vista_Productos AS vp
        WHERE 
            vp.id_categoria = %L AND
            precio >= %L AND
            precio <= %L AND
            calificacion >= %L
        %s
    `, idCategoria, minPrice, maxPrice, minRating, orderClause);

    try {
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        throw error;
    }
}

//FUncion para obtener las categirias
export async function obtenerCategorias(){
    const resultado = await pool.query('SELECT nombre, id_categoria, id_categoria_padre FROM CATEGORIA');
    return resultado.rows;
}

export async function obtenerProductoPorID(id){
    const resultado = await pool.query(
        `
            SELECT * FROM PRODUCTO
            WHERE id_producto = %L
        `[id]
    )
    return resultado.rows[0];
}

export async function obtenerReseniasPorIdProducto(id){
    const resultado = await pool.query(
        `
            SELECT * FROM RESENIA
            WHERE id_producto = %L
        `[id]
    )
    return resultado.rows[0];
}


// Función para obtener todos los productos
export async function obtenerProductos() {
    const resultado = await pool.query('SELECT * FROM PRODUCTO WHERE id_vendedor = 1');
    return resultado.rows;
}

export async function agregarProducto({ id_categoria, cantidad, nombre, precio, caracteristicas, descripcion, imagen}) {
    try {
        const query = format('INSERT INTO PRODUCTO (id_vendedor, id_categoria, cantidad, nombre, precio, caracteristicas, descripcion, imagen) VALUES (2, %L, %L, %L, %L, %L, %L, %L)', id_categoria, cantidad, nombre, precio, caracteristicas, descripcion, imagen);
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (error) {
        console.error('Error adding product:', error);
        throw new Error('Failed to add product');
    }
}


// Función para eliminar un producto por su ID
export async function eliminarProducto(id_producto) {
    const query = format('DELETE FROM PRODUCTO WHERE id_producto = %L AND id_vendedor = 2', id_producto);
    const resultado = await pool.query(query);
    return resultado;
}

// Función para actualizar los datos de un producto
export async function actualizarProducto(id_producto, { id_categoria, cantidad, nombre, precio, caracteristicas, descripcion,imagen }) {
    const query = format('UPDATE PRODUCTO SET id_vendedor = 2, id_categoria = %L, cantidad = %L, nombre = %L, precio = %L, caracteristicas = %L, descripcion = %L WHERE id_producto = %L, imagen = %L', id_categoria, cantidad, nombre, precio, caracteristicas, descripcion, id_producto,imagen);
    const resultado = await pool.query(query);
    return resultado;
}