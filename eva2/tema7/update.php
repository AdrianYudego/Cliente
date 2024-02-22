<?php
// Establecer conexión con la base de datos (ajusta los valores según tu configuración)
$servername = "localhost";
$username = "profesor";
$password = "profesor";
$dbname = "cifpaviles";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener el ID del alumno enviado por Ajax
$id = $_POST['id'];
$nombre = $_POST['nombre'];
// Consultar el alumno en la base de datos
$sql = "UPDATE alumno SET nombre='$nombre' WHERE id_alumno='$id'";
$result = $conn->query($sql);

// Cerrar conexión
$conn->close();
?>
