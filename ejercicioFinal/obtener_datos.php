<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "compra";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
if ($conn->connect_error) {
    die("No hay conexión: " . $conn->connect_error);
}

$query = "SELECT * FROM articulos";

$result = $conn->query($query);
if (!$result) {
    die("Error al ejecutar la consulta: " . $conn->error);
}

$productos = array(); 

while ($row = $result->fetch_assoc()) {
   
    $productos[] = $row;
}


$conn->close();


echo json_encode($productos);
?>
