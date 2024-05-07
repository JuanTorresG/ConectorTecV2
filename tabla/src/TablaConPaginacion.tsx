import { useState, useEffect } from 'react';

const TablaConPaginacion = ({ datos, filasPorPagina }) => {
  const [paginaActual] = useState(1);
  const [datosPagina, setDatosPagina] = useState([]);

  useEffect(() => {
    const inicio = (paginaActual - 1) * filasPorPagina;
    const fin = inicio + filasPorPagina;
    setDatosPagina(datos.slice(inicio, fin));
  }, [paginaActual, datos]);

  return (
    <div className="mx-auto px-4 max-w-full bg-white"> {/* Limita el ancho de la tabla al 80% del contenedor padre */}

      <table className="w-full mt-5">
        <thead className="bg-gray-50">
          <tr>
            {datos.length > 0 && Object.keys(datos[0]).map((key, index) => (
              <th key={index} className="py-3 px-6 text-xs font-semibold uppercase text-black text-left">{key}</th>  // Cambiado a texto negro
            ))}
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {datosPagina.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((val, idx) => (
                <td key={idx} className="py-4 px-6 text-black">{val}</td>  // Cambiado a texto negro
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaConPaginacion;
