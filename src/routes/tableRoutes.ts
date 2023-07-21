import { FastifyInstance, FastifyRequest } from 'fastify';
import osrm, { OSRM } from '../osrm';

interface TableRequest extends FastifyRequest {
  Body: OSRM.TableOptions;
  Querystring: { region?: string };
  Reply: OSRM.TableResults;
}

const tableRoutes = (fastify: FastifyInstance, _: any, done: () => void) => {
  // POST /table
  fastify.post<TableRequest>('/table', async (request, reply) => {
    try {
      const { coordinates, ...options } = request.body;
      // Retrieve the region from the query parameter 'region', defaulting to 'india' if not provided
      const region = request.query.region || 'india';

      // Perform the table operation using OSRM
      const tableResult = await new Promise<OSRM.TableResults>((resolve, reject) => {
        osrm(region).table({ coordinates, ...options }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      return tableResult;
    } catch (error) {
      return reply.code(500).send({ error: 'Internal Server Error' });
    }
  });

  done();
};

export default tableRoutes;
