<?php
session_start();
require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['documento'])) {
    // Recibir el tipo de documento
    $tipo = $_POST['tipo'] ?? '';
    
    // Validar que el tipo sea válido
    if (!in_array($tipo, ['contrato_compra', 'escritura'])) {
        echo json_encode(['success' => false, 'message' => 'Tipo de documento inválido.']);
        exit();
    }
    
    // Continuar con la subida del archivo
    $uploadDir = '../uploads/documentos/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    $archivo = $_FILES['documento'];
    $nombreOriginal = basename($archivo['name']);
    $extension = strtolower(pathinfo($nombreOriginal, PATHINFO_EXTENSION));
    
    // Lista de formatos permitidos
    $permitidos = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'];
    if (!in_array($extension, $permitidos)) {
        echo json_encode(['success' => false, 'message' => 'Tipo de archivo no permitido.']);
        exit();
    }
    
    // Generar un nombre único para el archivo
    $nuevoNombre = uniqid() . '.' . $extension;
    $uploadFile = $uploadDir . $nuevoNombre;
    
    if (move_uploaded_file($archivo['tmp_name'], $uploadFile)) {
        // Inserta datos en la base de datos (asegúrate de tener una tabla adecuada)
        $db = new Database();
        $conn = $db->getConnection();
        $stmt = $conn->prepare("INSERT INTO documentos (tipo, nombre_archivo, ruta_archivo) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $tipo, $nombreOriginal, $nuevoNombre);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Documento subido correctamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al guardar datos: ' . $stmt->error]);
        }
        $stmt->close();
        $db->closeConnection();
        exit();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al subir el archivo.']);
    }
}
?>
