<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $data = [
        "temperatura" => isset($_GET["temp"]) ? floatval($_GET["temp"]) : null,
        "humedad" => isset($_GET["hum"]) ? intval($_GET["hum"]) : null,
        "suelo" => isset($_GET["soil"]) ? intval($_GET["soil"]) : null,
        "luz" => isset($_GET["light"]) ? intval($_GET["light"]) : null,
        "viento_direccion" => isset($_GET["wind_dir"]) ? $_GET["wind_dir"] : null,
        "viento_velocidad" => isset($_GET["wind_speed"]) ? intval($_GET["wind_speed"]) : null,
        "lluvia" => isset($_GET["rain"]) ? $_GET["rain"] : "No"
    ];

    $json_data = json_encode($data, JSON_PRETTY_PRINT);
    $archivo = "datos.json";

    // Prueba si puede escribir
    if (is_writable($archivo)) {
        file_put_contents($archivo, $json_data);
        echo "✅ Datos guardados correctamente.\n";
        echo $json_data;
    } else {
        echo "❌ Error: El archivo 'datos.json' no tiene permisos de escritura.";
    }
} else {
    echo "❌ Método no permitido.";
}
?>
<?php
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $fecha = date("Y-m-d");
    $hora = date("H:i:s");

    $registro = [
        "temperatura" => $data["temperatura"],
        "humedad" => $data["humedad"],
        "suelo" => $data["suelo"],
        "luz" => $data["luz"],
        "viento_direccion" => $data["viento_direccion"],
        "viento_velocidad" => $data["viento_velocidad"],
        "lluvia" => $data["lluvia"],
        "lluvia_mm" => $data["lluvia_mm"],
        "estado_lluvia" => $data["estado_lluvia"],
        "fecha" => $fecha,
        "hora" => $hora
    ];

    $filename = "datos-" . $fecha . ".json";
    $dataArray = [];

    if (file_exists($filename)) {
        $dataArray = json_decode(file_get_contents($filename), true);
    }

    $dataArray[] = $registro;
    file_put_contents($filename, json_encode($dataArray, JSON_PRETTY_PRINT));

    echo json_encode(["status" => "ok"]);
} else {
    echo json_encode(["status" => "error", "message" => "Datos no válidos"]);
}
?>
