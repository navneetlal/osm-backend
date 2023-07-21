import { FastifyInstance, FastifyRequest } from 'fastify';
import osrm, { OSRM } from '../osrm';

interface RouteRequest extends FastifyRequest {
  Body: OSRM.RouteOptions;
  Querystring: { region?: string };
  Reply: OSRM.RouteResults;
}

const routeRoutes = (fastify: FastifyInstance, _: any, done: () => void) => {
  // POST /route
  fastify.post<RouteRequest>('/route', async (request, reply) => {
    try {
      const { coordinates, ...options } = request.body;
      // Retrieve the region from the query parameter 'region', defaulting to 'india' if not provided
      const region = request.query.region || 'india';

      // Perform the route operation using OSRM
      const routeResult = await new Promise<OSRM.RouteResults>((resolve, reject) => {
        osrm(region).route({ coordinates, ...options }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      return routeResult;
    } catch (error) {
      return reply.code(500).send({ error: 'Internal Server Error' });
    }
  });

  done();
};

export default routeRoutes;
