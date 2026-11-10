function Alerta ({mensaje, cerrar}) {
  return (
    <div className="alerta">
      <p>{mensaje}</p>
      <button onClick={cerrar}>Entendido</button>
    </div>
  )
}

export default Alerta