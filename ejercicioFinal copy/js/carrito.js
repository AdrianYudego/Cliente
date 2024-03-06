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
            var cantidadTotal = carrito.reduce((total, p) => total + p.cantidadEnCarrito, 0);
            $('#carrito-cantidad').text(cantidadTotal);
        } else {
            alert('Producto agotado');
        }
    } else {
        alert('Producto no encontrado');
    }
}

function eliminar(codArticulo) {
    var producto = null;
    for (var i = 0; i < carrito.length; i++) {
        if (codArticulo == carrito[i].codArticulo) {
            producto = carrito[i];
            break;
        }
    }

    if (producto && producto.cantidadEnCarrito > 0) {
        producto.cantidadEnCarrito--;
        var cantidadTotal = carrito.reduce((total, p) => total + p.cantidadEnCarrito, 0);
        $('#carrito-cantidad').text(cantidadTotal);
    }
}

function mostrarContenidoCarrito() {
    var carritoContenido = $('#carrito-contenido');

    var productosEnCarrito = carrito.filter(producto => producto.cantidadEnCarrito > 0);

    if (productosEnCarrito.length === 0) {
        carritoContenido.html('<p>Tu carrito está vacío.</p>');
    } else {
        carritoContenido.empty();
        productosEnCarrito.forEach(producto => {
            var PVP = parseFloat(producto.PVP);
            var IVA = (producto.IVA);
            var cantidadEnCarrito = (producto.cantidadEnCarrito);
            var precio = (PVP + (PVP * IVA)) * cantidadEnCarrito;
            carritoContenido.append(`<p>${producto.nombre} - Cantidad: ${producto.cantidadEnCarrito}- Precio: ${precio} <button type="button" onclick="eliminar(${producto.codArticulo})">Quitar</button></p>`);
        });
    }

    // Asegúrate de actualizar el carrito después de modificar el contenido
    actualizarCarrito();
}

function eliminar(codArticulo) {
    var producto = null;
    for (var i = 0; i < carrito.length; i++) {
        if (codArticulo == carrito[i].codArticulo) {
            producto = carrito[i];
            break;
        }
    }
    if (producto && producto.cantidadEnCarrito > 0) {
        producto.cantidadEnCarrito--;
        var cantidadTotal = carrito.reduce((total, p) => total + p.cantidadEnCarrito, 0);
        $('#carrito-cantidad').text(cantidadTotal);

    
        mostrarContenidoCarrito();
    }
}


$(document).ready(function () {
    $('#carrito-icon-container').on('click', function () {
        mostrarContenidoCarrito();
    });
});

function obtenerDatos() {
    $.ajax({
        url: 'obtener_datos.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            inicializarCarrito(data);

            var productosContainer = $('#productos-container');

            data.forEach(function (producto) {
                var productoHtml = `
                    <div class="col mb-5">
                        <div class="card h-100">
                            <img class="card-img-top" src="${producto.imagen}" alt="${producto.imagen}" />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">${producto.nombre}</h5>
                                    ${producto.PVP}
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center">
                                    <a class="btn btn-outline-dark mt-auto" onclick="agregarAlCarrito(${producto.codArticulo})">Añadir al carrito</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                productosContainer.append(productoHtml);
            });
        },
    });
}

function login() {
    var dni = $('#dni').val();
    $.ajax({
        url: 'usuario.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var logeo = $('#logeo');
            var contLogeo;

            for (var i = 0; i < data.length; i++) {
                if (data[i].DNI == dni) {
                    contLogeo = "Bienvenido " + data[i].nombre;
                    Cookies.set('dni', dni);
                    logeo.empty().append(contLogeo);
                    $('#login-modal').modal('hide');
                    break;
                } else {
                    contLogeo = "Usuario incorrecto, prueba de nuevo";
                    logeo.empty().append(contLogeo);
                }
            }
        },
    });
}
function finalizarCompra() {
    var dni = Cookies.get('dni');

    if (dni) {
        
        $.ajax({
            url: 'finalizarCompra.php',
            type: 'POST',
            data: {
                dni: dni,
                carrito: JSON.stringify(carrito)
            },
            dataType: 'json',
            success: function(response) {
            
                console.log(response);
            },
            error: function(error) {
                
                console.error(error);
            }
        });
    } else {
        console.log('No se encontró DNI almacenado en la cookie');
    }
}



