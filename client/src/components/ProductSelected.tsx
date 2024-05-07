import axios from "axios";
import { useState, useEffect } from "react";

type ProductoSeleccionado = {
    producto_id: number;
    id_vendedor: number;
    imagen: string;
    nombre: string;
    precio: number;
    descripcion: string;
    caracteristicas: string;
    calificacion: number;
    numResenias: number;
};
const initialState = {
    producto_id: 0,
    id_vendedor: 0,
    imagen: "",
    nombre: "",
    precio: 0,
    descripcion: "",
    caracteristicas: "",
    calificacion: 0,
    numResenias: 0
}
export default function ProductSelected() {
    const [product, setProduct] = useState<ProductoSeleccionado>(initialState);

    useEffect(() => {
        const fetchProduct = async () => {
            
                const response = await axios.get(`http://localhost:3000/api/products/1`);
                setProduct(response.data);
               
           
        };

        fetchProduct();
    }, []);

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-5">
            <h2 className="text-lg font-semibold text-gray-900">{product.nombre_producto}</h2>
            <p className="text-gray-600"><strong>Price:</strong> ${product.precio}</p>
            <p className="text-gray-600"><strong>Description:</strong> {product.descripcion}</p>
            <p className="text-gray-600"><strong>Features:</strong> {product.caracteristicas}</p>
            <p className="text-gray-600"><strong>Vendor:</strong> {product.}</p>
            <p className="text-gray-600"><strong>Category:</strong> {product.categoria}</p>
            <p className="text-gray-600"><strong>Average Rating:</strong> {product.calificacion_promedio} ({product.numero_resenas} reviews)</p>
        </div>
    );
}
