import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Bienvenida from "./Components/Bienvenida";
import Catalogo from "./Components/Catalogo";
import Contacto from "./Components/Contacto";
import PiePagina from "./Components/PiePagina";

import Login from "./admin/Login";
import PanelAdmin from "./admin/PanelAdmin";

// Comprobar si existe una sesión válida
function RutaProtegida() {
    const [autorizado, setAutorizado] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/verificar-sesion`, {
            credentials: 'include'
        })
        .then(res => setAutorizado(res.ok))
        .catch(() => setAutorizado(false));
    }, []);

    if (autorizado === null) {
        return <p>Comprobando sesión...</p>;
    }

    return autorizado ? <PanelAdmin /> : <Navigate to="/admin" replace />;
}

function PaginaPrincipal() {
    const [busqueda, setBusqueda] = useState("");

    return (
        <>
            <header>
                <Navbar busqueda={busqueda} setBusqueda={setBusqueda} />
            </header>

            <main>
                <Bienvenida />
            </main>

            <section>
                <Catalogo busqueda={busqueda} />
            </section>

            <section>
                <Contacto />
            </section>

            <footer>
                <PiePagina />
            </footer>
        </>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<PaginaPrincipal />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/panel" element={<RutaProtegida />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;