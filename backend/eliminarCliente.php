<?php
require_once('config.php');

if (isset($_GET['id'])) {
    $idCliente = $_GET['id'];
    $db = new Database();
    // Usamos la conexión para ejecutar el DELETE
    $sql = "DELETE FROM clientes WHERE id = $idCliente";
    $result = $db->getConnection()->query($sql);

    header('Content-Type: application/json');
    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al eliminar el cliente: ' . $db->conn->error]);
    }
    $db->closeConnection();
    exit();
} else {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'ID de cliente no válido.']);
}
?>
