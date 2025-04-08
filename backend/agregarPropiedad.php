<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'inmobiliariaitsur';
$username = 'root';
$password = '200114Bpp-';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener los datos enviados desde el frontend
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];
    $direccion = $_POST['direccion'];
    $correo = $_POST['correo'] ?? null;
    $telefono = $_POST['telefono'] ?? null;

    // Manejo de la imagen (similar al ejemplo anterior)...
    $rutaImagen = null;
    if (!empty($_FILES['imagenProp']['name'])) {
        $uploadDir = __DIR__ . '/uploads/propiedades/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $tmpName = $_FILES['imagenProp']['tmp_name'];
        $fileName = basename($_FILES['imagenProp']['name']);
        $nuevoNombre = uniqid() . '_' . $fileName;
        $destino = $uploadDir . $nuevoNombre;
        if (move_uploaded_file($tmpName, $destino)) {
            $rutaImagen = "uploads/propiedades/" . $nuevoNombre;
        } else {
            echo json_encode(["success" => false, "message" => "Error al subir la imagen."]);
            exit();
        }
    }

    // Consulta para insertar la propiedad
    $sql = "INSERT INTO propiedades (titulo, descripcion, precio, direccion, correo, telefono, imagen)
            VALUES (:titulo, :descripcion, :precio, :direccion, :correo, :telefono, :imagen)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':titulo', $titulo);
    $stmt->bindValue(':descripcion', $descripcion);
    $stmt->bindValue(':precio', $precio);
    $stmt->bindValue(':direccion', $direccion);
    $stmt->bindValue(':correo', $correo);
    $stmt->bindValue(':telefono', $telefono);
    $stmt->bindValue(':imagen', $rutaImagen);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Propiedad agregada con éxito"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error al agregar la propiedad: " . $e->getMessage()]);
}
?>
