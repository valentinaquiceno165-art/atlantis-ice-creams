import { useState, useEffect } from 'react';

//normalizar la ruta de la imagen para que funcione en el admin
const normalizarImagen = (ruta) => {
    if (!ruta) return '';
     if (/^https?:\/\//.test(ruta) || ruta.startsWith('/')) return ruta;
    return `/${ruta}`;
}

function ProductosAdmin() {

  //variable para mostrar los productos
    const [productos, setProductos] = useState([]);

    //variable para mostrar el formulario de creación de productos
       const [mostrarFormulario, setMostrarFormulario] = useState(false);

    //variables para crear un nuevo producto
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [categoria, setCategoria] = useState('Helados');
    const [disponibilidad, setDisponibilidad] = useState(true);
    const [mensaje, setMensaje] = useState('');

    //variable para editar un producto
    const [idEditar, setIdEditar] = useState('null');

    //función para editar o crear un producto
    const editarProducto = (p) => {
       
      setIdEditar(p._id);

      setNombre(p.nombre);
      setPrecio(p.precio);
      setDescripcion(p.descripcion);
      setImagen(p.imagen);
      setCategoria(p.categoria);
      setDisponibilidad(p.disponibilidad);

      setMostrarFormulario(true);
    };

    const cargarProductos = async () => {
        try {
            const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/productos`);
            if (!respuesta.ok) throw new Error();
            const datos = await respuesta.json();
            setProductos(datos);
        } catch (error) {
            setMensaje('Error al cargar productos');
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const agregarProducto = async (e) => {

    e.preventDefault();

    try {

        const datosProducto = {
            nombre,
            precio: Number(precio),
            descripcion,
            imagen,
            categoria,
            disponibilidad
        };

        const respuesta = await fetch(
            idEditar
                ? `${import.meta.env.VITE_API_URL}/productos/${idEditar}`
                : `${import.meta.env.VITE_API_URL}/productos`,
            {
                credentials: 'include',
                method: idEditar ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosProducto)
            }
        );

        if (!respuesta.ok) {
            throw new Error();
        }

        setMensaje(
            idEditar
                ? 'Producto actualizado correctamente'
                : 'Producto agregado correctamente'
        );

        setNombre('');
        setPrecio('');
        setDescripcion('');
        setImagen('');
        setCategoria('Helados');
        setDisponibilidad(true);
        setIdEditar(null);
        setMostrarFormulario(false);

        cargarProductos();

    } catch (error) {
        setMensaje('No se pudo guardar el producto');
    }
};

  const eliminarProducto = async (id) => {

    const confirmar = window.confirm('¿Estás seguro de eliminar este producto?');
    if(!confirmar) return;

    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/productos/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (!respuesta.ok) throw new Error();

        setMensaje('Producto eliminado correctamente');
        cargarProductos();

    } catch (error) {
        setMensaje('No se pudo eliminar el producto');
    }

  }

    return (
        <section>

            <h2>Productos</h2>

            <p>Total de productos: {productos.length}</p>

            <button onClick={() => {setMostrarFormulario(!mostrarFormulario); setIdEditar(null);}}>
                {mostrarFormulario ? 'Cancelar' : 'Agregar producto'}
            </button>

            {mensaje && <p>{mensaje}</p>}

            {mostrarFormulario && (
                <form onSubmit={agregarProducto}>

                    <h3>{idEditar ? 'Editar producto' : 'Agregar producto'}</h3>

                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        maxLength="100"
                        required
                    />

                    <input
                        type="number"
                        placeholder="Precio"
                        min="0"
                        step="1"
                        value={precio}
                        onChange={e => setPrecio(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={e => setDescripcion(e.target.value)}
                        required
                    />

                    <label>Ruta de la imagen:</label>

                    <input
                        type="text"
                        placeholder="/assets/img/..."
                        value={imagen}
                        onChange={e => setImagen(e.target.value)}
                        required
                    />

                    {imagen && (
                        <img
                            src={normalizarImagen(imagen)}
                            alt="Vista previa"
                            width="150"
                            onError={e => e.currentTarget.style.display = 'none'}
                            onLoad={e => e.currentTarget.style.display = 'block'}
                        />
                    )}

                    <select
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="Helados">Helados</option>
                        <option value="Postres">Postres</option>
                        <option value="Ensalada de frutas">
                            Ensalada de frutas
                        </option>
                    </select>

                    <label>
                        <input
                            type="checkbox"
                            checked={disponibilidad}
                            onChange={e => setDisponibilidad(e.target.checked)}
                        />
                        Disponible
                    </label>

                    <button type="submit">
                        {idEditar ? 'Guardar cambios' : 'Agregar producto'}
                    </button>

                </form>
            )}

            <div className="lista-productos">

                {productos.map(p => (
                    <article key={p._id}>

                        <img src={normalizarImagen(p.imagen)} alt={p.nombre} />

                        <h3>{p.nombre}</h3>
                        <p>${p.precio}</p>
                        <p>{p.descripcion}</p>
                        <p>{p.categoria}</p>

                        <p>
                            {p.disponibilidad
                                ? 'Disponible'
                                : 'No disponible'}
                        </p>
                        <button onClick={() => editarProducto(p)}>Editar</button>
                        <button onClick={() => eliminarProducto(p._id)}>Eliminar</button>
                      </article>
                ))}

            </div>

        </section>
    );
}

export default ProductosAdmin;