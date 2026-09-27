const buscador = document.getElementById("buscador");
const tarjetas = document.getElementsByClassName("producto-tarjeta");


//filtro de busqueda en tiempo real
buscador.addEventListener("input", function() {
 //linea que permite a JS recorrer todas las tarjetas una por una
  for (let i = 0; i < tarjetas.length; i++) {

  const titulo = tarjetas[i].querySelector(".titulo-producto-tarjeta");

  //revisa si el titulo contiene lo que el usuario escribio en el buscador
  if(titulo.textContent.toLowerCase().includes(buscador.value.toLowerCase() ) ) {
    //muestra la tarjeta si coincide
    tarjetas[i].style.display = "block";
  } else {
    //no la muestra si no coincide
    tarjetas[i].style.display = "none";
  };

}
  
  

});

