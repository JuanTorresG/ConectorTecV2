import { Dispatch, useMemo } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { SellerActions } from "../reducers/seller-reducer";
import '../styles.css';  // Ensure styles are imported correctly
export type Producto = {
  id_producto: number;
  id_categoria: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  caracteristicas: string;
  imagen: string[];  
}
type ProductsListProps = {
  products: Producto[];
  dispatch: Dispatch<SellerActions>;
};

export default function ProductsList({ products, dispatch }: ProductsListProps) {
  const isEmpty = useMemo(() => products.length === 0, [products]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-heading text-accent mb-6 text-center">
        Productos registrados
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isEmpty ? (
          <p className="text-medium text-center col-span-full">No hay productos registrados.</p>
        ) : (
          products.map((product, index) => (
            <div
              key={index}
              className="p-4 shadow-lg rounded-lg bg-light flex flex-col justify-between"
            >
              <div>
                <img src={product.imagen?.toString() || 'placeholder-image-url'} alt={product.nombre} className="w-full h-48 object-cover rounded-lg mb-4"/>
                <h3 className="text-xl font-subheading text-secondary font-bold mb-2">
                  {product.nombre}
                </h3>
                <p className="text-medium">
                  Cantidad: <span className="font-body text-secondary">{product.cantidad}</span>
                </p>
                <p className="text-medium">
                  Precio: <span className="font-body text-primary">${product.precio}</span>
                </p>
                <p className="text-medium">
                  Descripción: <span className="font-body text-secondary">{product.descripcion}</span>
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  aria-label="Editar"
                  className="p-2 rounded-full hover:bg-medium"
                  onClick={() => dispatch({
                    type: "set-id-product",
                    payload: { id: product.id_producto },
                  })}
                >
                  <PencilIcon className="h-6 w-6 text-primary" />
                </button>
                <button
                  aria-label="Eliminar"
                  className="p-2 rounded-full hover:bg-medium"
                  onClick={() => dispatch({
                    type: "delete-product",
                    payload: { id_producto: product.id_producto },
                  })}
                >
                  <TrashIcon className="h-6 w-6 text-red-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
