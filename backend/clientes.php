<?php
require_once('ClientesDAO.php'); // O la ruta donde creaste la clase

$dao = new ClientesDAO();
$clientes = $dao->getAllClientes();

header('Content-Type: application/json');
echo json_encode($clientes);
?>
