import { useState } from 'react';
import Resumen from './Resumen';
import ProductosAdmin from './ProductosAdmin';
import FormulariosAdmin from './FormulariosAdmin';
import './ComponentesAdmin-css/Panel.css';

function PanelAdmin() {

    const [seccion, setSeccion] = useState('resumen');

    const cerrarSesion = async () => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            window.location.reload();

        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className="panel-admin">

            <header>
                <h1>Atlantis' Ice Creams</h1>
                <h2>Panel de administración</h2>

                <nav>
                    <button onClick={() => setSeccion('resumen')}>
                        Resumen
                    </button>

                    <button onClick={() => setSeccion('productos')}>
                        Productos
                    </button>

                    <button onClick={() => setSeccion('formulario')}>
                        Formulario
                    </button>

                    <button onClick={cerrarSesion}>
                        Cerrar sesión
                    </button>
                </nav>
            </header>

            <main>
                {seccion === 'resumen' && <Resumen />}

                {seccion === 'productos' && <ProductosAdmin />}

                {seccion === 'formulario' && <FormulariosAdmin />}
            </main>

        </div>
    );
}

export default PanelAdmin;