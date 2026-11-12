import { useState, useEffect } from 'react';

function FormulariosAdmin() {

  const [formulario, setFormulario] = useState([]);

  useEffect(() => {

    fetch(`${import.meta.env.VITE_API_URL}/api/formulario`, {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al obtener formularios');
        }

        return res.json();
      })
      .then(datos => setFormulario(datos))
      .catch(error => console.log(error));

  }, []);

  return (
    <section>
      <h2>Mensajes recibidos</h2>

      {formulario.length === 0 ? (
        <p>No hay formularios registrados.</p>
      ) : (
        formulario.map(f => (
          <article key={f._id}>
            <h3>{f.nombre}</h3>
            <p>{f.correo}</p>
            <p>{f.mensaje}</p>
          </article>
        ))
      )}

    </section>
  );
}

export default FormulariosAdmin;