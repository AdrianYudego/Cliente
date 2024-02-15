<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Cuestionario</title>
</head>
<body>

<?php
// Conexión a la base de datos
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "preguntas";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname );

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}


$sql = "SELECT * FROM preguntastest";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    
    while($row = $result->fetch_assoc()) {
        echo "<div class='pregunta'>";
        echo "<p>{$row['pregunta']}</p>";
        echo "<button class='mostrarRespuesta' data-respuesta='{$row['respuesta']}'>Mostrar Respuesta</button>";
        echo "<div class='resultado'></div>";
        echo "</div>";
    }
} else {
    echo "No hay preguntas en la base de datos.";
}

// Cerrar la conexión a la base de datos
$conn->close();
?>

<script src="script.js">

    document.addEventListener("DOMContentLoaded", function() {
    // Agregar evento a los botones para mostrar respuestas
    var botonesMostrarRespuesta = document.querySelectorAll('.mostrarRespuesta');
    botonesMostrarRespuesta.forEach(function(boton) {
        boton.addEventListener('click', function() {
            var respuestaCorrecta = boton.getAttribute('data-respuesta');
            var respuestaUsuario = prompt("Ingresa tu respuesta:");
            var resultado = boton.parentElement.querySelector('.resultado');

            if (respuestaUsuario === respuestaCorrecta) {
                resultado.innerHTML = "¡Respuesta Correcta!";
                resultado.style.color = "green";
            } else {
                resultado.innerHTML = "Respuesta Incorrecta. La respuesta correcta es: " + respuestaCorrecta;
                resultado.style.color = "red";
            }
        });
    });
});
</script>

</body>
</html>
