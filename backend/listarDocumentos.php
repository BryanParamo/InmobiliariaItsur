<?php
session_start();
require_once('config.php');

// Conectarse a la base de datos y obtener la lista de documentos
$db = new Database();
$conn = $db->getConnection();

$sql = "SELECT id, tipo, nombre_archivo, ruta_archivo, fecha_subida FROM documentos ORDER BY fecha_subida DESC";
$result = $conn->query($sql);
$documentos = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $documentos[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($documentos);

$db->closeConnection();
?>
