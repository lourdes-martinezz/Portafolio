CREATE DATABASE IF NOT EXISTS consultora_portal DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE consultora_portal;

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) UNIQUE,
  password_hash VARCHAR(255),
  fullname VARCHAR(120),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  client VARCHAR(200),
  year YEAR,
  short_text TEXT,
  challenge TEXT,
  solution TEXT,
  result TEXT,
  image_path VARCHAR(255),
  is_public TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150),
  description TEXT,
  process TEXT
);

CREATE TABLE team (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120),
  role VARCHAR(120),
  bio TEXT,
  photo_path VARCHAR(255)
);

CREATE TABLE testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author VARCHAR(120),
  role VARCHAR(120),
  text TEXT,
  project_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150),
  email VARCHAR(150),
  mensaje TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Demo data
INSERT INTO admins (username, password_hash, fullname) VALUES ('admin', '$2b$10$$2b$10$ybFgDbyvglEXsW6maSzmBOTPxmOFgIdRlNdNgoFVXNNszY6odji9m', 'Admin Demo');
-- Reemplaza el hash por uno generado con bcrypt en tu máquina, por ejemplo: bcrypt('admin123')

INSERT INTO projects (title,client,year,short_text,challenge,solution,result,is_public) VALUES
('Plataforma e-commerce para pyme', 'Cliente del sector retail', 2025, 'Implementamos MVP de tienda online y funnel de ventas', 'Ventas online bajas', 'MVP + campañas', '+35% ventas en 3 meses', 1),
('Automatización de pedidos', 'Restaurante local', 2024, 'Sistema de automatización para pedidos y entregas', 'Gestión manual', 'Automatización parcial', 'Reducción 40% de tiempos', 1);

INSERT INTO team (name,role,bio) VALUES
('María Pérez','Consultora de Producto','Apasionada por convertir ideas en MVPs'),
('Juan Gómez','Estratega Comercial','Especialista en funnels y growth');

INSERT INTO testimonials (author,role,text) VALUES
('Sofía Ruiz','CEO - Retail','CodeExpress nos ayudó a vender más en 2 meses'),
('Carlos Díaz','Fundador - Foodtech','Reducimos tareas operativas y crecimos');
