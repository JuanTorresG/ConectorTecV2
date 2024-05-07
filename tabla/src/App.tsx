import  { useState, useEffect } from 'react';
import TablaConPaginacion from './TablaConPaginacion';

function App() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/vista1`);
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchDatos();
  }, []);


  return (
    <div className=" flex justify-center flex-col h-auto m-auto">
      <h1 className='text-2xl font-black uppercase'>Informacion Usuario</h1>
      
      {datos.length > 0 ? (
        <TablaConPaginacion datos={datos} filasPorPagina={20} />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}

export default App;
