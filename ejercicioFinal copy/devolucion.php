
<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 $dni=$_SESSION['dni'] ;
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "compra";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
if ($conn->connect_error) {
    die("No hay conexión: " . $conn->connect_error);
}

$query = "SELECT lineas.*, ventas.fecha 
          FROM lineas 
          INNER JOIN ventas ON lineas.codVenta = ventas.codVenta
          WHERE ventas.DNI = '$dni'";


$result = $conn->query($query);
if (!$result) {
    die("Error al ejecutar la consulta: " . $conn->error);
}

$lineas = array(); 

while ($row = $result->fetch_assoc()) {
   
    $lineas[] = $row;
}


$conn->close();


echo json_encode($lineas);
?>
