<?php
$datosUsuario = $_POST['infoUsuario'];

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "compra";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if ($conn->connect_error) {
    die("No hay conexión: " . $conn->connect_error);
}

parse_str($datosUsuario, $usuario);

$nombre = $usuario['nombre'];
$apellidos = $usuario['apellidos'];
$direccion = $usuario['direccion'];
$poblacion = $usuario['poblacion'];
$correo = $usuario['correo'];
$dni = $usuario['dni'];
$comprobador=$usuario['comprobador'];

if($comprobador=="insertar"){


$sql = "INSERT INTO usuarios (nombre, apellidos, direccion, poblacion, correo, dni) 
        VALUES ('$nombre', '$apellidos', '$direccion', '$poblacion', '$correo', '$dni')";
}else{
    $sql = "UPDATE usuarios 
            SET nombre = '$nombre', apellidos = '$apellidos', direccion = '$direccion', poblacion = '$poblacion', correo = '$correo' 
            WHERE dni = '$dni'";
}
$conn->query($sql);

$conn->close();
?>
