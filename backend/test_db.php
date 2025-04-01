<?php
require_once 'config.php'; // Ajusta la ruta según tu estructura

$database = new Database();
$conn = $database->getConnection();

if ($conn) {
    echo "Conexión exitosa a la base de datos.";
} else {
    echo "Error en la conexión.";
}
