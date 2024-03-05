var carrito = [];

function inicializarCarrito(datos) {
    carrito = datos.map(producto => ({
        codArticulo: producto.codArticulo,
        nombre: producto.nombre,
        precio: producto.PVP,
        cantidadDisponible: producto.cantidad,
        cantidadEnCarrito: 0
    }));
}

function agregarAlCarrito(codArticulo) {
    var producto = null;

    for (var i = 0; i < carrito.length; i++) {
        if (codArticulo == carrito[i].codArticulo) {
            producto = carrito[i];
            break;
        }
    }

    if (producto) {
        if (producto.cantidadDisponible > 0 && producto.cantidadEnCarrito < producto.cantidadDisponible) {
            producto.cantidadEnCarrito++;
            console.log('Producto agregado al carrito:', producto);
            actualizarCarrito();
        } else {
            alert('Producto agotado');
        }
    } else {
        alert('Producto no encontrado');
    }
}

function actualizarCarrito() {
    var cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidadEnCarrito, 0);
    $('#carrito-cantidad').text(cantidadTotal);
    mostrarContenidoCarrito();
}

function mostrarContenidoCarrito() {
    var carritoContenido = $('#carrito-contenido');
    carritoContenido.empty();

    var productosEnCarrito = carrito.filter(producto => producto.cantidadEnCarrito > 0);

    if (productosEnCarrito.length === 0) {
        carritoContenido.append('<p>Tu carrito está vacío.</p>');
    } else {
        productosEnCarrito.forEach(producto => {
            carritoContenido.append(`<p>${producto.nombre} - Cantidad: ${producto.cantidadEnCarrito}</p>`);
        });
    }
}

$(document).ready(function () {
    $('#carrito-icon-container').on('click', function () {
        mostrarContenidoCarrito();
    });
});
