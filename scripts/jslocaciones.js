function funcionLocaciones() {
  let x = document.getElementById("localOStand").value;
  document.getElementById("mensaje1").innerHTML = "Usted ingresó  " + x;

  let localesDisponibles = [01, 03, 10, 22, 55, 102];

  let opcionElegida = document.getElementById("localOStand").value;
  const HOY = new Date();

  if (opcionElegida.toLowerCase() == "local") {
    console.log("opción local");
    document.getElementById("disponible1").innerText = "Los locales disponibles al día  " + HOY.toLocaleDateString() + " son   " + localesDisponibles;

    document.querySelector(".botonContinuar1").addEventListener("click", e => {
      /*const newElement = document.createElement("input");
      document.querySelector(".container1").appendChild(newElement);*/
      document.getElementById("localOStand").style.display = 'none';
      document.getElementById("botonEnviar1").style.display = 'none';
      document.getElementById("p1").style.display = 'none';
      document.querySelector(".botonContinuar1").remove();
    });

  } else {
    if (opcionElegida.toLowerCase() == "stand") {
      console.log("opción stand");
      document.getElementById("disponible1").innerText = "No hay stands disponibles. Gracias por visitar nuestra web!";
    } else {
      document.getElementById("disponible1").innerText = "No ingresó una respuesta válida";
    }
  }
}

let valm2 = document.getElementById("consultaMetrosLocal").value;
function funcionMetros() {
  let valm2 = document.getElementById("consultaMetrosLocal").value;
  document.getElementById("Opcion2").innerHTML = "Usted ingresó  " + valm2 + "  metros de superficie para el local";

  class LocalesD {
    constructor(numero, metros) {
      this.numero = numero;
      this.metros = metros;
    }
  }

  let metrajeLocales = [];
  metrajeLocales.push(new LocalesD(" 1", "60"));
  metrajeLocales.push(new LocalesD(" 3", "70"));
  metrajeLocales.push(new LocalesD(" 10", "30"));
  metrajeLocales.push(new LocalesD(" 22", "600"));
  metrajeLocales.push(new LocalesD(" 55", "200"));
  metrajeLocales.push(new LocalesD(" 102", "80"));
  console.log(metrajeLocales);

  let isExist = metrajeLocales.some((unLocal) => {
    return unLocal.metros.includes(valm2);
  });
  if (isExist) {
    document.getElementById("disponible2").innerText = "--> Existe al menos un local con ese metraje!";
  } else {
    document.getElementById("disponible2").innerText = "--> No hay locales con ese metraje";
  }

  document.querySelector(".botonContinuar2").addEventListener("click", e => {
    /*const newElement = document.createElement("input");
    document.querySelector(".container1").appendChild(newElement);*/
    document.getElementById("p2").style.display = 'none';
    document.getElementById("consultaMetrosLocal").style.display = 'none';
    document.getElementById("botonEnviar2").style.display = 'none';
    document.querySelector(".botonContinuar2").remove();
  });

}

function funcionPlazo() {
  let valM2 = document.getElementById("consultaMetrosLocal").value;
  document.getElementById("Opcion2").innerHTML = "Usted ingresó  " + valm2 + "  metros";

  let costoM2 = 2000;
  let ajusteAnual = 1.5;
  function AJUSTAR(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
  }

  let m2Solicitados = document.getElementById("consultaMetrosLocal").value;
  document.getElementById("disponible3").innerHTML = "Usted ingreso que pretende  " + document.getElementById("plazoContratoCalculo").value + "  años de contrato de locación"
  let plazoContrato = document.getElementById("plazoContratoCalculo").value;

  for (let indexLocal = 1; indexLocal <= plazoContrato; indexLocal++) {
    console.log("El costo anual por alquiler del año " + indexLocal.toString() + " es de pesos " + (costoM2 * m2Solicitados * 12).toString());
    costoM2 = AJUSTAR(costoM2, ajusteAnual);
  }

  document.querySelector(".botonContinuar3").addEventListener("click", e => {
    /*const newElement = document.createElement("input");
    document.querySelector(".container1").appendChild(newElement);*/
    document.getElementById("p3").style.display = 'none';
    document.getElementById("plazoContratoCalculo").style.display = 'none';
    document.getElementById("botonEnviar3").style.display = 'none';
    document.querySelector(".botonContinuar3").remove();
  });

}


