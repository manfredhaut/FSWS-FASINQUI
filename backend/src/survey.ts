
import { FastifyRequest, FastifyReply } from 'fastify';
import { Pool } from 'pg';

// A pool de conexões é instanciada para ser reutilizada.
// Mantendo a pool aqui para evitar dependências circulares com index.ts
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Manipulador para criar um novo registro de survey.
 * Executa validação, geração de código e inserção no banco de dados.
 */
export const createSurveyHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  // 1. Extração e validação dos dados essenciais do corpo da requisição.
  const { nome_empresa, cnpj, ...dados_tecnicos } = req.body as { nome_empresa?: string; cnpj?: string; [key: string]: any };

  if (!nome_empresa || !cnpj) {
    return reply.status(400).send({ error: 'Campos "nome_empresa" e "cnpj" são obrigatórios.' });
  }

  // 2. Limpeza e normalização do CNPJ para conter apenas dígitos.
  const cleanedCnpj = cnpj.replace(/[^\d]/g, '');
  if (cleanedCnpj.length !== 14) {
      return reply.status(400).send({ error: 'O CNPJ fornecido é inválido. Deve conter 14 dígitos.' });
  }

  // 3. Geração do código único conforme a regra de negócio.
  const tresPrimeirasLetras = nome_empresa.substring(0, 3).toUpperCase();
  const quatroUltimosDigitosCnpj = cleanedCnpj.slice(-4);
  const timestamp = Date.now();
  const codigo_unico = `${tresPrimeirasLetras}-${quatroUltimosDigitosCnpj}-${timestamp}`;

  try {
    // 4. Inserção dos dados no banco. O nome da tabela foi corrigido de 'clientes_survey' para 'clientes'.
    const query = `
      INSERT INTO clientes (codigo_unico, cnpj, nome_empresa, dados_tecnicos)
      VALUES ($1, $2, $3, $4)
      RETURNING id, codigo_unico, created_at;
    `;
    const values = [codigo_unico, cleanedCnpj, nome_empresa, dados_tecnicos];

    const result = await pool.query(query, values);

    // 5. Retorno de sucesso com os dados criados.
    return reply.status(201).send(result.rows[0]);

  } catch (err: any) {
    // 6. Tratamento de erros do banco de dados.
    console.error('Erro ao salvar o survey no banco de dados:', err);

    if (err.code === '23505') { // Código para violação de constraint de unicidade.
        return reply.status(409).send({ 
            error: 'Conflito de dados.',
            detail: 'Já existe um registro com o CNPJ ou código único fornecido.' 
        });
    }

    return reply.status(500).send({ error: 'Ocorreu um erro inesperado no servidor.' });
  }
};

/**
 * Manipulador para listar os surveys cadastrados.
 */
export const getSurveysHandler = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        // Correção: O nome da tabela foi alterado de 'clientes_survey' para 'clientes'.
        const result = await pool.query('SELECT * FROM clientes ORDER BY created_at DESC');
        return reply.send(result.rows);
    } catch (err) {
        console.error('Erro ao listar surveys:', err);
        return reply.status(500).send({ error: 'Erro ao buscar dados.' });
    }
};
