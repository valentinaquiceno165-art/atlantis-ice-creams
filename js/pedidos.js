const botones = document.getElementsByClassName("btn-pedir");
const tarjetas = document.getElementsByClassName("producto-tarjeta");
const cantidades = document.getElementsByClassName("cantidad");

    for (let i = 0; i < botones.length; i++) {

        botones[i].addEventListener("click", function () {

            let mensaje = "Hola, quiero pedir\n";

            for (let i = 0; i < cantidades.length; i++) {

                const cantidad = Number(cantidades[i].textContent);

                if (cantidad > 0) {

                    const titulo = tarjetas[i].querySelector(".titulo-producto-tarjeta");

                    mensaje += cantidad + " " + titulo.textContent + "\n";

                }
            }

            const enlace = "https://wa.me/573052946125?text=" +
                encodeURIComponent(mensaje);

            window.open(enlace);

        });

    }







