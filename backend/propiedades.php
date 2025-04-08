<?php
// Este archivo devuelve un JSON con la lista de clientes
// Ejemplo: [{"id":1,"nombre":"Juan","correo":"juan@example.com"}, ...]

require_once('config.php');

class PropiedadesDAO {
  private $conn;
  public function __construct() {
    $db = new Database();
    $this->conn = $db->getConnection();
  }
  public function getAllPropiedades() {
    $sql = "SELECT * FROM propiedades";
    $result = $this->conn->query($sql);
    $data = [];
    if ($result) {
      while ($row = $result->fetch_assoc()) {
        $data[] = $row;
      }
    }
    return $data;
  }
}

// Instanciar el DAO
$dao = new PropiedadesDAO();
$propiedades = $dao->getAllPropiedades();

// Devolver en formato JSON
header('Content-Type: application/json');
echo json_encode($propiedades);
