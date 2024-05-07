import { useState, ChangeEvent, FormEvent, Dispatch } from 'react';
import { SellerActions, SellerState } from '../reducers/seller-reducer';

import '../styles.css'; // Assuming custom styles are defined here
export type ProductoForm = {
    id_categoria: number;
    id_producto: number;
    nombre: string;
    precio: number;
    cantidad: number;
    caracteristicas: string;
    descripcion: string;
    imagen: File[]; 
  }
type FormProductProps = {
    dispatch: Dispatch<SellerActions>;
    state: SellerState;
}

const initialState: ProductoForm = {
    cantidad: 0,
    id_producto: -1,
    id_categoria: 0,
    nombre: '',
    precio: 0.0,
    caracteristicas: '',
    descripcion: '',
    imagen: []
}

export default function FormProduct({ state, dispatch }: FormProductProps) {
    const [producto, setProducto] = useState<ProductoForm>(initialState);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setProducto(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setProducto(prev => ({ ...prev, imagen: Array.from(files).slice(0, 4) }));
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('cantidad', producto.cantidad.toString());
        formData.append('id_producto', producto.id_producto.toString());
        formData.append('id_categoria', producto.id_categoria.toString());
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio.toString());
        formData.append('caracteristicas', producto.caracteristicas);
        formData.append('descripcion', producto.descripcion);
        producto.imagen.forEach((file, index) => {
            formData.append(`imagen${index + 1}`, file);
        });
    
        dispatch({ type: 'save-product', payload: { newProduct: producto } });
    
        setProducto({...initialState});
    };

    return (
        <div className="container mx-auto p-4 w-1/2 font-body">
            <form onSubmit={handleSubmit} className="bg-light rounded-lg shadow px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-heading text-accent mb-6 text-center">Registrar Producto</h2>
                <div className="grid grid-cols-2 gap-4">
                <label className="block">
                        Categoría ID:
                        <input
                            type="number"
                            name="id_categoria"
                            value={producto.id_categoria} 
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        Cantidad:
                        <input
                            type="number"
                            name="cantidad"
                            value={producto.cantidad}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        Nombre:
                        <input
                            type="text"
                            name="nombre"
                            value={producto.nombre}
                            onChange={handleChange}
                            maxLength={50}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        Precio:
                        <input
                            type="number"
                            name="precio"
                            value={producto.precio}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block col-span-2">
                        Características:
                        <textarea
                            name="caracteristicas"
                            value={producto.caracteristicas}
                            onChange={handleChange}
                            maxLength={500}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block col-span-2">
                        Descripción:
                        <textarea
                            name="descripcion"
                            value={producto.descripcion}
                            onChange={handleChange}
                            maxLength={500}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        </label>
                </div>
                <label className="block col-span-2">
                    Imagen (hasta 4):
                    <input
                        type="file"
                        name="imagen"
                        onChange={handleFileChange}
                        multiple
                        accept="image/*"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                {producto.imagen.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {producto.imagen.map((file, index) => (
                            <div key={index} className="w-full">
                                <img src={URL.createObjectURL(file)} alt={`Imagen ${index + 1}`} className="w-full h-auto rounded-md" />
                            </div>
                        ))}
                    </div>
                )}

                <button type="submit" className="mt-6 w-full rounded-md py-2 bg-primary hover:bg-secondary text-white font-bold cursor-pointer uppercase transition-colors duration-200">Registrar Producto</button>
            </form>
        </div>
    );
}
