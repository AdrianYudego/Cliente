var carrito = [];
var Iniciardevoluciones = [];  

function inicializarDevoluciones(datos) {
    Iniciardevoluciones = datos.map(devolucion => ({
        CodLinea: devolucion.CodLinea,
        codVenta: devolucion.codVenta,
        codArticulo: devolucion.codArticulo,
        cantidad: devolucion.cantidad,
        precio: devolucion.precio,
        cantidadAdevolver:0
    }));
}

function inicializarCarrito(datos) {
    carrito = datos.map(producto => ({
        codArticulo: producto.codArticulo,
        nombre: producto.nombre,
        PVP: producto.PVP,
        IVA: producto.IVA,
        cantidadMinima:producto.cantidadMinima,
        cantidadDisponible: producto.cantidad,
        cantidadEnCarrito: 0
    }));
}
function agregarAlCarrito(codArticulo, cantidad) {
    var producto;

    for (var i = 0; i < carrito.length; i++) {
        if (codArticulo == carrito[i].codArticulo) {
            producto = carrito[i];
            break;
        }
    }

    if (producto && producto.cantidadDisponible > 0) {
        cantidad = parseInt(cantidad, 10);
        var cantidadTotalEnCarrito = carrito.reduce((total, p) => total + p.cantidadEnCarrito, 0);

        if (cantidadTotalEnCarrito + cantidad <= producto.cantidadDisponible) {
            producto.cantidadEnCarrito += cantidad;
        } else {
           
            var cantidadRestante = producto.cantidadDisponible - cantidadTotalEnCarrito;
            producto.cantidadEnCarrito += cantidadRestante;

            var mensajeFinal = $('#mensajeFinal');
            mensajeFinal.html("Se ha añadido la cantidad máxima disponible al carrito.");
        }

        var cantidadTotal = carrito.reduce((total, p) => total + p.cantidadEnCarrito, 0);
        $('#carrito-cantidad').text(cantidadTotal);
    } else {
        var mensajeFinal = $('#mensajeFinal');
        mensajeFinal.html("No puedes añadir más cantidad de la disponible");
    }
}




