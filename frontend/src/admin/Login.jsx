import { useState } from "react";
import './ComponentesAdmin-css/Login.css';
import PanelAdmin from "./PanelAdmin";

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [logueado, setLogueado] = useState(false);

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try{

      const respuesta = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          correo,
          contraseña
        })
      });

      const datos = await respuesta.json();
      if(respuesta.ok){
        setLogueado(true);

        //guardar el token en localStorage
        localStorage.setItem('token', datos.token);

        setMensaje('Bienvenido al administrador');

      }else{
        setMensaje(datos.mensaje);
      }
    }catch(error){

      setMensaje('Error al iniciar sesión, por favor intente de nuevo');

    }
  };

  //si el usuario ya está logueado, redirigir a la página del panel de administración
  if(logueado){
    return <PanelAdmin />;
  }

  return (
      <section className="login-admin">
        <h1 className="logo">Atlantis' Ice Creams</h1>
        <h2 className="titulo">Inicio de sesión</h2>

        <form onSubmit={iniciarSesion}>

          <input type="email"
            placeholder="Correo Electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
           />

           <input type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required />

            <button type="submit">
              Iniciar Sesión
            </button>

        </form>

        <p>{mensaje}</p>

      </section>
    )
}

export default Login;