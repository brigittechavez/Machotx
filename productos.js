const listaFiltro = document.querySelectorAll('#myTab a')
listaFiltro.forEach(listado => {
  const lista = new bootstrap.Tab(listado) //controla que contenido mostrar y ocultar

  listado.addEventListener('click', event => {
    event.preventDefault()
    lista.show() //mostrar productos
  })
})

const filtros = document.querySelectorAll('#myList a'); //seleciona todos lo a del HTML
const productos = document.querySelectorAll('.card-producto'); //seleciona todas las cards

filtros.forEach(filtro => {
  filtro.addEventListener('click', function (e) {
    e.preventDefault();
    //filtro
    filtros.forEach(f => f.classList.remove('active')); // mostrar filtro activo
    this.classList.add('active');

    //producto
    const categoria = this.getAttribute('data-categoria'); // guardar categorias

    productos.forEach(producto => {
      const categoriaProducto = producto.getAttribute('data-categoria'); //seleccionar categoria
      
      if (categoria === 'todos' || categoria === categoriaProducto) {
        producto.style.display = 'block'; //se muestra
      } else {
        producto.style.display = 'none'; //no se muestra
      }
    });
  });
});

let carrito = [];

document.querySelectorAll('.boton-carrito').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.card-producto');
        const nombre = card.querySelector('.titulo-producto').innerText;
        const precio = card.querySelector('.precio-producto').innerText;
        const imagen = card.querySelector('.imagen-producto').src;

        const producto = { nombre, precio, imagen };
        carrito.push(producto);
        actualizarCarrito();
    });
});

function actualizarCarrito() {
    const cantidad = document.getElementById('cantidad-carrito');
    cantidad.textContent = carrito.length;

    const contenedor = document.getElementById('contenido-carrito');
    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="text-muted">El carrito está vacío.</p>';
        return;
    }

    carrito.forEach((item, index) => {
        contenedor.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                <div>
                    <strong>${item.nombre}</strong><br>
                    <small>${item.precio}</small>
                </div>
                <img src="${item.imagen}" alt="${item.nombre}" width="50">
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${index})">🗑️</button>
            </div>
        `;
    });
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
});

document.getElementById('ver-carrito').addEventListener('click', () => {
    const modal = new bootstrap.Modal(document.getElementById('modalCarrito'));
    modal.show();
});

