<?php
header('Content-Type: application/json');
$host = 'localhost';
$dbname = 'inmobiliariaitsur';
$username = 'root';
$password = '200114Bpp-';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id = $_POST['id'];
    $titulo = $_POST['titulo'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $precio = $_POST['precio'] ?? '';
    $direccion = $_POST['direccion'] ?? '';

    // Manejo de la imagen
    $rutaImagen = null;
    if (!empty($_FILES['imagenProp']['name'])) {
        // Similar lógica que en agregar
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

        // Actualizar la propiedad incluyendo imagen
        $sql = "UPDATE propiedades 
                SET titulo = :titulo, descripcion = :descripcion, precio = :precio, direccion = :direccion, imagen = :imagen
                WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':imagen', $rutaImagen);
    } else {
        // No se subió nueva imagen; dejar la existente
        $sql = "UPDATE propiedades 
                SET titulo = :titulo, descripcion = :descripcion, precio = :precio, direccion = :direccion
                WHERE id = :id";
        $stmt = $pdo->prepare($sql);
    }

    $stmt->bindValue(':titulo', $titulo);
    $stmt->bindValue(':descripcion', $descripcion);
    $stmt->bindValue(':precio', $precio);
    $stmt->bindValue(':direccion', $direccion);
    $stmt->bindValue(':id', $id);

    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Propiedad actualizada con éxito"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error al actualizar la propiedad: " . $e->getMessage()]);
}
?>
