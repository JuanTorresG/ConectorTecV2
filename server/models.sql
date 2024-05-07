CREATE TABLE CLIENTE(
    id_cliente SERIAL PRIMARY KEY,
    telefono VARCHAR(10),
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    correo VARCHAR(300) NOT NULL UNIQUE,
    foto  VARCHAR(500),
);

CREATE TABLE DIRECCIONES_CLIENTE(
    id_direccion SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    num_exterior VARCHAR(50),
    num_interior VARCHAR(50),
    ciudad VARCHAR(100),
    estado VARCHAR(100),
    pais VARCHAR(100),    
    codigo_postal VARCHAR(5),
    entre_calle1 VARCHAR(100),
    entre_calle2 VARCHAR(100), 
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente)
);


CREATE TABLE VENDEDOR(
    id_vendedor SERIAL PRIMARY KEY,
    nombre_empresa VARCHAR(50) UNIQUE NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    correo VARCHAR(300) NOT NULL UNIQUE,
    descripcion VARCHAR(500)
);

CREATE TABLE CATEGORIA(
    id_categoria SERIAL PRIMARY KEY,
    id_categoria_padre INT,
    nombre VARCHAR(50),
    comision INT,
    FOREIGN KEY (id_categoria_padre) REFERENCES CATEGORIA(id_categoria)
);

CREATE TABLE PRODUCTO(
    id_producto SERIAL PRIMARY KEY,
    id_vendedor INT NOT NULL,
    id_categoria INT NOT NULL,
    cantidad INT,
    nombre VARCHAR(50),
    precio DECIMAL(10,2),
    caracteristicas VARCHAR(500),
    descripcion VARCHAR(500),
    FOREIGN KEY (id_vendedor) REFERENCES VENDEDOR(id_vendedor),
    FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id_categoria)
);

CREATE TABLE RESENIA(
    id_resena SERIAL PRIMARY KEY,
    id_cliente INT,
    id_producto INT,
    comentario VARCHAR(300),
    fecha TIMESTAMP,
    puntuacion INT,
    titulo VARCHAR(100),
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto)
);

CREATE TABLE PEDIDO(
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_vendedor INT NOT NULL,
    direccion_envio VARCHAR(50),
    total DECIMAL(10,2),
    fecha TIMESTAMP,
    estado INT,
    metodo_pago INT,
    precio_envio DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente),
    FOREIGN KEY (id_vendedor) REFERENCES VENDEDOR(id_vendedor)
);

CREATE TABLE MEDIA_PRODUCTO(
    id_media SERIAL PRIMARY KEY,
    id_producto INT NOT NULL,
    imagen_principal  VARCHAR(500),
    imagen2  VARCHAR(500),
    imagen3  VARCHAR(500),
    imagen4  VARCHAR(500),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto)
);

CREATE TABLE DETALLE_PEDIDO(
    id_detalle SERIAL PRIMARY KEY,
    id_producto INT NOT NULL,
    id_pedido INT NOT NULL,
    cantidad INT,
    precio_envio DECIMAL(10,2),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto),
    FOREIGN KEY (id_pedido) REFERENCES PEDIDO(id_pedido)
);

