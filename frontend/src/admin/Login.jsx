import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './ComponentesAdmin-css/Login.css';

function Login() {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(true);

    const navegar = useNavigate();

    // Comprobar si ya existe una sesión
    useEffect(() => {
        fetch('/api/verificar-sesion', {
            credentials: 'include'
        })
        .then(res => {
            if (res.ok) {
                navegar('/admin/panel', { replace: true });
            } else {
                setCargando(false);
            }
        })
        .catch(() => setCargando(false));
    }, [navegar]);

    const iniciarSesion = async (e) => {
        e.preventDefault();
        setMensaje('');

        try {
            const respuesta = await fetch('/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo, contraseña })
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                navegar('/admin/panel', { replace: true });
            } else {
                setMensaje(datos.mensaje);
            }

        } catch (error) {
            setMensaje('Error al iniciar sesión');
        }
    };

    if (cargando) return <p>Comprobando sesión...</p>;

    return (
        <section className="login-admin">
            <h1 className="logo">Atlantis' Ice Creams</h1>
            <h2 className="titulo">Inicio de sesión</h2>

            <form onSubmit={iniciarSesion}>
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={correo}
                    onChange={e => setCorreo(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contraseña}
                    onChange={e => setContraseña(e.target.value)}
                    required
                />

                <button type="submit">
                    Iniciar Sesión
                </button>
            </form>

            <p>{mensaje}</p>
        </section>
    );
}

export default Login;