type FiltersProps = {
    minPrice: number;
    maxPrice: number;
    setMinPrice: (n:number)=>void;
    setMaxPrice: (n:number)=>void;
    setMinRating: (n: number) =>void;
}

export default function Filters({ minPrice, setMinPrice, maxPrice, setMaxPrice,setMinRating }:FiltersProps) {
    return (
        <>
            <h2 className="text-xl font-semibold mb-4">Filtros</h2>
            <div className="mb-4">
                <label htmlFor="minPrice" className="block text-sm font-semibold mb-1">Precio Mínimo:</label>
                <input
                    type="number"
                    id="minPrice"
                    value={minPrice}
                    onChange={(e) => setMinPrice(+e.target.value)}
                    className="px-3 py-2 w-full border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="maxPrice" className="block text-sm font-semibold mb-1">Precio Máximo:</label>
                <input
                    type="number"
                    id="maxPrice"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(+e.target.value)}
                    className="px-3 py-2 w-full border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
    <label htmlFor="rating" className="block text-sm font-semibold mb-1">Calificación Mínima:</label>
    <select
        id="rating"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        onChange={(e) => setMinRating(+e.target.value)}
    >
        <option value="0">Pedeterminado...</option>
        <option value="1">★☆☆☆☆ o más</option>
        <option value="2">★★☆☆☆ o más</option>
        <option value="3">★★★☆☆ o más</option>
        <option value="4">★★★★☆ o más</option>
        <option value="5">★★★★★ o más</option>
    </select>
</div>
        </>
    );
}
