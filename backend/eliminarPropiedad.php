<?php
header('Content-Type: application/json');

// Conexión a la base de datos
$host = 'localhost';
$dbname = 'inmobiliariaitsur';
$username = 'root';
$password = '200114Bpp-';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener el ID de la propiedad a eliminar
    $id = $_GET['id'];

    // Consulta para eliminar la propiedad
    $stmt = $pdo->prepare("DELETE FROM propiedades WHERE id = ?");
    $stmt->execute([$id]);

    // Devolver respuesta de éxito
    echo json_encode(["success" => true, "message" => "Propiedad eliminada con éxito"]);

} catch (PDOException $e) {
    echo json_encode(["error" => "Error al eliminar la propiedad: " . $e->getMessage()]);
}
?>
