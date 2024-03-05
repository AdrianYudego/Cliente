var carrito = [];

function inicializarCarrito(datos) {
    carrito = datos.map(producto => ({
        codArticulo: producto.codArticulo,
        nombre: producto.nombre,
        PVP: producto.PVP,
        IVA: producto.IVA,
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
   
}

function mostrarContenidoCarrito() {
    var carritoContenido = $('#carrito-contenido');
    carritoContenido.empty();

    var productosEnCarrito = carrito.filter(producto => producto.cantidadEnCarrito > 0);

    if (productosEnCarrito.length === 0) {
        carritoContenido.append('<p>Tu carrito está vacío.</p>');
    } else {
        productosEnCarrito.forEach(producto => {
            var PVP = parseFloat(producto.PVP);
            var IVA = (producto.IVA);
            var cantidadEnCarrito = (producto.cantidadEnCarrito);
                var precio = (PVP + (PVP * IVA)) * cantidadEnCarrito;
            carritoContenido.append(`<p>${producto.nombre} - Cantidad: ${producto.cantidadEnCarrito}- Precio: ${precio}</p>`);
        });
    }
}


$(document).ready(function () {
    $('#carrito-icon-container').on('click', function () {
        mostrarContenidoCarrito();
    });
});
