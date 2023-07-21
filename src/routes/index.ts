import { FastifyInstance } from 'fastify';

import matchRoutes from './matchRoutes';
import nearestRoutes from './nearestRoutes';
import routeRoutes from './routeRoutes';
import tableRoutes from './tableRoutes';
import tileRoutes from './tileRoutes';
import tripRoutes from './tripRoutes';

const routes = (fastify: FastifyInstance, _: any, done: () => void) => {
  fastify.register(matchRoutes);
  fastify.register(nearestRoutes);
  fastify.register(routeRoutes);
  fastify.register(tableRoutes);
  fastify.register(tileRoutes);
  fastify.register(tripRoutes);

  done();
};

export default routes;
