<?php
class Database {
    private $servername = "localhost";
    private $username = "root";
    private $password = "200114Bpp-";
    private $dbname = "InmobiliariaITSUR";
    private $conn;

    public function __construct() {
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        if ($this->conn->connect_error) {
            die("Conexión fallida: " . $this->conn->connect_error);
        } else {
            //echo "Conexión exitosa_";
        }
    }

    // Agregamos este método para obtener la conexión
    public function getConnection() {
        return $this->conn;
    }

    public function query($sql) {
        $result = $this->conn->query($sql);
        $data = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        return $data;
    }

    public function closeConnection() {
        $this->conn->close();
    }
}
?>