function mostrarContenidoCarrito() {
    var carritoContenido = $('#carrito-contenido');

    var productosEnCarrito = carrito.filter(producto => producto.cantidadEnCarrito > 0);

    if (productosEnCarrito.length === 0) {
        carritoContenido.html('<p>Tu carrito está vacío.</p>');
    } else {
        carritoContenido.empty();

        var totalPagar = 0;  

        productosEnCarrito.forEach(producto => {
            var PVP = parseFloat(producto.PVP);
            var IVA = parseFloat(producto.IVA);
            var cantidadEnCarrito = parseInt(producto.cantidadEnCarrito);

            
            var precio = ((PVP + (PVP * IVA)) * cantidadEnCarrito).toFixed(2);

            
            totalPagar += parseFloat(precio);

            carritoContenido.append(`<p>${producto.nombre} - Cantidad: ${producto.cantidadEnCarrito} - Precio: ${precio} <button type="button" onclick="eliminar(${producto.codArticulo})">Quitar</button></p>`);
        });

        
        carritoContenido.append(`<p>Total a pagar: ${totalPagar.toFixed(2)}</p>`);
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
            productosContainer.empty();

            data.forEach(function (producto) {
                var diferencia = producto.cantidad - producto.cantidadMinima;
                var mensaje = diferencia < 0 ? `<p style="color: red;">Quedan pocas unidades </p>` : '';

                var productoHtml = `
                    <div class="col mb-5">
                        <div class="card h-100">
                            <img class="card-img-top" src="${producto.imagen}" alt="${producto.imagen}" />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">${producto.nombre}</h5>
                                    Precio: ${producto.PVP} $<br>
                                    ${mensaje}<br>
                                    Stock restante: ${producto.cantidad}
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center">
                                    <div class="input-group">
                                    <input type="number" id="cantidad-${producto.codArticulo}" value="1" min="1"" class="form-control" />
                                        <button class="btn btn-outline-dark mt-auto" onclick="agregarAlCarrito(${producto.codArticulo}, $('#cantidad-${producto.codArticulo}').val())">Añadir al carrito</button>
                                    </div>
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
    var registroModalBody = $('#registro-modal-body');
 

    $.ajax({
        url: 'usuario.php',
        type: 'POST',
        dataType: 'json',
        data: { dni: dni },
        success: function (data) {
            var logeo = $('#logeo');
           
                
                Cookies.set('dni', dni);
                $('#login-modal').modal('hide');

                registroModalBody.html("<form id='registro'>" +
                "  <label for='nombre'>Nombre:</label>" +
                "  <input type='text' id='nombre' name='nombre' value='" + data.nombre + "' required><br>" +
                "  <label for='apellidos'>Apellidos:</label>" +
                "  <input type='text' id='apellidos' name='apellidos' value='" + data.apellidos + "' required><br>" +
                "  <label for='direccion'>Dirección:</label>" +
                "  <input type='text' id='direccion' name='direccion' value='" + data.direccion + "' required><br>" +
                "  <label for='poblacion'>Población:</label>" +
                "  <input type='text' id='poblacion' name='poblacion' value='" + data.poblacion + "' required><br>" +
                "  <label for='correo'>Correo:</label>" +
                "  <input type='email' id='correo' name='correo' value='" + data.correo + "' required><br>" +
                "  <input type='hidden' id='dniForm' name='dni' value='" + dni + "'>" +
                "  <input type='hidden' id='comprobador' name='comprobador' value='modificar'>" +
                "</form>");
                $('#registro-modal').modal('show');
            

            logeo.empty().append("Bienvenido " + data.nombre);
        },
        error: function (xhr, status, error) {
           

            registroModalBody.empty().append("<form id='registro'>" +
            "  <label for='nombre'>Nombre:</label>" +
            "  <input type='text' id='nombre' name='nombre' required><br>" +
            "  <label for='apellidos'>Apellidos:</label>" +
            "  <input type='text' id='apellidos' name='apellidos' required><br>" +
            "  <label for='direccion'>Dirección:</label>" +
            "  <input type='text' id='direccion' name='direccion' required><br>" +
            "  <label for='poblacion'>Población:</label>" +
            "  <input type='text' id='poblacion' name='poblacion' required><br>" +
            "  <label for='correo'>Correo:</label>" +
            "  <input type='email' id='correo' name='correo' required><br>" +
            "  <input type='hidden' id='dniForm' name='dni' value='" + dni + "'>" +
            "  <input type='hidden' id='comprobador' name='comprobador' value='insertar'>" +
            "</form>");
            $('#registro-modal').modal('show');
        }
    });
}

function usuario() {
    var infoUsuario = $('#registro').serialize();

    $.ajax({
        url: 'login.php',
        type: 'POST',
        data: { infoUsuario: infoUsuario },
        success: function(response) {
            var logeo = $('#logeo');
            var nombreValue = $('#registro [name=nombre]').val();

            logeo.empty().append( "Bienvenido " + nombreValue);
            $('#login-modal').modal('hide');
        }
    });
}


function finalizarCompra() {
    var dni = Cookies.get('dni');
    if (!dni) {
        
        $('#login-modal').modal('show');
    }else{
    var array = JSON.stringify(carrito);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "finalizarCompra.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var mensajeFinal = $('#mensajeFinal');

            mensajeFinal.html("Gracias por su compra");
            var cantidadTotal = 0;
            $('#carrito-cantidad').text(cantidadTotal);
            mostrarContenidoCarrito();
            obtenerDatos();
        }
    };
    xhr.send("dni=" + dni + "&array=" + array); 
    



}
}

$(document).ready(function () {
   
    var dniCookie = Cookies.get('dni');

    if (dniCookie) {
        
        Cookies.remove('dni');
    }

    
});

function mostrarVentas() {
   
    $.ajax({
        url: 'ventas.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var ventasContainer = $('#ventas-modal-body');

            ventasContainer.empty();

            data.forEach(function (venta) {
                var vLinea = document.createElement('div');
                vLinea.innerHTML = `<p>Codigo: ${venta.codVenta} Fecha: ${venta.fecha} DNI: ${venta.DNI} </p>`;
               
                ventasContainer.append(vLinea);
            });
        
        }
    });
}


$(document).ready(function () {
    $('#ventas').on('click', function () {
        mostrarVentas();
    });
});



function devoluciones() {
    var dniCookie = Cookies.get('dni');
    if (dniCookie) {
        $.ajax({
            url: 'devolucion.php',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                inicializarDevoluciones(data);
                var devolucionesContainer = $('#devoluciones-modal-body');

                devolucionesContainer.empty();

                data.forEach(function (devolucion) {
                    carrito.forEach(function (producto) {
                        if (devolucion.codArticulo == producto.codArticulo) {
                            var fechaActual = new Date();
                            var fechaVenta = new Date(devolucion.fecha);
                            var diferenciaTiempo = fechaActual - fechaVenta;
                            var diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

                            if (diferenciaDias <= 16) {
                                var pLinea = document.createElement('div');
                                pLinea.innerHTML = `<p>Articulo: ${producto.nombre} Cantidad comprada: ${devolucion.cantidad} </p>` +
                                `<input type="number" id="cantidad-${devolucion.CodLinea}" value="1" min="1" max="${devolucion.cantidad }" class="form-control" />` +
                                    `<button class="btn btn-outline-dark mt-auto" onclick="devolucion(${devolucion.CodLinea}, $('#cantidad-${devolucion.CodLinea}').val())">Añadir a la devolución</button>`;
                                devolucionesContainer.append(pLinea);
                            }
                        }
                    });
                });
            }
        });
    } else {
        var loginContainer = $('#devoluciones-modal-body');
        loginContainer.append("Inicia sesión antes de realizar una devolución");
    }
}

$(document).ready(function () {
    $('#devoluciones').on('click', function () {
        devoluciones();
    });
});

function devolucion(codLinea, cantidad) {
    var devolucionesContainer = $('#devoluciones-modal-body');
    Iniciardevoluciones.forEach(function (devoluciones) {
        if (devoluciones.CodLinea == codLinea) {
            if (cantidad > 0 && (devoluciones.cantidad - devoluciones.cantidadAdevolver) >= cantidad) {
                devoluciones.cantidadAdevolver += cantidad;
               
                devolucionesContainer.append("<p'>Añadido correctamente</p>");
            } else {
                devoluciones.cantidadAdevolver=devoluciones.cantidad;
                
                devolucionesContainer.append("<p style='color: red;'>Añadidos el máximo de productos</p>");
            }
        }
    });
}



function finalizarDevolucion() {
   
    var array = JSON.stringify(Iniciardevoluciones);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "finalizarDevolucion.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var mensajeFinal = $('#mensajeFinal');

            mensajeFinal.html("Devolucion realizada");
            obtenerDatos();
            
        }
    };
    
    xhr.send("array=" + array); 
}

