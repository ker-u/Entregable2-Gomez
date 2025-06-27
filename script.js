const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let usdToArs = 1200; // valor inicial

async function obtenerCotizacionUSD() {
  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=ARS");
    const data = await res.json();
    usdToArs = data.rates.ARS || usdToArs;
    console.log(`Cotización actualizada: 1 USD = ${usdToArs} ARS`);
  } catch (error) {
    console.warn("No se pudo obtener la cotización actual, se usará la tasa por defecto.", error);
  }
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
  const carritoLista = document.getElementById("carrito-lista");
  const totalElemento = document.getElementById("total");
  const tituloCarrito = document.getElementById("titulo-carrito");
  const contenedorTotal = document.getElementById("contenedor-total");

  carritoLista.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    tituloCarrito.classList.add("d-none");
    totalElemento.textContent = "";
    contenedorTotal.classList.add("d-none");
    return;
  }

  tituloCarrito.classList.remove("d-none");
  contenedorTotal.classList.remove("d-none");

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.innerHTML = `
      ${item.nombre} - $${item.precio} ARS
      <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    carritoLista.appendChild(li);
    total += item.precio;
  });

  totalElemento.textContent = `Total: $${total} ARS`;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  mostrarCarrito();
}

async function buscarLibrosPorTema(tema) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "<p>Cargando libros...</p>";

  await obtenerCotizacionUSD();

  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(tema)}&maxResults=20`);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron libros para esta categoría.</p>";
      return;
    }

    const librosConPrecio = data.items.filter(
      libro =>
        libro.saleInfo &&
        libro.saleInfo.saleability === "FOR_SALE" &&
        libro.saleInfo.retailPrice &&
        libro.saleInfo.retailPrice.amount
    );

    if (librosConPrecio.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron libros a la venta en esta categoría.</p>";
      return;
    }

    contenedor.innerHTML = `<h3>Libros en tema: ${tema}</h3>`;

    librosConPrecio.forEach(libro => {
      const info = libro.volumeInfo;
      const titulo = info.title;
      const autor = info.authors ? info.authors.join(", ") : "Autor desconocido";
      const imagen = info.imageLinks ? info.imageLinks.thumbnail : "";

      const precioUSD = libro.saleInfo.retailPrice.amount;
      const precioARS = Math.round(precioUSD * usdToArs);

      const producto = {
        nombre: titulo,
        precio: precioARS,
        categoria: tema
      };

      const div = document.createElement("div");
      div.classList.add("border", "rounded", "p-3", "mb-3");

      div.innerHTML = `
        <strong>${titulo}</strong><br>
        Autor: ${autor}<br>
        Precio: $${precioARS} ARS<br>
        ${imagen ? `<img src="${imagen}" alt="Portada" class="mt-2 mb-2" style="max-width:100px;">` : ""}
      `;

      const btn = document.createElement("button");
      btn.classList.add("btn", "btn-primary", "mt-2");
      btn.textContent = "Agregar al carrito";
      btn.addEventListener("click", () => {
        carrito.push(producto);
        guardarCarrito();
        mostrarCarrito();

        Toastify({
          text: `✅ Se agregó el libro al carrito`,
          duration: 2400,
          gravity: "top",
          position: "right",
          backgroundColor: "#eae7c4",
          close: false,
          style: {
            color: "#2e4372",
            padding: "12px",
            border: "double #2e4372 12px"
          }
        }).showToast();
      });

      div.appendChild(btn);
      contenedor.appendChild(div);
    });
  } catch (error) {
    contenedor.innerHTML = `<p>Error al cargar libros: ${error.message}</p>`;
  }
}

function mostrarCategorias() {
  const categoriasUnicas = ["Ciencia", "Literatura", "Autoayuda", "Infantiles"];
  const div = document.getElementById("categorias");
  div.innerHTML = "<h3>Selecciona un tema:</h3>";

  categoriasUnicas.forEach(cat => {
    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-secondary", "m-1");
    btn.textContent = cat;
    btn.addEventListener("click", () => buscarLibrosPorTema(cat));
    div.appendChild(btn);
  });
}

document.getElementById("verProductos").addEventListener("click", () => {
  const btn = document.getElementById("verProductos");
  const categoriasDiv = document.getElementById("categorias");
  const productosDiv = document.getElementById("productos");
  const contenedorTotal = document.getElementById("contenedor-total");
  const bloqueCarrito = document.getElementById("bloque-carrito");

  const estaVisible = !categoriasDiv.classList.contains("d-none");

  if (estaVisible) {
    categoriasDiv.classList.add("d-none");
    productosDiv.classList.add("d-none");
    contenedorTotal.classList.add("d-none");
    bloqueCarrito.classList.add("d-none");
    btn.textContent = "Mostrar Carrito";
  } else {
    categoriasDiv.classList.remove("d-none");
    mostrarCategorias();
    mostrarCarrito();
    bloqueCarrito.classList.remove("d-none");
    btn.textContent = "Ocultar Carrito";
  }
});

function mostrarCategorias() {
  const categoriasUnicas = ["Ciencia", "Literatura", "Arte de anime", "Historia", "Autoayuda", "Infantiles"];
  const div = document.getElementById("categorias");
  div.innerHTML = "<h3>Selecciona un tema:</h3>";

  categoriasUnicas.forEach(cat => {
    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-secondary", "m-1");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      buscarLibrosPorTema(cat);
      document.getElementById("productos").classList.remove("d-none");
    });
    div.appendChild(btn);
  });
}