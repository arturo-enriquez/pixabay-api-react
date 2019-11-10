import React, {useState} from 'react'

import Error from './Error'

function Buscador({setBusqueda, setPaginaActual}) {

  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [error, setError] = useState(false);

  const buscarImagen = e => {
    e.preventDefault();

    // validar
    if (terminoBusqueda === '') {
      setError(true);
      return;
    }

    // Enviar el termino hacia el componente principal
    setError(false);
    setPaginaActual(1);
    setBusqueda(terminoBusqueda);
  }

  return (
    <form
      onSubmit={buscarImagen}
    >
      <div className="row">
        <div className="form-group col-md-10">
          <input 
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: Canada o Cafe"
            onChange={e => setTerminoBusqueda(e.target.value)}
          />
        </div>
        <div className="form-group col-md-2">
          <input 
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            value="Buscar"
          />
        </div>
      </div>

      {(error) ? <Error mensaje="Agrega un termino de busqueda"/> : null}

    </form>
  )
}

export default Buscador
