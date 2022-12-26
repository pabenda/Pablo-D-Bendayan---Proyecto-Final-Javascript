class Category {
  constructor(id = 0, name = "Sin categoría") {
    this.id = id;
    this.name = name;
  }
}

class Product {
  constructor(id = 0, name = "Sin nombre", price = 0, category = null) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  getSubTotal(cantidad) {
    if (parseFloat(cantidad) > 0) {
      return this.price * cantidad;
    }
    return 0;
  }
}

class Order {
  constructor(product = null, quantity = 0) {
    this.product = product;
    this.quantity = quantity;
  }

  getSubTotal() {
    if (this.product != null) {
      return this.product.getSubTotal(this.quantity);
    }
    return 0;
  }
}

let obraElectricaCat = new Category(1, "Obra Eléctrica");
let obraCivilCat = new Category(2, "Obra Civil");
let mobiliarioCat = new Category(3, "Mobiliario");
let frentesCat = new Category(4, "Frente");

let modulos = [];

modulos.push(new Product(1, "Alacenas", 50000, mobiliarioCat));
modulos.push(new Product(2, "Mostrador", 32000, mobiliarioCat));
modulos.push(new Product(3, "Durlock", 150000, obraCivilCat));
modulos.push(new Product(4, "Pisos", 200000, obraCivilCat));
modulos.push(new Product(5, "Iluminación", 220000, obraElectricaCat));
modulos.push(new Product(6, "Redes", 65000, obraElectricaCat));
modulos.push(new Product(7, "Vidrios", 165000, frentesCat));
modulos.push(new Product(8, "Persiana", 300000, frentesCat));

let productsSelect = document.getElementById("selectProducts");
modulos.forEach((unProducto) => {
  let option = document.createElement("option");
  option.innerHTML = unProducto.name;
  productsSelect.appendChild(option);
});

let addButton = document.getElementById("addButton");

let cart = [];

function renderRowFooterSummary() {
  let detailsFoot = document.getElementById("detailsFoot");
  detailsFoot.innerHTML = "";
  let record = document.createElement("tr");
  const TOTAL = cart.reduce(
    (acumulador, unaOrden) => acumulador + unaOrden.getSubTotal(),
    0
  );
  record.innerHTML = `
  <td colspan="3">TOTAL</td>
  <td colspan="2">$ ${TOTAL.toFixed(2)}</td>`;
  detailsFoot.append(record);
}

function removeAllOrders() {
  let newCartCollection = [];
  localStorage.setItem("cart", JSON.stringify(newCartCollection));
  renderTableDetails(newCartCollection);
}

function removeOrder(id) {
  if (id != null) {
    let newCartCollection = cart.filter((element) => {
      return element.product.id !== id;
    });
    localStorage.setItem("cart", JSON.stringify(newCartCollection));
    renderTableDetails(newCartCollection);
  }
}

function renderRowDetail(unProducto, quantity) {
  let productDetail = document.getElementById("productDetail");
  let record = document.createElement("tr");
  record.innerHTML = `<th>${unProducto.name}</th>
    <td>${unProducto.price}</td>
    <td>${quantity}</td>
    <td>${unProducto.price * quantity}</td>
    <td>
      <button onclick="removeOrder(${
        unProducto.id
      })" type="button" class="btn btn-danger">Remover</button>
    </td>`;
  productDetail.appendChild(record);
}

function addproductToCart() {
  let selectedName = productsSelect.value;
  let selectedQuantity = parseInt(quantity.value);
  let unProducto = modulos.find((element) => {
    return element.name == selectedName;
  });
  if (unProducto !== undefined && selectedQuantity > 0) {
    let unaOrdenExistente = cart.find((e) => {
      return e.product.id == unProducto.id;
    });
    if (unaOrdenExistente !== undefined) {
      unaOrdenExistente.quantity =
        unaOrdenExistente.quantity + selectedQuantity;
    } else {
      let unaOrden = new Order(unProducto, selectedQuantity);
      cart.push(unaOrden);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderTableDetails(cart);
  }
}

addButton.addEventListener("click", () => addproductToCart());

let restoredCart = localStorage.getItem("cart");

function renderTableDetails(tempCart = []) {
  let productDetail = document.getElementById("productDetail");
  productDetail.innerHTML = "";
  cart = [];
  tempCart.forEach((element) => {
    let unProducto = new Product(
      element.product.id,
      element.product.name,
      element.product.price,
      new Category(element.product.category.id, element.product.category.name)
    );
    let unaOrden = new Order(unProducto, element.quantity);
    cart.push(unaOrden);
    renderRowDetail(unProducto, element.quantity);
  });
  renderRowFooterSummary();
}