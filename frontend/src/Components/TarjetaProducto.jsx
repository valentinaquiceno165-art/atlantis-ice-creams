import { useState } from 'react';

function TarjetaProducto({ nombre, precio, descripcion, imagen, onCantidadChange }) {
  const [cantidad, setCantidad] = useState(0);

  // Formateamos el precio como pesos colombianos
  const precioFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(precio);

  const aumentar = () => {
    const nuevaCantidad = cantidad + 1;

    setCantidad(nuevaCantidad);
    onCantidadChange(nombre, nuevaCantidad);
  }


  const disminuir = () => {
    if (cantidad > 0) {
      const nuevaCantidad = cantidad - 1;
      setCantidad(nuevaCantidad);
      onCantidadChange(nombre, nuevaCantidad);
    } 
  }

  return (
    <article className='producto-tarjeta'>
      <h3 className='titulo-producto-tarjeta'>{nombre}</h3>
            <img className="imagen-catalogo" src={imagen && imagen.startsWith('/') ? imagen : `/${imagen}`} alt={nombre} />
      <p className='contenido-tarjeta'>{descripcion}</p>
      <p className='precio'>{precioFormateado}</p>


      <div className='caja-seccion'>
        <button className='menos' onClick={disminuir}>-</button>
        <span className='cantidad'>{cantidad}</span>
        <button className='mas' onClick={aumentar}>+</button>

      </div>
    </article>
  )
}
export default TarjetaProducto;
