<?php
require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recibir los datos enviados desde el formulario
    $nombreCliente = $_POST['nombre'];
    $apellidosCliente = $_POST['apellidos'];
    $correoCliente = $_POST['correo'];
    $telefonoCliente = $_POST['telefono'];
    $direccionCliente = $_POST['direccion'];
    $passwordCliente = $_POST['password'];
    $roleCliente = $_POST['role'];

    // Validar y limpiar los datos según sea necesario

    // Hashear la contraseña de forma segura
    $passwordHash = password_hash($passwordCliente, PASSWORD_DEFAULT);

    $db = new Database();
    // Construir la consulta INSERT
    $insertQuery = "INSERT INTO clientes (nombre, apellidos, password, correo, role, telefono, direccion)
                    VALUES ('$nombreCliente', '$apellidosCliente', '$passwordCliente', '$correoCliente', '$roleCliente', '$telefonoCliente', '$direccionCliente')";

    // Usamos directamente la conexión para ejecutar la consulta
    $result = $db->getConnection()->query($insertQuery);


    //BORRAR PARA EL FINAL ANTES DE ENTREGAR
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Cliente agregado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al agregar el cliente: ' . $db->conn->error]);
    }

    $db->closeConnection();
}
?>
