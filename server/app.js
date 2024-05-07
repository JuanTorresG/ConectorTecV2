import express from "express";
import cors from "cors";
import { upload } from "./config/multer.js";
import { uploadFile } from './util/uploadFile.js'
import {
    obtenerProductos,
    agregarProducto,
    eliminarProducto,
    actualizarProducto,
    obtenerProductosPorIdCategoria,
    obtenerCategorias
} from "./db.js";

const corsOption = {
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
};

const app = express();
app.use(express.json());
app.use(cors(corsOption));
const port = 8080;

app.get("/categorias", async (req,res) =>{
    try{
        const categorias = await obtenerCategorias();
        res.json(categorias);
    }catch(e){
        res.status(500).json({ mensaje: "Error al obtener las categorias", e: e.message });
    }
})

app.get("/productos/:idCategoria", async (req, res) => {
    const { minPrice, maxPrice, sortOrder, minRating } = req.query;
    const idCategoria = parseInt(req.params.idCategoria);

    try {
        const productos = await obtenerProductosPorIdCategoria(idCategoria, {
            minPrice: parseFloat(minPrice),
            maxPrice: parseFloat(maxPrice),
            minRating: parseFloat(minRating),
            sortOrder
        });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los productos", error: error.message });
    }
});

app.delete("/seller/productos/:id_producto", async (req, res) => {
    try {
        await eliminarProducto(req.params.id_producto);
        res.json({ mensaje: "Producto eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ mensaje: "Error al eliminar el producto", error: error.message });
    }
});
// Actualizar los datos de un producto
app.put("/seller/productos/:id",upload.fields([{ name: 'imagen', maxCount: 1 }]), async (req, res) => {
    try {
        await actualizarProducto(req.params.id, req.body);
        res.json({ mensaje: "Producto actualizado con éxito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el producto", error: error.message });
    }
});

app.post('/seller/productos', upload.fields([{ name: 'imagen', maxCount: 1 }]), async (req, res) => {

    try {
        console.log("Received body:", req.body);
        console.log("Received files:", req.files);
        const body = req.body
        const image = req.files.imagen

        if (image && image.length > 0) {
            const { downloadURL } = await uploadFile(image[0])
            console.log(downloadURL);
            await agregarProducto({
                id_categoria: body.id_categoria,
                cantidad: body.cantidad, 
                nombre: body.nombre, 
                precio: body.precio, 
                caracteristicas: body.caracteristicas, 
                descripcion: body.descripcion,
                imagen: downloadURL
            })
            return res.json({ mensaje: "Producto agregado con éxito" });
        }
        return res.status(400).json({ mensaje: "Deves enviar una imagen" });
        
    } catch (error) {
        res.status(500).json({ mensaje: "Error al agregar el producto", error: error.message });
    }
});

app.get("/seller/productos", async (req, res) => {
    try {
        const productos = await obtenerProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los productos", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`La API esta escuchando en el puerto ${port}`);
})

/*
import {
    obtenerProductosPorIdCategoria,
    obtenerProductos,
    agregarProducto,
    eliminarProducto,
    actualizarProducto
} from "./db.js";

const corsOption = {
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
};

const app = express();
app.use(express.json());
app.use(cors(corsOption));


app.get("/productos/:idCategoria", async (req, res) => {
    const { minPrice, maxPrice, sortOrder } = req.query;
    const idCategoria = parseInt(req.params.idCategoria);
    if (isNaN(idCategoria)) {
        return res.status(400).json({ mensaje: "ID de categoría inválido" });
    }

    try {
        const productos = await obtenerProductosPorIdCategoria(idCategoria, {
            minPrice: parseFloat(minPrice),
            maxPrice: parseFloat(maxPrice),
            sortOrder
        });
        res.json(productos);
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ mensaje: "Error al obtener los productos", error: error.message });
    }
});


// Obtener todos los productos
app.get("/seller/productos", async (req, res) => {
    try {
        const productos = await obtenerProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los productos", error: error.message });
    }
});

// Agregar un nuevo producto
app.post('/seller/productos', async (req, res) => {
    try {

        const { id_categoria, cantidad, nombre, precio, caracteristicas, descripcion } = req.body;
        await agregarProducto({ id_categoria, cantidad, nombre, precio, caracteristicas, descripcion});
        res.json({ mensaje: "Producto agregado con éxito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al agregar el producto", error: error.message });
    }
});

// Eliminar un producto por su ID
app.delete("/seller/productos/:id_producto", async (req, res) => {
    try {
        await eliminarProducto(req.params.id_producto);
        res.json({ mensaje: "Producto eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ mensaje: "Error al eliminar el producto", error: error.message });
    }
});
// Actualizar los datos de un producto
app.put("/seller/productos/:id", async (req, res) => {
    try {
        await actualizarProducto(req.params.id, req.body);
        res.json({ mensaje: "Producto actualizado con éxito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el producto", error: error.message });
    }
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});
*/