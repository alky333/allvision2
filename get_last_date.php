<?php
require_once 'db.php';
header('Content-Type: application/json');

$sql = "SELECT MAX(fecha) AS ultima_fecha FROM sensores";
$result = $conn->query($sql);

if ($result && $row = $result->fetch_assoc()) {
    echo json_encode(['fecha' => $row['ultima_fecha']]);
} else {
    echo json_encode(['fecha' => null]);
}
$conn->close();
?>
