-- Cria a tabela para os surveys técnicos se ela não existir.
CREATE TABLE IF NOT EXISTS clientes_survey (
    id SERIAL PRIMARY KEY,
    codigo_unico VARCHAR(100) UNIQUE NOT NULL,
    cnpj VARCHAR(20) NOT NULL,
    nome_empresa VARCHAR(255) NOT NULL,
    dados_tecnicos JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Garante que o usuário do banco de dados tenha as permissões necessárias.
--GRANT ALL PRIVILEGES ON TABLE clientes_survey TO "user";
--GRANT USAGE, SELECT ON SEQUENCE clientes_survey_id_seq TO "user";


-- Cria um índice GIN para otimizar buscas dentro do campo JSONB 'dados_tecnicos'.
-- Isso é crucial para a performance de queries que filtram por campos aninhados.
CREATE INDEX IF NOT EXISTS idx_survey_dados ON clientes_survey USING gin (dados_tecnicos);
