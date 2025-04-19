<?php
header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Expires: 0');
header('Pragma: no-cache');

$archivo = "datos.json";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents("php://input");
    if (!empty($data)) {
        file_put_contents($archivo, $data);
        echo json_encode(["estado" => "ok", "mensaje" => "Datos guardados"]);
    } else {
        echo json_encode(["estado" => "error", "mensaje" => "Datos vacíos"]);
    }
} else {
    if (file_exists($archivo)) {
        echo file_get_contents($archivo);
    } else {
        echo json_encode(["estado" => "error", "mensaje" => "Archivo no encontrado"]);
    }
}
?>
