export type productActions = 
    {type: 'search-product', payload: {name: string}}|
    {type: 'set-categorie', payload: {id: number}} |
    {type: 'set-filters', payload: {filtros: Filtros}} |
    {type: 'set-product', payload: {id: number}}

export type productState = {
    products: Producto[];
    product: ProductoSeleccionado;
    filtros: Filtros;
}