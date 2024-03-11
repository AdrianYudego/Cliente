<?php


$dni = $_POST['dni'];
$carrito = json_decode($_POST['array'], true); 

echo($carrito);


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
            $sqlStock = "UPDATE articulos SET cantidad = cantidad - '$cantidad' WHERE codArticulo = '$codArticulo'";
            $conn->query($sqlStock);
        }
    }

}


$conn->close();
?>
