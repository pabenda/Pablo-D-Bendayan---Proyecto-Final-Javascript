let showSearchingBrands = document.getElementById("showSearchingBrands");

function renderUserDetail(user) {
  let productDetail = document.getElementById("usersTableBody");
  let record = document.createElement("tr");
  record.innerHTML = `<td>${user.marca}</td>
      <td>${user.rubro}</td>
      <td>${user.mail}</td>
      <td>${user.pais}</td>`;
  productDetail.appendChild(record);
}

function renderUsersTableDetails(users = []) {
  let usersTableBody = document.getElementById("usersTableBody");
  usersTableBody.innerHTML = "";
  users.forEach((element) => {
    setTimeout(() => {
      renderUserDetail(element);
    }, 2000);
  });
}

fetch('/scripts/marcas.json')
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    showSearchingBrands.style.display = "block";

    renderUsersTableDetails(json);

    showSearchingBrands.style.display = "none";
  });


function funcionLocaciones() {
  let x = document.getElementById("localOStand").value;
  let btnLocales = document.getElementById("botonEnviar1");
  btnLocales.addEventListener('click', () => {
    Toastify({
      text: "Enviado",
      duration: 2000,
      position: 'left',
      gravity: 'top',
    }).showToast();
  });

  document.getElementById("mensaje1").innerHTML = "Usted ingresó  " + x;


  let localesDisponibles = [01, 03, 10, 22, 55, 102];

  let opcionElegida = document.getElementById("localOStand").value;
  const HOY = new Date();

  if (opcionElegida.toLowerCase() == "local") {
    console.log("opción local");

    setTimeout(() => {
      document.getElementById("disponible1").innerText = "Los locales disponibles al día  " + HOY.toLocaleDateString() + " son   " + localesDisponibles;
    }, 2000);

    document.querySelector(".botonContinuar1").addEventListener("click", e => {
      document.getElementById("localOStand").style.display = 'none';
      document.getElementById("botonEnviar1").style.display = 'none';
      document.getElementById("p1").style.display = 'none';
      document.querySelector(".botonContinuar1").remove();
    });

  } else {
    opcionElegida.toLowerCase() == "stand" ? document.getElementById("disponible1").innerText = "No hay stands disponibles. Gracias por visitar nuestra web!" : document.getElementById("disponible1").innerText = "No ingresó una respuesta válida";
  }
}

let valm2 = document.getElementById("consultaMetrosLocal").value;
function funcionMetros() {
  let valm2 = document.getElementById("consultaMetrosLocal").value;
  document.getElementById("Opcion2").innerHTML = "Usted ingresó  " + valm2.toString() + "  metros de superficie para el local";

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
    setTimeout(() => {
      document.getElementById("disponible2").innerText = "--> Existe al menos un local con ese metraje!";
    }, 2000);

    let flag = true;
    const localDisponible = (flag) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (flag === true) {
            resolve("promesa resuelta");
          } else {
            reject("promesa rechazada");
          }
        }, 3000);
      })
    }

    localDisponible(true).then((response) => {
      console.log(response);
    });

  } else {
    setTimeout(() => {
      document.getElementById("disponible2").innerText = "--> No hay locales con ese metraje";
    }, 2000);

    let flag = false;
    const localDisponible = (flag) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (flag === true) {
            resolve("promesa resuelta");
          } else {
            reject("promesa rechazada");
          }
        }, 3000);
      })
    }

    localDisponible(false).catch((response) => {
      console.error(response);
    });

  }

  document.querySelector(".botonContinuar2").addEventListener("click", e => {
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
    costoM2 = AJUSTAR(costoM2, ajusteAnual);
  }

  document.querySelector(".botonContinuar3").addEventListener("click", e => {
    document.getElementById("p3").style.display = 'none';
    document.getElementById("plazoContratoCalculo").style.display = 'none';
    document.getElementById("botonEnviar3").style.display = 'none';
    document.querySelector(".botonContinuar3").remove();
  });

}

function genera_tabla() {

  let metros = parseInt(document.getElementById("consultaMetrosLocal").value);
  let plazo = parseInt(document.getElementById("plazoContratoCalculo").value);

  let alquileres = new Array(document.getElementById("plazoContratoCalculo").value)

  let costoM2 = 2000;

  for (let i = 0; i < plazo; i++) {
    alquileres[i] = { anio: i + 1, alquiler: costoM2 * metros * plazo };
    let ajusteAnual = 1.5;
    costoM2 = costoM2 * ajusteAnual;
  }

  let tablaAlquileres = document.getElementById("alquilerT");
  let cuerpoTabla = document.createElement("tbody");

  alquileres.forEach(p => {
    let fila = document.createElement("tr");

    let td = document.createElement("td");
    td.innerText = p.anio;
    fila.appendChild(td);

    td = document.createElement("td")
    td.innerText = p.alquiler;
    fila.appendChild(td);

    cuerpoTabla.appendChild(fila)
  })

  tablaAlquileres.appendChild(cuerpoTabla);

  setTimeout(() => {
    swal("Gracias por su visita!", "Para más info contactar comercial@deshoppings.com.ar", "success");
  }, 3000);

}

const cargarDatos = async () => {
  const url = "./scripts/normas.json";
  const res = await fetch(url);
  const datos = await res.json();
  console.log(datos);
};
cargarDatos();