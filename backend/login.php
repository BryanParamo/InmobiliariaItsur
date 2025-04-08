<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);
require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $passwordIngresada = $_POST['password'] ?? '';

    if (empty($username) || empty($passwordIngresada)) {
        echo json_encode(['success' => false, 'message' => 'Usuario y contraseña son obligatorios.']);
        exit();
    }

    if (strlen($passwordIngresada) < 8) {
        echo json_encode(['success' => false, 'message' => 'La contraseña debe tener al menos 8 caracteres.']);
        exit();
    }

    $db = new Database();
    $conn = $db->getConnection();

    // Preparar la consulta
    $stmt = $conn->prepare("SELECT id, nombre, role, password FROM clientes WHERE correo = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $nombre, $role, $hashedPassword);
        $stmt->fetch();
        
        // Si usas password_verify() (lo recomendable)
        // if (password_verify($passwordIngresada, $hashedPassword)) { ... }

        // Para este ejemplo simple, compara directamente
        if ($passwordIngresada === $hashedPassword) {
            // Asigna los datos de sesión para todos los roles
            $_SESSION['id'] = $id;
            $_SESSION['nombre'] = $nombre;
            $_SESSION['role'] = $role;
            
            // Redirige según el rol (para admin, se redirige a la vista admin)
            if ($role === 'admin') {
                header("Location: ../admin/index.html");
            } else {
                header("Location: ../index.html");
            }
            exit();
        }
    }

    $stmt->close();
    $db->closeConnection();
    echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas.']);
}
?>
