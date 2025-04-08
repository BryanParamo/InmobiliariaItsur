<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
require_once('config.php');

function responder($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre'] ?? '');
    $apellidos = trim($_POST['apellidos'] ?? '');
    $correo = trim($_POST['correo'] ?? '');
    $telefono = trim($_POST['telefono'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';

    if (strlen($nombre) < 3 || strlen($apellidos) < 3) {
        responder(['success' => false, 'message' => 'El nombre y apellidos deben tener al menos 3 caracteres.']);
    }
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        responder(['success' => false, 'message' => 'El correo no es válido.']);
    }
    if (!preg_match('/^\d{10}$/', $telefono)) {
        responder(['success' => false, 'message' => 'El teléfono debe contener 10 dígitos.']);
    }
    if (strlen($password) < 8 || !preg_match('/[A-Za-z]/', $password) || !preg_match('/\d/', $password)) {
        responder(['success' => false, 'message' => 'La contraseña debe tener al menos 8 caracteres, una letra y un dígito.']);
    }
    if ($password !== $confirm_password) {
        responder(['success' => false, 'message' => 'Las contraseñas no coinciden.']);
    }
    
    //$passwordHash = password_hash($password, PASSWORD_DEFAULT);

    $passwordHash = $password; // Solo para pruebas. ¡No usar en producción!

    $db = new Database();
    $conn = $db->getConnection();

    $stmt = $conn->prepare("INSERT INTO clientes (nombre, apellidos, correo, telefono, password) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $nombre, $apellidos, $correo, $telefono, $passwordHash);

    if ($stmt->execute()) {
        header("Location: ../html/login.html");
        //responder(['success' => true, 'message' => 'Usuario registrado correctamente.']);
    } else {
        responder(['success' => false, 'message' => 'Error al registrar usuario: ' . $stmt->error]);
    }
    $stmt->close();
    $db->closeConnection();
}
?>
