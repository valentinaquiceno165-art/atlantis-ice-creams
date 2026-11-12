import { useState } from 'react';

function Contacto() {
  const [datos, setDatos] = useState({ name: '', email: '', message: '' });
  const [mensaje, setMensaje] = useState('');

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/api/formulario`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: datos.name,
          correo: datos.email,
          mensaje: datos.message
        })
      });

      if (respuesta.ok) {
        setMensaje('¡Gracias! Tu mensaje fue enviado correctamente.');
        setDatos({ name: '', email: '', message: '' });
      } else {
        setMensaje('No se pudo enviar el mensaje.');
      }

    } catch (error) {
      setMensaje('Error al conectar con el servidor.');
    }
  };


  return (
    <section className="contacto-seccion" id="contacto">
      <h2 className="titulo-seccion">CONTACTO</h2>
      <p>Estamos aquí para ayudarte. Si tienes preguntas acerca de nosotros o necesitas asistencia, ¡Envíanos un
        mensaje!</p>

      <form id="formulario-contacto" onSubmit={manejarEnvio}>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" autoComplete="name" name="name" value={datos.name} onChange={manejarCambio} required /><br />

        <label htmlFor="email">Correo electrónico:</label>
        <input type="email" id="email" autoComplete="email" name="email" value={datos.email} onChange={manejarCambio} required /><br />

        <label htmlFor="message">Mensaje:</label>
        <textarea id="message" name="message" rows="4" value={datos.message} onChange={manejarCambio} required></textarea><br />

        <input type="submit" value="Enviar" />
      </form>

      <p id="mensaje-formulario">{mensaje}</p>
    </section>
  )
}

export default Contacto;
