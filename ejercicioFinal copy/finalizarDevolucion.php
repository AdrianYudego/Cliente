<?php

$devoluciones = json_decode($_POST['array'], true);

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "compra";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if ($conn->connect_error) {
    die("No hay conexión: " . $conn->connect_error);
}

foreach ($devoluciones as $producto) {
    $codLinea = $producto['CodLinea'];
    $cantidadAdevolver = $producto['cantidadAdevolver'];
    $cantidad = $producto['cantidad'];
    $precio = $producto['precio'];
    $cantidadRestante = $cantidad - $cantidadAdevolver;
$codArticulo=$producto['codArticulo'];
    if ($cantidadAdevolver > 0) {
        if ($cantidadRestante > 0) {
            $sqlLineas = "UPDATE lineas
                          SET cantidad = $cantidadRestante
                          WHERE CodLinea = $codLinea";
        } else {
            $sqlLineas = "DELETE FROM lineas WHERE CodLinea = $codLinea";
        }

        $sqlArticulos = "UPDATE articulos
                         SET cantidad = cantidad + $cantidadAdevolver
                         WHERE codArticulo = $codArticulo";
        
        $conn->query($sqlLineas);
        $conn->query($sqlArticulos);
    }
}

$conn->close();
?>
