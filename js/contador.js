const botonesmas = document.getElementsByClassName("mas");
const botonesmenos = document.getElementsByClassName("menos");
const cantidades = document.getElementsByClassName("cantidad");

console.log(botonesmas.length);
console.log(botonesmenos.length);

for (let i = 0; i < botonesmas.length; i++) {

  botonesmas[i].addEventListener("click", function () {

    let cantidad = Number(cantidades[i].textContent);
    cantidad++;

    cantidades[i].textContent = cantidad;

  });
}