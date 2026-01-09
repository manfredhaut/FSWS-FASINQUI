import { FastifyRequest, FastifyReply } from 'fastify';
import { Pool } from 'pg';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { EngineeringCore } from './services/EngineeringCore';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// InfluxDB Config
const influxUrl = process.env.INFLUXDB_URL || 'http://influxdb:8086';
const influxToken = process.env.INFLUXDB_TOKEN || 'your-influx-token';
const influxOrg = process.env.INFLUXDB_ORG || 'fasinqui';
const influxBucket = 'sensor_data'; 
const writeApi = new InfluxDB({ url: influxUrl, token: influxToken }).getWriteApi(influxOrg, influxBucket);

// 1. Listar Equipamentos por Cliente
export const getEquipmentsHandler = async (req: FastifyRequest, reply: FastifyReply) => {
    const { cliente_id } = req.query as { cliente_id: string };
    try {
        const result = await pool.query('SELECT id, nome FROM equipamentos WHERE cliente_id = $1', [cliente_id]);
        return reply.send(result.rows);
    } catch (err) {
        return reply.status(500).send({ error: 'Erro ao buscar equipamentos.' });
    }
};

// 2. Listar Parâmetros Configurados para um Equipamento
export const getParamsHandler = async (req: FastifyRequest, reply: FastifyReply) => {
    const { equipamento_id } = req.query as { equipamento_id: string };
    try {
        const query = `SELECT parametro, unidade FROM equipamentos_parametros WHERE equipamento_id = $1`;
        const result = await pool.query(query, [equipamento_id]);
        return reply.send(result.rows);
    } catch (err) {
        return reply.status(500).send({ error: 'Erro ao buscar parâmetros.' });
    }
};

// 3. Salvar Análise (Influx + Engine)
export const saveAnalysisHandler = async (req: FastifyRequest, reply: FastifyReply) => {
    const { cliente_id, equipamento_id, analises } = req.body as {
        cliente_id: number;
        equipamento_id: number;
        analises: { parametro: string; valor: number }[];
    };

    if (!analises || analises.length === 0) return reply.status(400).send({ error: 'Sem dados.' });

    try {
        // A. Salva no InfluxDB (Série Temporal)
        analises.forEach(a => {
            const point = new Point('lab_analysis')
                .tag('cliente_id', cliente_id.toString())
                .tag('equipamento_id', equipamento_id.toString())
                .floatField(a.parametro, a.valor);
            writeApi.writePoint(point);

            // B. Aciona Motor de Engenharia (Assíncrono)
            EngineeringCore.analyze({
                cliente_id,
                equipamento_id,
                parametro: a.parametro,
                valor: a.valor
            });
        });

        await writeApi.flush();
        return reply.status(201).send({ message: 'Dados processados com sucesso.' });
    } catch (err) {
        console.error(err);
        return reply.status(500).send({ error: 'Erro interno.' });
    }
};
