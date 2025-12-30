import Fastify from 'fastify';
import { ChemicalAnalysisService } from './ChemicalAnalysisService';

const server = Fastify({
  logger: true
});

// Rota de exemplo para testar o cálculo de dosagem de sulfito
server.post('/api/calculate/sulfite', async (request, reply) => {
  const { currentPpm } = request.body as { currentPpm: number };

  if (typeof currentPpm !== 'number') {
    reply.status(400).send({ error: 'currentPpm must be a number' });
    return;
  }

  const result = ChemicalAnalysisService.calculateSulfiteDosage(currentPpm);
  reply.send(result);
});

// Rota de exemplo para testar a verificação de segurança da sílica
server.post('/api/check/silica-safety', async (request, reply) => {
    const { hydroxideAlkalinity, silica } = request.body as { hydroxideAlkalinity: number, silica: number };

    if (typeof hydroxideAlkalinity !== 'number' || typeof silica !== 'number') {
        reply.status(400).send({ error: 'hydroxideAlkalinity and silica must be numbers' });
        return;
    }

    const result = ChemicalAnalysisService.checkSilicaSafety(hydroxideAlkalinity, silica);
    reply.send(result);
});

const start = async () => {
  try {
    await server.listen({ port: 8080, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
