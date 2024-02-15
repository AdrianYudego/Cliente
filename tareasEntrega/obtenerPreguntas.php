<?php
// obtener_preguntas.php

// Conexión a la base de datos
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "preguntas";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener preguntas de la base de datos
$sql = "SELECT * FROM test";
$result = $conn->query($sql);
$preguntas = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $preguntas[] = $row;
    }
} else {
    echo json_encode(["error" => "No hay preguntas en la base de datos."]);
}

// Cerrar la conexión a la base de datos
$conn->close();

// Devolver preguntas como JSON
echo json_encode($preguntas);
?>
