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

// Consultar el alumno en la base de datos
$sql = "SELECT * FROM alumno WHERE id_alumno = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Mostrar los datos del alumno
    $row = $result->fetch_assoc();
    echo "Nombre: " . $row["nombre"] . "<br>";
} else {
    echo "No se encontró ningún alumno con el ID proporcionado.";
}

// Cerrar conexión
$conn->close();
?>
