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

function agregarAlCarrito(codArticulo) {
    var producto = null;

    for (var i = 0; i < carrito.length; i++) {
        if (codArticulo == carrito[i].codArticulo) {
            producto = carrito[i];
            break;
        }
    }

    
        if (producto.cantidadDisponible > 0 && producto.cantidadEnCarrito < producto.cantidadDisponible) {
            producto.cantidadEnCarrito++;
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
        url: 'usuario.php?dni=' + dni,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var logeo = $('#logeo');
            var contLogeo;

            if (data.nombre) {
                
                contLogeo = "Bienvenido " + data.nombre;
                Cookies.set('dni', dni);
                $('#login-modal').modal('hide');
            } else {
                
                contLogeo = "Usuario incorrecto, prueba de nuevo";
            }

            logeo.empty().append(contLogeo);
        },
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
            var dniCookie = Cookies.get('dni');

           
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
   if(dniCookie){
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
            
                        console.log(devolucion.fecha);
                        var diferenciaTiempo = fechaActual - fechaVenta;
            
                        var diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
            
                        
                        if (diferenciaDias <= 16) {
                            var pLinea = document.createElement('div');
                            pLinea.innerHTML = `<p>Articulo: ${producto.nombre} Cantidad comprada: ${devolucion.cantidad} </p>` +
                                               `<button class="btn btn-outline-dark mt-auto" onclick="devolucion(${devolucion.CodLinea})">Añadir a la devolución</button>`;
                            devolucionesContainer.append(pLinea);
                        }
                    }
                });
            });
           
        }
    });
}else{
   
    var loginContainer = $('#devoluciones-modal-body');
            
    
    loginContainer.append("Logeate antes de realizar una devolucion");
   
  
}
}

$(document).ready(function () {
    $('#devoluciones').on('click', function () {
        devoluciones();
    });
});

function devolucion(codLinea) {

    Iniciardevoluciones.forEach(function(devoluciones){
        if(devoluciones.CodLinea==codLinea){
           
            if(devoluciones.cantidad>devoluciones.cantidadAdevolver){
            devoluciones.cantidadAdevolver++;
        }
        else{
            var loginContainer = $('#devoluciones-modal-body');

            
            loginContainer.append("<p style='color: red;'>No puedes devolver más cantidad de la que has comprado</p>");
            
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

            
        }
    };
    
    xhr.send("array=" + array); 
}

