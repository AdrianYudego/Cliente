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

$dni =$_GET['dni'];


    $query = "SELECT * FROM usuarios WHERE DNI = '" . $dni . "'";
    
    $result = $conn->query($query);
    if (!$result) {
        die("Error al ejecutar la consulta: " . $conn->error);
    }

    $usuario = $result->fetch_assoc();

    if ($usuario) {
        session_start();
        $_SESSION['dni'] = $dni;

        echo json_encode($usuario);
    } 


$conn->close();
?>
