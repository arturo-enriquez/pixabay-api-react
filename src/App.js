import React, {useState, useEffect} from 'react';

import Buscador from './components/Buscador'
import ListadoImagenes from './components/ListadoImagenes'

function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    // * consultar imagenes a la API de Pixabay
    const consultarAPI = async () => {
      if (busqueda === '') return;

      const key = '14225940-5a1afaba50f825c91f54545c2';
      const imagesPage = 20;
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagesPage}&page=${paginaActual}`;
      const req = await fetch(url);
      const res = await req.json();

      setImagenes(res.hits);

      // calcular el total de paginas
      setTotalPaginas(Math.ceil(res.totalHits / imagesPage));

      // Mover la pantalla hacia la parte supuerior
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth', block:'end'});
    }
    consultarAPI();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () => {
    let nuevaPaginaActual = paginaActual - 1;
    // colocarlo en el State
    setPaginaActual(nuevaPaginaActual);
  }
  const paginaSiguiente = () => {
    let nuevaPaginaActual = paginaActual + 1;
    // colocarlo en el State
    setPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="app container">
      <div className="jumbotron bg-white">
        <h1 className="mb-5 text-center"><span role="img" aria-label="photo">📷</span> Buscador de Imagenes</h1>

        <Buscador
          setBusqueda={setBusqueda}
          setPaginaActual={setPaginaActual}
        />

      </div>

      <div className="row justify-content-center">

        {(imagenes.length < 1 && busqueda !== '') ?
          <h2 className="text-center my-5">No hay resultados de "{busqueda}"</h2> : null}

        <ListadoImagenes 
          imagenes={imagenes}
        />

        <div className="mb-5">
          {(paginaActual <= 1) ? null : (
            <button onClick={paginaAnterior} type="button" className="btn btn-dark mr-1" >&laquo; Anterior</button>
          )}
          {(paginaActual >= totalPaginas) ? null : (
            <button onClick={paginaSiguiente} type="button" className="btn btn-dark mr-1" >Siguiente &raquo;</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
