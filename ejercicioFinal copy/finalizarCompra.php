<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['dni']) && isset($data['carrito'])) {
    $dni = $data['dni'];
    $carrito = $data['carrito'];

}
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "compra";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if ($conn->connect_error) {
    die("No hay conexión: " . $conn->connect_error);
}



$sql = "INSERT INTO ventas (fecha, DNI) VALUES (CURRENT_DATE, '$dni')";

if ($conn->query($sql) === TRUE) {
    $codVenta = $conn->insert_id;

    foreach ($carrito as $producto) {
        $codArticulo = $producto['codArticulo'];
        $cantidad = $producto['cantidadEnCarrito'];

       
        if ($cantidad > 0) {
            $precio = $producto['PVP'] * (1 + $producto['IVA']);  

            $sqlLineas = "INSERT INTO lineas (codVenta, codArticulo, cantidad, precio) 
                          VALUES ('$codVenta', '$codArticulo', '$cantidad', '$precio')";

            $conn->query($sqlLineas);
        }
    }

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$conn->close();
?>
