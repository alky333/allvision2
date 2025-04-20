<?php
require_once 'db.php';
header('Content-Type: application/json');

$sql = "
  SELECT 
    fecha,
    HOUR(hora) AS hora,
    ROUND(AVG(temperatura), 1) AS promedio,
    MAX(temperatura) AS max,
    MIN(temperatura) AS min
  FROM sensores
  WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 4 DAY)
  GROUP BY fecha, HOUR(hora)
  ORDER BY fecha ASC, hora ASC
";

$result = $conn->query($sql);
$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

echo json_encode($data, JSON_PRETTY_PRINT);
$conn->close();
?>
