let userName = "";

const welcome = () => {
  console.log(products);
  userName = prompt("Escribe tu nombre y apellido:");
  const born = prompt("Escribe tu fecha de nacimiento (YYYY-MM-DD)");

  validation(userName, born);

  let dateBorn = new Date(born);
  let todayDate = new Date();
  let age = todayDate.getFullYear() - dateBorn.getFullYear();
  let monthDiff = todayDate.getMonth() - dateBorn.getMonth();
  let dayDiff = todayDate.getDate() - dateBorn.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  if (age < 18) {
    alert("Debes ser mayor de 18 años para usar esta aplicación.");
    return;
  }

  alert(
    `Bienvenido, ${userName}, al carrito de compras \n\n Añade los productos que deseas llevar`
  );
  let productList = products
    .map(
      (product, index) =>
        `${index + 1}_${product.name} $${product.price}`
    )
    .join("\n");

  alert("Lista de productos:\n" + productList);

  // Inicia la compra
  purchase();
};

// Regex para validar nombre y fecha de nacimiento
const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

// Funcion para validar nombre y fecha de nacimiento
const validation = (name, born) => {
  while (!name.trim() || !regexName.test(name)) {
    name = prompt("Escribe tu nombre correctamente (solo letras)");
  }

  while (!born.trim() || !dateRegex.test(born)) {
    born = prompt(
      "Escribe tu fecha de nacimiento en formato válido (YYYY-MM-DD)"
    );
  }
};

// Simulador del carrito de compras
let cart = [];

// Funcion para elegir producto y agregar al carrito
const purchase = () => {
  let adding = true;

  while (adding) {
    let item = prompt("Elige el número del producto que deseas:");
    item = parseInt(item);

    if (isNaN(item) || item < 1 || item > products.length) {
      alert("Por favor, elige un número válido.");
      continue;
    }

    const selectedProduct = products.find((product) => product.id === item);
    const quantity = parseInt(
      prompt(`¿Cuántas unidades de ${selectedProduct.name} deseas llevar?`)
    );

    if (isNaN(quantity) || quantity <= 0) {
      alert("Por favor, introduce una cantidad válida.");
      continue;
    }

    addCart(selectedProduct, quantity);

    adding = confirm("¿Deseas agregar otro producto?");
  }

  // Al terminar se hace el calculo del total
  calculateTotal();
};

// Funcion para agregar el producto al carrito
const addCart = (product, quantity) => {
  const productInCart = cart.find((item) => item.id === product.id);

  if (productInCart) {
    productInCart.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  console.log(`Has agregado ${quantity} unidades de ${product.name} al carrito.`);
  console.log("Carrito actual:", cart);
};

// IVA
const iva = 0.22;

// Funcion para calcular el costo final y mostrar productos seleccionados
const calculateTotal = () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let cartDetails = cart
    .map(
      (item) =>
        `${item.name} - Cantidad: ${item.quantity}, Precio: $${(
          item.price * item.quantity
        ).toFixed(2)}`
    )
    .join("\n");

  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const totalWithTax = total * (1 + iva);

  let confirmPurchase = confirm(
    `Productos seleccionados:\n${cartDetails}\n\nTotal con IVA: $${totalWithTax.toFixed(
      2
    )}\n\n¿Deseas confirmar la compra?`
  );

  if (confirmPurchase) {
    alert(
      `¡Gracias, ${userName}! Has comprado:\n${cartDetails}\n\nTotal: $${totalWithTax.toFixed(
        2
      )}\n\nTu compra se ha realizado correctamente. ¡Gracias por tu preferencia!`
    );

    // Vuelve al inicio
    cart = []; // Vacíar el carrito
    welcome(); // Vuelve al inicio de la app
  } else {
    alert("Has cancelado la compra.");
    cart = []; // Vacíar el carrito
    welcome(); // Vuelve al inicio de la app
  }

  console.log(`Total sin IVA: $${total.toFixed(2)}, Total con IVA: $${totalWithTax.toFixed(2)}`);
};
