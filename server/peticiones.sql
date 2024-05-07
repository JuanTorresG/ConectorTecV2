CREATE VIEW Vista_Productos AS
SELECT 
    p.id_producto, 
    p.nombre, 
    p.precio,
    p.imagen,
    p.id_categoria,
    COALESCE(AVG(r.puntuacion), 0) AS calificacion,
    COUNT(r.id_resena) AS numresenias
FROM 
    PRODUCTO AS p
LEFT JOIN 
    RESENIA AS r ON p.id_producto = r.id_producto
GROUP BY 
    p.id_producto, p.nombre
CREATE VIEW Vista_Producto_Seleccionado AS
SELECT
    p.id_producto,
    p.id_vendedor,
    p.id_categoria,
    p.cantidad,
    p.nombre,
    p.precio,
    p.caracteristicas,
    p.descripcion,
    mp.imagen_principal,
    mp.imagen2,
    mp.imagen3,
    mp.imagen4,
    COALESCE(AVG(r.puntuacion), 0) AS calificacion_promedio,
    COUNT(r.id_resena) AS numero_resenas
FROM 
    PRODUCTO p
LEFT JOIN
    MEDIA_PRODUCTO mp ON p.id_producto = mp.id_producto
LEFT JOIN
    RESENIA r ON p.id_producto = r.id_producto
GROUP BY
    p.id_producto,
    p.id_vendedor,
    p.id_categoria



CREATE VIEW Vista_Detalles_Cliente AS
SELECT 
    c.id_cliente,
    c.nombre,
    c.apellidos,
    c.telefono,
    c.correo,
    d.ciudad,
    d.estado,
    d.pais,
    d.codigo_postal,
    d.num_exterior,
    d.num_interior,
    d.entre_calle1,
    d.entre_calle2
FROM 
    CLIENTE AS c
JOIN 
    DIRECCIONES_CLIENTE AS d ON c.id_cliente = d.id_cliente;
