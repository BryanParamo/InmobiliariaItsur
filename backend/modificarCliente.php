<?php
ob_start();
session_start();
ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once('config.php');
require_once('ClientesDAO.php');  // Se incluye únicamente la clase

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $accion = $_POST['accion'] ?? '';
    $nombre = $_POST['nombre'] ?? '';
    $apellidos = $_POST['apellidos'] ?? '';
    $correo = $_POST['correo'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $direccion = $_POST['direccion'] ?? '';
    $password = $_POST['password'] ?? '';
    $role = $_POST['role'] ?? '';
    
    $dao = new ClientesDAO();
    $conn = $dao->getConnection();
    
    if ($accion === 'editar') {
        $id = $_POST['id'] ?? '';
        if (empty($password)) {
            // Actualizar sin cambiar el password
            $stmt = $conn->prepare("UPDATE clientes SET nombre = ?, apellidos = ?, correo = ?, role = ?, telefono = ?, direccion = ? WHERE id = ?");
            if (!$stmt) {
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode(['success' => false, 'message' => 'Error en prepare: ' . $conn->error]);
                exit();
            }
            $stmt->bind_param("ssssssi", $nombre, $apellidos, $correo, $role, $telefono, $direccion, $id);
        } else {
            // Actualizar incluyendo el password
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("UPDATE clientes SET nombre = ?, apellidos = ?, password = ?, correo = ?, role = ?, telefono = ?, direccion = ? WHERE id = ?");
            if (!$stmt) {
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode(['success' => false, 'message' => 'Error en prepare: ' . $conn->error]);
                exit();
            }
            $stmt->bind_param("sssssssi", $nombre, $apellidos, $passwordHash, $correo, $role, $telefono, $direccion, $id);
        }
        
        $result = $stmt->execute();
        
        ob_clean();
        header('Content-Type: application/json');
        if ($result) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al ejecutar: ' . $stmt->error]);
        }
        
        $stmt->close();
        $dao->closeConnection();
        ob_end_flush();
        exit();
    }
}
?>
