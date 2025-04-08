-- Crear la base de datos (si no existe)
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
  ('Elena', 'Sánchez', 'password6', 'elena@example.com', 'admin', '5567890123', 'Calle Primavera 303'),
  ('Elena', 'Sánchez', 'asdasd123', 'aaa@gmail.com', 'admin', '5567890123', 'Calle Primavera 303');

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
ALTER TABLE propiedades
ADD COLUMN imagen VARCHAR(255) NULL,
ADD COLUMN telefono VARCHAR(50) NULL,
ADD COLUMN correo VARCHAR(255) NULL;

-- Insertar algunas propiedades de ejemplo
INSERT INTO propiedades (titulo, descripcion, precio, direccion, imagen, telefono, correo) VALUES 
('Casa Familiar en Las Lomas', 
 'Hermosa casa de dos pisos con amplio jardín, 3 dormitorios, 2 baños y excelente ubicación en una zona residencial tranquila. Ideal para familias que buscan comodidad y seguridad.',
 2950000.00, 
 'Calle Encino 123, Col. Las Lomas, León, Gto.', 
 'prop1.jpg', 
 '4771234567', 
 'contacto.lomas@casasplus.com'),

('Departamento Moderno en el Centro', 
 'Lujoso departamento con acabados de alta calidad, vista panorámica, 2 habitaciones, 2 baños y amenidades de primer nivel. Ubicado en pleno centro de la ciudad.',
 3750000.00, 
 'Av. Reforma 250, Centro, CDMX', 
 'prop2.jpg', 
 '5559876543', 
 'ventas.centro@apartamentosdelux.com'),

('Villa con Piscina en la Riviera', 
 'Exclusiva villa de 4 dormitorios con piscina privada, gimnasio y jardín tropical. Ubicada en una zona de alto nivel con acceso a servicios premium.',
 8200000.00, 
 'Camino de la Riviera 789, Riviera Maya, Q.R.', 
 'prop3.jpg', 
 '9981234567', 
 'info.villa@luxuryhomes.com'),

('Casa Colonial en el Barrio Histórico', 
 'Encantadora casa colonial renovada, con detalles originales, 3 habitaciones, patio interior y una arquitectura que evoca la historia local. Ideal para quienes buscan carácter y estilo.',
 3100000.00, 
 'Calle Hidalgo 456, Barrio Histórico, Mérida, Yuc.', 
 'prop4.jpg', 
 '9991122334', 
 'ventas.colonial@casashistoricas.com'),

('Penthouse de Lujo con Vista al Mar', 
 'Penthouse exclusivo de 3 habitaciones, terraza privada, cocina gourmet y vistas infinitas al océano. Una experiencia de vida única en la costa.',
 12500000.00, 
 'Av. Marítima 101, Zona Marina, Cancún, Q.R.', 
 'prop5.jpg', 
 '9987654321', 
 'penthouse.lujo@eliteproperties.com'),

('Departamento Cómodo en Zona Universitaria', 
 'Departamento moderno y funcional, ideal para estudiantes o jóvenes profesionales. Con 1 dormitorio, cocina equipada y excelente conectividad.',
 1850000.00, 
 'Blvd. Universitario 303, Zona Universitaria, Morelia, Mich.', 
 'prop6.jpg', 
 '4432211333', 
 'dept.universitario@casasjovenes.com'),

('Casa en el Campo con Gran Terreno', 
 'Espaciosa casa en el campo rodeada de naturaleza, con 4 dormitorios, amplio terreno y perfecto para quienes buscan tranquilidad y un estilo de vida rural.',
 2300000.00, 
 'Camino Rural 15, San Miguel, Querétaro', 
 'prop7.jpg', 
 '4422334455', 
 'campo.vida@ruralhomes.com'),

('Loft Urbano en Zona Trendy', 
 'Loft con estilo industrial, de concepto abierto y grandes ventanales, perfecto para emprendedores y creativos. Ubicado en una zona vibrante y cultural.',
 2650000.00, 
 'Calle Arte 77, Col. Trendy, Guadalajara, Jal.', 
 'prop8.jpg', 
 '3311223344', 
 'loft.trendy@urbanliving.com'),

('Casa Minimalista con Diseño Moderno', 
 'Casa con diseño minimalista y elegante, con líneas limpias, espacios abiertos y tecnología inteligente. Ideal para quienes aprecian la simplicidad y el estilo contemporáneo.',
 3550000.00, 
 'Av. Minimalista 202, Col. Moderna, Monterrey, NL', 
 'prop9.jpg', 
 '8188877766', 
 'modern.casamin@innovativehomes.com'),

('Residencia Ecológica en Zona Verde', 
 'Casa sustentable con paneles solares, jardín orgánico y materiales ecoamigables. Un hogar pensado para un estilo de vida consciente y respetuoso con el medio ambiente.',
 4100000.00, 
 'Calle Verde 33, EcoBarrio, Puebla, Pue.', 
 'prop10.jpg', 
 '2223334445', 
 'eco.residencia@greenliving.com'),

('Apartamento en Edificio con Amenidades', 
 'Apartamento funcional en edificio con gimnasio, piscina y vigilancia 24 horas. 2 dormitorios, sala de estar amplia y cocina equipada. Ideal para familia pequeña.',
 2750000.00, 
 'Av. Central 88, Edificio Oasis, Toluca, Méx.', 
 'prop11.jpg', 
 '7221122334', 
 'oasis.apto@casasmexico.com'),

('Casa de Diseño en Zona Exclusiva', 
 'Casa de diseño vanguardista, con interiores de lujo, acabados premium y un jardín cuidadosamente diseñado. Ubicada en una zona exclusiva con alta plusvalía.',
 9800000.00, 
 'Calle del Diseño 101, Col. Exclusiva, Querétaro', 
 'prop12.jpg', 
 '4425566778', 
 'diseño.casa@elitehomes.com');


CREATE TABLE documentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('contrato_compra','escritura') NOT NULL,
  nombre_archivo VARCHAR(255) NOT NULL,
  ruta_archivo VARCHAR(255) NOT NULL,
  fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_usuario INT -- Si planeas relacionarlo con el usuario
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


SELECT * FROM PROPIEDADES;
SELECT * FROM CLIENTES;
select * from documentos;
delete from clientes where id=6;
