<?php
require_once('config.php');

if (
    isset($_POST['idCliente']) &&
    isset($_POST['nombreCliente']) &&
    isset($_POST['correoCliente']) &&
    isset($_POST['telefonoCliente']) &&
    isset($_POST['direccionCliente'])
) {
    $idCliente = $_POST['idCliente'];
    $nombreCliente = $_POST['nombreCliente'];
    $correoCliente = $_POST['correoCliente'];
    $telefonoCliente = $_POST['telefonoCliente'];
    $direccionCliente = $_POST['direccionCliente'];

    // Aquí podrías realizar validaciones adicionales si fuera necesario

    $db = new Database();
    // Actualizar el registro del cliente
    $query = "UPDATE clientes SET
              nombre = '$nombreCliente',
              correo = '$correoCliente',
              telefono = '$telefonoCliente',
              direccion = '$direccionCliente'
              WHERE id = $idCliente";

    $result = $db->query($query);

    if ($result) {
        echo "Cliente modificado correctamente.";
    } else {
        echo "Error al modificar el cliente.";
    }

    $db->closeConnection();
} else {
    echo "Faltan datos en la solicitud.";
}
?>
