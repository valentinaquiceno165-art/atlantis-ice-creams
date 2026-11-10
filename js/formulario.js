
const formulario = document.getElementById("formulario-contacto");

const mensajeFormulario = document.getElementById("mensaje-formulario");

const nombre = document.getElementById("name");
const correo = document.getElementById("email");
const mensaje = document.getElementById("message")

formulario.addEventListener("submit", function(event) {

  //evita el comportamiento predeterminado de la pagina
  event.preventDefault();

  //obtiene lo que el usuario escribe
  console.log(nombre.value);
  console.log(correo.value);
  console.log(mensaje.value);

  console.log("formulario enviado");

  mensajeFormulario.textContent = "¡Mensaje enviado correctamente!";

  //limpia despues de enviar
  formulario.reset();

});




