const buscador = document.getElementById("buscador");
const tarjetas = document.getElementsByClassName("producto-tarjeta");


buscador.addEventListener("input", function() {

  for (let i = 0; i < tarjetas.length; i++) {

  const titulo = tarjetas[i].querySelector(".titulo-producto-tarjeta");

  if(titulo.textContent.toLowerCase().includes(buscador.value.toLowerCase() ) ) {
    tarjetas[i].style.display = "block";
  } else {
    tarjetas[i].style.display = "none";
  };

}
  
  

});

