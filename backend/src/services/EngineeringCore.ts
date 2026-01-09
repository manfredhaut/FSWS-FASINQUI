import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

interface AnaliseInput {
    cliente_id: number;
    equipamento_id: number;
    parametro: string;
    valor: number;
}

export class EngineeringCore {
    static async analyze(data: AnaliseInput) {
        try {
            // Busca limites configurados
            const configQuery = `
                SELECT min_ideal, max_ideal, min_critico, max_critico, mensagem_alerta
                FROM equipamentos_parametros
                WHERE equipamento_id = $1 AND parametro = $2
            `;
            const res = await pool.query(configQuery, [data.equipamento_id, data.parametro]);
            
            if (res.rows.length === 0) return; 

            const config = res.rows[0];
            let nivel = null;
            let msg = '';
            
            // Lógica de Comparação
            if (config.min_critico !== null && data.valor < parseFloat(config.min_critico)) {
                nivel = 'critico';
                msg = `CRÍTICO: ${data.parametro} muito baixo (${data.valor}). Limite: ${config.min_critico}.`;
            } else if (config.max_critico !== null && data.valor > parseFloat(config.max_critico)) {
                nivel = 'critico';
                msg = `CRÍTICO: ${data.parametro} muito alto (${data.valor}). Limite: ${config.max_critico}.`;
            } else if (config.min_ideal !== null && data.valor < parseFloat(config.min_ideal)) {
                nivel = 'alerta';
                msg = `Atenção: ${data.parametro} abaixo do ideal (${data.valor}). Faixa: ${config.min_ideal}-${config.max_ideal}.`;
            } else if (config.max_ideal !== null && data.valor > parseFloat(config.max_ideal)) {
                nivel = 'alerta';
                msg = `Atenção: ${data.parametro} acima do ideal (${data.valor}). Faixa: ${config.min_ideal}-${config.max_ideal}.`;
            }

            // Persiste Notificação
            if (nivel) {
                if (config.mensagem_alerta) msg += ` ${config.mensagem_alerta}`;
                await pool.query(
                    `INSERT INTO notificacoes (cliente_id, equipamento_id, nivel, mensagem) VALUES ($1, $2, $3, $4)`,
                    [data.cliente_id, data.equipamento_id, nivel, msg]
                );
                console.log(`[ENGINEERING CORE] Notificação Gerada: ${msg}`);
            }
        } catch (error) {
            console.error("Erro no Motor de Engenharia:", error);
        }
    }
}
