const botonesmas = document.getElementsByClassName("mas");
const botonesmenos = document.getElementsByClassName("menos");
const cantidades = document.getElementsByClassName("cantidad");

console.log(botonesmas.length);
console.log(botonesmenos.length);

for (let i = 0; i < botonesmas.length; i++) {


  botonesmas[i].addEventListener("click", function () {

    //sumar cantidad
    let cantidad = Number(cantidades[i].textContent);
    cantidad++;

    cantidades[i].textContent = cantidad;

});
}


for (let i = 0; i < botonesmenos.length; i++) {

  botonesmenos[i].addEventListener("click", function () {

    //restar cantidad
    let cantidad = Number(cantidades[i].textContent);
    cantidad--;
    
    //establece el limite de resta del contador (que no de numeros negativos)
    cantidad = Math.max(0, cantidad);

    //que muestre la cantidad en el contador
    cantidades[i].textContent = cantidad;
  
});
}


