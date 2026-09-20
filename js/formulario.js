const formulario = document.getElementById("formulario-contacto");
console.log(formulario);

const mensajeFormulario = document.getElementById("mensaje-formulario");

const nombre = document.getElementById("name");
const correo = document.getElementById("email");
const mensaje = document.getElementById("message")

formulario.addEventListener("submit", function(event){

  event.preventDefault()

  console.log(nombre.value);
  console.log(correo.value);
  console.log(mensaje.value);

  console.log("formulario enviado");

  mensajeFormulario.textContent = "¡Mensaje enviado correctamente!";

  formulario.reset();

});




