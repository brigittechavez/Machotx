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
