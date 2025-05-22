const productos = [
  // Ciencias
  { id: 1, nombre: "Breves respuestas a las grandes preguntas", precio: 4499, categoria: "Ciencias" },
  { id: 2, nombre: "El gen egoísta", precio: 5199, categoria: "Ciencias" },
  { id: 3, nombre: "Cosmos", precio: 4799, categoria: "Ciencias" },
  { id: 4, nombre: "Una breve historia de casi todo", precio: 4999, categoria: "Ciencias" },

  // Literatura
  { id: 5, nombre: "Cien años de soledad", precio: 4199, categoria: "Literatura" },
  { id: 6, nombre: "1984", precio: 3899, categoria: "Literatura" },
  { id: 7, nombre: "Don Quijote de la Mancha", precio: 5599, categoria: "Literatura" },
  { id: 8, nombre: "Orgullo y prejuicio", precio: 3699, categoria: "Literatura" },

  // Autoayuda
  { id: 9, nombre: "Los 7 hábitos de la gente altamente efectiva", precio: 4599, categoria: "Autoayuda" },
  { id: 10, nombre: "Cómo ganar amigos e influir sobre las personas", precio: 4299, categoria: "Autoayuda" },
  { id: 11, nombre: "El poder del ahora", precio: 5999, categoria: "Autoayuda" },
  { id: 12, nombre: "Piense y hágase rico", precio: 4499, categoria: "Autoayuda" },

  // Mangas y Comics
  { id: 13, nombre: "One Piece Vol. 1", precio: 5899, categoria: "Mangas y Comics" },
  { id: 14, nombre: "Batman: Año Uno", precio: 2999, categoria: "Mangas y Comics" },
  { id: 15, nombre: "Spider-Man: Blue", precio: 3099, categoria: "Mangas y Comics" },

  // Infantiles
  { id: 16, nombre: "El principito", precio: 3499, categoria: "Infantiles" },
  { id: 17, nombre: "Cuentos de buenas noches para niñas rebeldes", precio: 3799, categoria: "Infantiles" },
  { id: 18, nombre: "Harry Potter y la piedra filosofal", precio: 4499, categoria: "Infantiles" },
  { id: 19, nombre: "Matilda", precio: 3599, categoria: "Infantiles" }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
  const carritoLista = document.getElementById("carrito-lista");
  const totalElemento = document.getElementById("total");
  const tituloCarrito = document.getElementById("titulo-carrito");

  carritoLista.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    tituloCarrito.classList.add("d-none");
    totalElemento.textContent = "";
    return;
  }

  tituloCarrito.classList.remove("d-none");

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.innerHTML = `
      ${item.nombre} - $${item.precio}
      <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    carritoLista.appendChild(li);
    total += item.precio;
  });

  totalElemento.textContent = `Total: $${total}`;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  mostrarCarrito();
}

function mostrarCategorias() {
  const categoriasUnicas = [...new Set(productos.map(p => p.categoria))];
  const div = document.getElementById("categorias");
  div.innerHTML = "<h3>Selecciona una categoría:</h3>";

  categoriasUnicas.forEach(cat => {
    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-secondary", "m-1");
    btn.textContent = cat;
    btn.addEventListener("click", () => mostrarProductosPorCategoria(cat));
    div.appendChild(btn);
  });
}

function mostrarProductosPorCategoria(categoria) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = `<h3>Productos en ${categoria}</h3>`;

  const filtrados = productos.filter(p => p.categoria === categoria);

  filtrados.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("border", "rounded", "p-2", "mb-2");
    div.innerHTML = `<strong>${producto.nombre}</strong><br>Precio: $${producto.precio}<br>`;

    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-primary", "mt-2");
    btn.textContent = "Agregar al carrito";
    btn.addEventListener("click", () => {
      carrito.push(producto);
      guardarCarrito();
      mostrarCarrito();
    });

    div.appendChild(btn);
    contenedor.appendChild(div);
  });
}

document.getElementById("verProductos").addEventListener("click", () => {
  mostrarCategorias();
  mostrarCarrito();
});