import axios from 'axios';
import { useState, useEffect } from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid'; // Correct icon import

// Define an interface for the category
interface Category {
    id_categoria: number;
    nombre: string;
    id_categoria_padre: number | null;
}

export default function CategoryMenu() {
    const [categorias, setCategorias] = useState<Category[]>([]);
    const [isOpen, setIsOpen] = useState(false); // Control visibility of the menu
    const [error, setError] = useState<string | null>(null); // Error state

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get<Category[]>('http://localhost:8080/categorias');
                setCategorias(response.data);
                setError(null); // Reset error state on successful data fetch
            } catch (error: any) {
                setError('Failed to fetch categories. Please try again later.');
                console.error('Fetching categories failed:', error.message); // Log detailed error
            }
        }
        fetchCategorias();
    }, []);

    const buildMenu = (idPadre: number | null = null): JSX.Element[] => {
        return categorias.filter(cat => cat.id_categoria_padre === idPadre).map(cat => (
            <li key={cat.id_categoria} className="ml-4">
                {cat.nombre}
                {categorias.some(c => c.id_categoria_padre === cat.id_categoria) && (
                    <ul>{buildMenu(cat.id_categoria)}</ul>
                )}
            </li>
        ));
    };

    return (
        <div>
            <button className="p-2 rounded-md focus:outline-none focus:ring focus:ring-opacity-50" onClick={() => setIsOpen(!isOpen)}>
                <Bars3Icon className="h-6 w-6" />
            </button>

            {isOpen && (
                <ul className="bg-white shadow-lg rounded-lg p-4 absolute">
                    {buildMenu()}
                </ul>
            )}

            {/* Display error message if there is an error */}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
