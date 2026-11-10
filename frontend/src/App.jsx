import React, { useState } from "react"
import Navbar from "./Components/Navbar"
import Alerta from "./Components/Alerta"
import Bienvenida from "./Components/Bienvenida"
import Catalogo from "./Components/Catalogo"
import Contacto from "./Components/Contacto"
import PiePagina from "./Components/PiePagina"
import PanelAdmin from "./admin/PanelAdmin"
import Login from "./admin/Login"


function App() {

  const [busqueda, setBusqueda] = useState("");

  return (
    <>
      <Login />
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
        <aside>
          <Contacto />
        </aside>
      </section>
      <footer>
        <PiePagina />
      </footer>
    </>
  )
}

export default App
