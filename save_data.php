<?php
header('Content-Type: application/json');
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $temperatura = $data["temperatura"];
    $humedad = $data["humedad"];
    $suelo = $data["suelo"];
    $luz = $data["luz"];
    $viento_direccion = $data["viento_direccion"];
    $viento_velocidad = $data["viento_velocidad"];
    $lluvia = $data["lluvia"];
    $lluvia_mm = $data["lluvia_mm"];
    $estado_lluvia = $data["estado_lluvia"];

    $fecha = date("Y-m-d");
    $hora = date("H:i:s");

    $stmt = $conn->prepare("INSERT INTO sensores (
        temperatura, humedad, suelo, luz,
        viento_direccion, viento_velocidad,
        lluvia, lluvia_mm, estado_lluvia,
        fecha, hora
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param("ddi s s d s d s s s",
        $temperatura, $humedad, $suelo, $luz,
        $viento_direccion, $viento_velocidad,
        $lluvia, $lluvia_mm, $estado_lluvia,
        $fecha, $hora
    );

    if ($stmt->execute()) {
        echo json_encode(["estado" => "ok", "mensaje" => "Datos guardados en MariaDB"]);
    } else {
        echo json_encode(["estado" => "error", "mensaje" => "Error al guardar en BD"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["estado" => "error", "mensaje" => "JSON inválido"]);
}
?>
