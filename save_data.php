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