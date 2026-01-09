import Fastify from 'fastify';
import cors from '@fastify/cors';
import { ChemicalAnalysisService } from './ChemicalAnalysisService';
import { createSurveyHandler, getSurveysHandler } from './survey';
import { getEquipmentsHandler, getParamsHandler, saveAnalysisHandler } from './lab';

const server = Fastify({
  logger: true
});

const start = async () => {
  try {
    // Register CORS for cross-origin requests
    await server.register(cors, { 
        origin: true, 
        credentials: true 
    });

    // --- Static file serving and SPA fallback are REMOVED ---
    // NGINX will now handle this.

    // Rota de Diagnostico
    server.get('/', async () => { return { status: 'FASINQUI Backend Online', timestamp: new Date() } });

    // API Routes
    server.post('/survey', createSurveyHandler);
    server.get('/surveys', getSurveysHandler);
    server.get('/equipments', getEquipmentsHandler);
    server.get('/lab/params', getParamsHandler);
    server.post('/lab/analysis', saveAnalysisHandler);

    // Legacy/Utility API Routes
    server.post('/calculate/sulfite', async (request, reply) => {
      const { currentPpm } = request.body as { currentPpm: number };
      if (typeof currentPpm !== 'number') return reply.status(400).send({ error: 'currentPpm must be a number' });
      const result = ChemicalAnalysisService.calculateSulfiteDosage(currentPpm);
      reply.send(result);
    });

    server.post('/check/silica-safety', async (request, reply) => {
        const { hydroxideAlkalinity, silica } = request.body as { hydroxideAlkalinity: number, silica: number };
        if (typeof hydroxideAlkalinity !== 'number' || typeof silica !== 'number') return reply.status(400).send({ error: 'Invalid numbers' });
        const result = ChemicalAnalysisService.checkSilicaSafety(hydroxideAlkalinity, silica);
        reply.send(result);
    });

    // The backend now listens on a dedicated internal port for API requests
    const port = 3000;
    await server.listen({ port: port, host: '0.0.0.0' });
    console.log(`Fastify backend listening on port ${port}`);

  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
