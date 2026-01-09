-- 1. Criação do Tipo ENUM para Perfis de Usuário
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'operador', 'tec_campo', 'tec_comercial', 'tec_laboratorio', 'engenheiro');
    END IF;
END$$;

-- Adiciona a coluna 'role' na tabela de usuários
ALTER TABLE users ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'operador';

-- 2. Tabela de Equipamentos
CREATE TABLE IF NOT EXISTS equipamentos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes_survey(id),
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela de Parâmetros e Limites (O Cérebro dos Alertas)
CREATE TABLE IF NOT EXISTS equipamentos_parametros (
    id SERIAL PRIMARY KEY,
    equipamento_id INTEGER REFERENCES equipamentos(id),
    parametro VARCHAR(50) NOT NULL,
    unidade VARCHAR(20),
    min_ideal NUMERIC(10, 2),
    max_ideal NUMERIC(10, 2),
    min_critico NUMERIC(10, 2),
    max_critico NUMERIC(10, 2),
    mensagem_alerta TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabela de Notificações
CREATE TABLE IF NOT EXISTS notificacoes (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes_survey(id),
    equipamento_id INTEGER REFERENCES equipamentos(id),
    nivel VARCHAR(20) NOT NULL,
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    data_geracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
