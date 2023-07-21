import { FastifyInstance, FastifyRequest } from 'fastify';
import osrm, { OSRM } from '../osrm';

interface NearestRequest extends FastifyRequest {
  Body: OSRM.NearestOptions;
  Querystring: { region?: string };
  Reply: OSRM.NearestResults;
}

const nearestRoutes = (fastify: FastifyInstance, _: any, done: () => void) => {
  // POST /nearest
  fastify.post<NearestRequest>('/nearest', async (request, reply) => {
    try {
      const { coordinates, ...options } = request.body;
      // Retrieve the region from the query parameter 'region', defaulting to 'india' if not provided
      const region = request.query.region || 'india';

      // Perform the nearest operation using OSRM
      const nearestResult = await new Promise<OSRM.NearestResults>((resolve, reject) => {
        osrm(region).nearest({ coordinates, ...options }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      return nearestResult;
    } catch (error) {
      return reply.code(500).send({ error: 'Internal Server Error' });
    }
  });

  done();
};

export default nearestRoutes;
