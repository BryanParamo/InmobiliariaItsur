<?php
session_start();
require_once('config.php');

// Asegúrate de que sea vía POST, para mayor seguridad
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;
    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'ID de documento no recibido.']);
        exit();
    }

    $db = new Database();
    $conn = $db->getConnection();

    // Opcional: si también quieres eliminar el archivo físico, primero obtén la ruta
    $stmtCheck = $conn->prepare("SELECT ruta_archivo FROM documentos WHERE id = ?");
    $stmtCheck->bind_param("i", $id);
    $stmtCheck->execute();
    $resultado = $stmtCheck->get_result();
    $rutaArchivo = null;
    if ($row = $resultado->fetch_assoc()) {
        $rutaArchivo = $row['ruta_archivo'];
    }
    $stmtCheck->close();

    // Eliminar de la BD
    $stmt = $conn->prepare("DELETE FROM documentos WHERE id = ?");
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Error en la preparación: ' . $conn->error]);
        exit();
    }
    $stmt->bind_param("i", $id);
    $ejecucion = $stmt->execute();

    if ($ejecucion) {
        // Si deseas eliminar el archivo físico del servidor
        if ($rutaArchivo) {
            $archivoFullPath = "../uploads/documentos/" . $rutaArchivo;
            if (file_exists($archivoFullPath)) {
                unlink($archivoFullPath);
            }
        }
        echo json_encode(['success' => true, 'message' => 'Documento eliminado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al eliminar el documento: ' . $stmt->error]);
    }
    $stmt->close();
    $db->closeConnection();
    exit();
}
?>
