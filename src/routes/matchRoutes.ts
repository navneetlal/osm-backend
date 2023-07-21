import { FastifyInstance, FastifyRequest } from 'fastify';
import osrm, { OSRM } from '../osrm';

interface MatchRequest extends FastifyRequest {
  Body: OSRM.MatchOptions;
  Querystring: { region?: string };
  Reply: OSRM.MatchResults;
}

const matchRoutes = (fastify: FastifyInstance, _: any, done: () => void) => {
  // POST /match
  fastify.post<MatchRequest>('/match', async (request, reply) => {
    try {
      const { coordinates, ...options } = request.body;
      // Retrieve the region from the query parameter 'region', defaulting to 'india' if not provided
      const region = request.query.region || 'india';

      // Perform the match operation using OSRM
      const matchResult = await new Promise<OSRM.MatchResults>((resolve, reject) => {
        osrm(region).match({ coordinates, ...options }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      return matchResult;
    } catch (error) {
      return reply.code(500).send({ error: 'Internal Server Error' });
    }
  });

  done();
};

export default matchRoutes;
