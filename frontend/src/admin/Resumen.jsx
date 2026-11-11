import { useState, useEffect } from 'react';

function Resumen() {

    const [productos, setProductos] = useState([]);
    const [formulario, setFormulario] = useState([]);

    useEffect(() => {

        fetch('/api/productos')
            .then(res => res.json())
            .then(datos => setProductos(datos))
            .catch(error => console.log(error));

        fetch('/api/formulario', {
            credentials: 'include'
        })
            .then(res => res.ok ? res.json() : [])
            .then(datos => setFormulario(datos))
            .catch(error => console.log(error));

    }, []);

    return (
        <section className="resumen-admin">

            <h2>Resumen general</h2>

            <div className="tarjetas-resumen">

                <article className="tarjeta-productos">
                    <span>📦</span>
                    <h3>Total de productos</h3>
                    <p>{productos.length}</p>
                </article>

                <article className="tarjeta-mensajes">
                    <span>✉️</span>
                    <h3>Total de mensajes</h3>
                    <p>{formulario.length}</p>
                </article>

            </div>

        </section>
    );
}

export default Resumen;