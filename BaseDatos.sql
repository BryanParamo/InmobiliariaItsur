CREATE DATABASE IF NOT EXISTS InmobiliariaITSUR;
USE InmobiliariaITSUR;

-- ====================================================
-- Tabla: clientes
-- ====================================================
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    direccion VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE clientes
ADD COLUMN apellidos VARCHAR(255) NOT NULL AFTER nombre,
ADD COLUMN password VARCHAR(255) NOT NULL AFTER apellidos,
ADD COLUMN role ENUM('admin','cliente','usuario') NOT NULL DEFAULT 'cliente' AFTER correo;


-- Insertar algunos clientes de ejemplo
INSERT INTO clientes (nombre, apellidos, password, correo, role, telefono, direccion)
VALUES 
  ('Juan', 'Pérez', 'password1', 'juan@example.com', 'admin', '5512345678', 'Calle Falsa 123'),
  ('María', 'López', 'password2', 'maria@example.com', 'cliente', '5523456789', 'Avenida Siempreviva 456'),
  ('Carlos', 'Gómez', 'password3', 'carlos@example.com', 'usuario', '5534567890', 'Calle del Sol 789'),
  ('Ana', 'Martínez', 'password4', 'ana@example.com', 'cliente', '5545678901', 'Calle Luna 101'),
  ('Luis', 'Ramírez', 'password5', 'luis@example.com', 'usuario', '5556789012', 'Avenida Central 202'),
  ('Elena', 'Sánchez', 'password6', 'elena@example.com', 'admin', '5567890123', 'Calle Primavera 303');

-- ====================================================
-- Tabla: propiedades
-- ====================================================
CREATE TABLE propiedades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    direccion VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Insertar algunas propiedades de ejemplo
INSERT INTO propiedades (titulo, descripcion, precio, direccion)
VALUES
    ('Casa Moderna', 'Casa moderna de 3 habitaciones, 2 baños y amplio jardín.', 250000.00, 'Calle Falsa 123'),
    ('Departamento Central', 'Departamento en el centro con excelentes servicios.', 150000.00, 'Avenida Principal 456');


SELECT * FROM PROPIEDADES;
SELECT * FROM CLIENTES;

