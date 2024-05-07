import axios from 'axios';
import { useEffect, useState } from 'react';
import Filters from './Filters';
import Product from './Product';

export default function CategoryScreen() {
    const [products, setProducts] = useState<Producto[]>([]);
    const [minRating, setMinRating] = useState(0)
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);
    
    const [sortOrder, setSortOrder] = useState('');
    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const idCategoria = 1;
                
                const params = new URLSearchParams({
                    minPrice: minPrice.toString(),
                    maxPrice: maxPrice.toString(),
                    sortOrder: sortOrder,
                    minRating: minRating.toString() 
                });
                const url = `http://localhost:8080/productos/${idCategoria}?${params.toString()}`;
                const respuesta = await axios.get(url);
                const productos = respuesta.data;
                setProducts(productos);
                console.log(productos);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        obtenerProductos();
    }, [minPrice, maxPrice, sortOrder, minRating]); 

    return (
        <div className="px-4 py-5 flex flex-col md:flex-row">
        <div className="md:w-1/4 lg:w-1/5 p-4 bg-white shadow rounded-lg mb-5 md:mb-0 md:mr-5 md:max-h-80">
            <Filters 
                minPrice={minPrice} 
                setMinPrice={setMinPrice} 
                maxPrice={maxPrice} 
                setMaxPrice={setMaxPrice}
                setMinRating={setMinRating}
            />
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Laptops</h1>
                <div>
                    <label htmlFor="sortOrder" className="text-sm font-semibold mr-2">Ordenar Por:</label>
                    <select
                        id="sortOrder"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Predeterminado</option>
                        <option value="priceLowHigh">Menor a Mayor Precio</option>
                        <option value="priceHighLow">Mayor a Menor Precio</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((producto) => (
                    <Product key={producto.id_producto} {...producto} />
                ))}
            </div>
        </div>
    </div>
    );
};

