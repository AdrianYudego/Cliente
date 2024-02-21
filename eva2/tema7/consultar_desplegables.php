<?php
$dbhost = "localhost";
$dbuser = "profesor";
$dbpass = "profesor";
$dbname = "cifpaviles";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
if ($conn->connect_error) {
    die("No hay conexión: " . $conn->connect_error);
}

header("Content-Type: application/json; charset=utf-8");

$query = "SELECT * FROM usuarios";
$result = $conn->query($query);
if (!$result) {
    echo json_encode(["error" => "Error al ejecutar la consulta: " . $conn->error]);
    exit();
}

while ($row = $result->fetch_assoc()) {
    $nombres[] = $row['nombre'];
}
echo json_encode($nombres);

mysqli_close($conn);
?>
