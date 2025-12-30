-- Tabela para armazenar informações dos clientes
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unit_name VARCHAR(255),
    contact_email VARCHAR(255) UNIQUE
);

-- Tabela para armazenar informações dos equipamentos dos clientes
CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    qr_code_uuid UUID UNIQUE NOT NULL,
    design_pressure REAL,
    steam_capacity REAL -- em Ton/h
);

-- Tabela para o catálogo de produtos químicos
CREATE TABLE chemical_products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100), -- Ex: Sequestrante de O2, Alcalinizante
    density_factor REAL
);

-- Tabela para registrar as visitas técnicas
CREATE TABLE technical_visits (
    id SERIAL PRIMARY KEY,
    technician_id INTEGER NOT NULL, -- Poderia referenciar uma tabela de técnicos/usuários
    "timestamp" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    gps_lat REAL,
    gps_long REAL,
    audit_flag BOOLEAN DEFAULT FALSE
);

-- Tabela para definir os limites operacionais dos parâmetros por tipo de equipamento
CREATE TABLE parameter_limits (
    id SERIAL PRIMARY KEY,
    equipment_type VARCHAR(100) NOT NULL,
    parameter_name VARCHAR(100) NOT NULL,
    min_value REAL,
    max_value REAL,
    target_value REAL,
    UNIQUE(equipment_type, parameter_name)
);

-- Inserir alguns dados de exemplo para limites de parâmetros para uma Caldeira
INSERT INTO parameter_limits (equipment_type, parameter_name, min_value, max_value, target_value)
VALUES
    ('Gerador de Vapor', 'pH', 10.5, 11.8, 11.0),
    ('Gerador de Vapor', 'Sulfito', 30, 80, 50),
    ('Gerador de Vapor', 'Alcalinidade_OH', 250, 400, 300),
    ('Gerador de Vapor', 'Condutividade', 0, 5000, 4500),
    ('Gerador de Vapor', 'STD', 0, 3500, 3000);
