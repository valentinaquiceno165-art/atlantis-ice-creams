const botones = document.getElementsByClassName("btn-pedir");
console.log(botones)

for (let i = 0; i < botones.length; i++) {
  botones[i].addEventListener("click", function(){
    console.log("boton presionado");
  });
}