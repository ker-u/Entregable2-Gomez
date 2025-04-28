function iniciarCompra() {
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

  let carrito = [];

  function mostrarCategorias() {
    const categorias = [...new Set(productos.map(producto => producto.categoria))];
    let lista = "Categorías disponibles:\n";
    categorias.forEach((cat, index) => {
      lista += `${index + 1}. ${cat}\n`;
    });
    alert(lista);
    return categorias;
  }

  function mostrarProductosPorCategoria(categoriaSeleccionada) {
    const productosFiltrados = productos.filter(producto => producto.categoria === categoriaSeleccionada);
    let lista = `Productos en ${categoriaSeleccionada}:\n`;
    productosFiltrados.forEach(producto => {
      lista += `${producto.id}. ${producto.nombre} - $${producto.precio}\n`;
    });
    alert(lista);
    return productosFiltrados;
  }

  function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    if (producto) {
      carrito.push(producto);
      alert(`Agregaste "${producto.nombre}" al carrito.`);
    } else {
      alert("Producto no encontrado.");
    }
  }

  function mostrarCarrito() {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    let resumen = "Tu carrito:\n";
    let total = 0;

    carrito.forEach(item => {
      resumen += `${item.nombre} - $${item.precio}\n`;
      total += item.precio;
    });

    resumen += `\nTotal a pagar: $${total}`;
    alert(resumen);
  }

  let continuar = true;

  while (continuar) {
    const categorias = mostrarCategorias();
    let seleccionCategoria = parseInt(prompt("Ingrese el número de la categoría que desea ver:")) - 1;
    
    if (seleccionCategoria >= 0 && seleccionCategoria < categorias.length) {
      let categoriaElegida = categorias[seleccionCategoria];
      const productosEnCategoria = mostrarProductosPorCategoria(categoriaElegida);
      
      let idSeleccionado = parseInt(prompt("Ingrese el número del producto que desea comprar:"));
      agregarAlCarrito(idSeleccionado);
    } else {
      alert("Categoría no válida.");
    }

    let seguir = prompt("¿Desea agregar otro producto? (si / no)").toLowerCase();
    if (seguir !== "si") {
      continuar = false;
    }
  }

  mostrarCarrito();
}