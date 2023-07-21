import { FastifyInstance, FastifyRequest } from 'fastify';
import osrm, { OSRM } from '../osrm';

interface TripRequest extends FastifyRequest {
  Body: OSRM.TripOptions;
  Querystring: { region?: string };
  Reply: OSRM.TripResults;
}

const tripRoutes = (fastify: FastifyInstance, _: any, done: () => void) => {
  // POST /trip
  fastify.post<TripRequest>('/trip', async (request, reply) => {
    try {
      const { coordinates, ...options } = request.body;
      // Retrieve the region from the query parameter 'region', defaulting to 'india' if not provided
      const region = request.query.region || 'india';

      // Perform the trip operation using OSRM
      const tripResult = await new Promise<OSRM.TripResults>((resolve, reject) => {
        osrm(region).trip({ coordinates, ...options }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      return tripResult;
    } catch (error) {
      return reply.code(500).send({ error: 'Internal Server Error' });
    }
  });

  done();
};

export default tripRoutes;
