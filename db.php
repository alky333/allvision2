<?php
$host = 'localhost';
$user = 'root';
$password = ''; // Por defecto en XAMPP, el usuario root no tiene contraseña
$database = 'weather_db';

$conn = new mysqli($host, $user, $password, $database);

// Verifica conexión
if ($conn->connect_error) {
    die("❌ Conexión fallida a la base de datos: " . $conn->connect_error);
}
?>
