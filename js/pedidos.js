const botones = document.getElementsByClassName("btn-pedir");

const numero = "573052946125"


for (let i = 0; i < botones.length; i++) {
 botones[i].addEventListener("click", function(){
    const mensaje = "¡Hola!, quiero pedir " + botones[i].dataset.articulo + " " + botones[i].dataset.producto + ".";

    //sirve para q sea seguro enviar el mensaje por la web y codificarlo
    const enlace = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje);

    //sirve para abrir la pestaña del enlace
    window.open(enlace);
  }

); } 










