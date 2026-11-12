import { useState, useEffect } from 'react';
import TarjetaProducto from './TarjetaProducto';
import Alerta from './Alerta';

function Catalogo({ busqueda = "" }) {

  // Creamos un solo estado para guardar TODOS los productos de la base de datos
  const [productos, setProductos] = useState([]);

  // Traemos los productos de la base de datos cuando la página se carga por primera vez
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/productos`)  
      .then(res => res.json())
      .then(datos => setProductos(datos));
  }, []);

  // Filtrar los productos por nombre
  const productosFiltrados = productos.filter((producto) => 
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  
  // filtrar los productos por su categoría
  const postres = productosFiltrados.filter(p => p.categoria === 'Postres');
  const helados = productosFiltrados.filter(p => p.categoria === 'Helados');
  const ensaladas = productosFiltrados.filter(p => p.categoria === 'Ensalada de frutas');

   //actualizar la cantidad en tiempo real del pedido
  const [pedido, setPedido] = useState({});
  
  const actualizarCantidad = (nombre, cantidad) => {
    setPedido(pedidoAnterior => ({ ...pedidoAnterior, [nombre]: cantidad }));
  };

  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  
  const enviarPedido = () => {

    // Verificar si hay productos en el pedido
    if (Object.keys(pedido).length === 0 || Object.values(pedido).every(cantidad => cantidad === 0)) {
      setMostrarAlerta(true);
      return;
    }

    let mensaje = "Hola, quiero realizar este pedido:\n";
    for (let nombre in pedido) {
      if (pedido[nombre] > 0) {
        mensaje += pedido[nombre] + " " + nombre + "\n";
      }
    }
    window.open("https://wa.me/573052946125?text=" + encodeURIComponent(mensaje));
  }
  
  return (
    <section id="catalogo" className="catalogo">
      <h2 className="catalogo-titulo">Nuestro menú</h2>

      {/* SECCIÓN POSTRES */}
      {/* Si no hay postres, no se muestra la sección */}
      {postres.length > 0 && (
        <section id="postres">
          <h2 className="titulo-seccion">POSTRES</h2>
          {postres.filter(p => p.disponibilidad === true).map(p => (
            <TarjetaProducto
              key={p._id}
              nombre={p.nombre}
              precio={p.precio}
              imagen={p.imagen}
              descripcion={p.descripcion}
              onCantidadChange={actualizarCantidad} />
          ))}
        </section>
      )}

      {/* SECCIÓN HELADOS */}
      {helados.length > 0 && (
        <section id="helados">
          <h2 className="titulo-seccion">HELADOS</h2>
          {helados.filter(p => p.disponibilidad === true).map(p => (
            <TarjetaProducto
              key={p._id}
              nombre={p.nombre}
              precio={p.precio}
              imagen={p.imagen}
              descripcion={p.descripcion}
              onCantidadChange={actualizarCantidad} />
          ))}
        </section>
      )}

      {/* SECCIÓN ENSALADAS */}
      {ensaladas.length > 0 && (
        <section id="ensalada-de-frutas">
          <h2 className="titulo-seccion">ENSALADA DE FRUTAS</h2>
          {ensaladas.filter(p => p.disponibilidad === true).map(p => (
            <TarjetaProducto
              key={p._id}
              nombre={p.nombre}
              precio={p.precio}
              imagen={p.imagen}
              descripcion={p.descripcion}
              onCantidadChange={actualizarCantidad} />
          ))}
        </section>
      )}

      <div className="text-btn">
        <p>¿Terminaste de elegir? ¡Puedes pedir por WhatsApp!</p>
      </div>

      <div className="btn-pedir-contenedor">
        <button className="btn-pedir" onClick={enviarPedido}>Pedir por WhatsApp</button>
      </div>

      {mostrarAlerta && 
      (<Alerta mensaje="¡Agrega productos al pedido primero!" cerrar={() => setMostrarAlerta(false)} />)}

    </section>
  );

}
export default Catalogo;
