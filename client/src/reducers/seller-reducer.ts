import axios from 'axios';
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
export type Producto = {
    id_producto: number;
    id_categoria: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    caracteristicas: string;
    imagen: string[];  // Cambiado de String | undefined a un arreglo de strings para soportar múltiples imágenes
}

export type SellerActions =
    { type: 'save-product', payload: { newProduct: ProductoForm } } |
    { type: 'edit-product', payload: { editedProduct: Producto } } |
    { type: 'set-id-product', payload: { id: Producto['id_producto'] } } |
    { type: 'delete-product', payload: { id_producto: Producto['id_producto'] } }

export type SellerState = {
    productos: Producto[];
    id: Producto['id_producto'];
}

export const API_URL = 'http://localhost:8080/seller/productos';

export const fechtProduct = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Error fetching products');
    }
    return response.json();
}

const saveProduct = async (producto: ProductoForm) => {
    try {
        await axios.post(API_URL, producto, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.error(error);

    }
}

const editProduct = async (Producto: Producto, id: Producto['id_producto']) => {
    try {
        await axios.put(`${API_URL}/${id}`, { ...Producto });
    } catch (error) {
        console.error(error);

    }
}

const deleteProduct = async (id_producto: Producto['id_producto']) => {
    try {
        await axios.delete(`${API_URL}/${id_producto}`);
    } catch (error) {
        console.log("Error al eliminar el producto: ", error);
    }
}

const datos: Producto[] = await fechtProduct();

export const initialState: SellerState = {
    productos: datos,
    id: -1
}

export const sellerReducer = (state: SellerState = initialState, action: SellerActions) => {
    if (action.type === 'save-product') {
        saveProduct(action.payload.newProduct);
        return {
            ...state,
            id: -1
        }
    }
    if (action.type === 'edit-product') {
        editProduct(action.payload.editedProduct, state.id);
        const updateProducts = state.productos.map(p => p.id_producto === state.id ? action.payload.editedProduct : p)
        return {
            ...state,
            productos: updateProducts,
            id: -1
        }
    }

    if (action.type === 'set-id-product') {
        return {
            ...state,
            id: action.payload.id
        };
    }
    if (action.type === 'delete-product') {
        deleteProduct(action.payload.id_producto);
        return {
            ...state,
            productos: state.productos.filter(producto => producto.id_producto !== action.payload.id_producto)
        }
    }
    return state;
}