const botones = document.getElementsByClassName("btn-pedir");

const numero = "573052946125"


for (let i = 0; i < botones.length; i++) {
  botones[i].addEventListener("click", function(){
    const mensaje = "¡Hola!, quiero pedir " + botones[i].dataset.articulo + " " + botones[i].dataset.producto + "."

    const enlace = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje)

    window.open(enlace)
  }

)} 









