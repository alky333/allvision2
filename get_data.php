<?php
header('Content-Type: application/json');
require_once 'db.php';

$fecha = $_GET['fecha'] ?? date('Y-m-d'); // Si no se pasa fecha, se usa la actual

$sql = "SELECT * FROM sensores WHERE fecha = ? ORDER BY hora ASC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $fecha);
$stmt->execute();

$result = $stmt->get_result();
$datos = [];

while ($row = $result->fetch_assoc()) {
    $datos[] = $row;
}

echo json_encode(array_map("utf8ize", $datos), JSON_PRETTY_PRINT);

// Agrega esta función al final del archivo:
function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } elseif (is_string($d)) {
        return utf8_encode($d);
    }
    return $d;
}

$stmt->close();
$conn->close();
?>
