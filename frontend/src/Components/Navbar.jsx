function Navbar({ busqueda, setBusqueda }) {
  return (
    <section className="nav-barra">
      <nav className="navegacion">
        <a href="#inicio" className="logo">Atlantis' Ice Creams</a>

        <input type="text" id="buscador" placeholder="Buscar producto..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />

        <ul>
          <li>
            <a className="nav-enlace" href="#inicio">Inicio</a>
          </li>

          <li>
            <a className="nav-enlace" href="#catalogo">Catálogo</a>
          </li>
          <li>
            <a className="nav-enlace" href="#contacto">Contacto</a>
          </li>
        </ul>
      </nav>

    </section>
  )
}
export default Navbar