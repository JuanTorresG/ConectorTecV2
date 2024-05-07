type newUser = {
    nombre: string;
    apellidos: string;
    correo: string;
    contrasenia: string;
}
type user = {
    id: number;
    nombre: string;
    foto: string
}
type Filtros = {
    precioMinimo: number;
    precioMaximo: number;
    orden: string
}
type Categoria = {
    id_categoria: number;
    id_categoria_padre: number;
    nombre: string;
}
type Producto = {
    id_producto: number;
    imagen: string;
    nombre: string;
    precio: number;
    calificacion: number;
    numresenias: number;
}
type ProductoSeleccionado = {
    producto_id: number;
    imagenes: string[];
    nombre: string;
    precio: number;
    descripcion: string;
    caracteristicas: string;
    calificacion: number;
    numResenias: number;
}
type Resenia = {
    nombreCliente: string;
    fotoCliente: string;
    fecha: string;
    puntuacion: number;
    comentario: string;
    titulo: string;
}
type ProductoCarrito = {
    imagen: string;
    nombre: string;
    precio: number;
    cantidad: number;
}