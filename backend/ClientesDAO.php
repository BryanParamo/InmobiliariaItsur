<?php
require_once('config.php');

class ClientesDAO {
  private $conn;
  public function __construct() {
    $db = new Database();
    $this->conn = $db->getConnection();
  }

  public function getAllClientes() {
    $sql = "SELECT * FROM clientes";
    $result = $this->conn->query($sql);
    $data = [];
    if ($result) {
      while ($row = $result->fetch_assoc()) {
        $data[] = $row;
      }
    }
    return $data;
  }

  public function getConnection() {
    return $this->conn;
  }

  public function closeConnection() {
    $this->conn->close();
  }
}
?>
