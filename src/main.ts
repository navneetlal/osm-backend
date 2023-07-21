import process from "node:process";
import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import routes from "./routes";

const app: FastifyInstance = fastify({
  logger: true,
  requestTimeout: 120000, // 120 seconds
  ignoreTrailingSlash: true,
  ignoreDuplicateSlashes: true,
  caseSensitive: false,
  bodyLimit: 10 * 1024 * 1024, // 10MiB
});

app.register(swagger, {
    prefix: '/documentation',
    openapi: {
        info: {
          title: 'Test swagger',
          description: 'Testing the Fastify swagger API',
          version: '0.1.0'
        }
    }
})
    

  app.register(swaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },

    // uiHooks: {
    //   onRequest: function (request, reply, next) { next() },
    //   preHandler: function (request, reply, next) { next() }
    // },
    staticCSP: true,
    // transformStaticCSP: (header) => header,
    // transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  })

app.register(cors);
app.register(helmet);
app.register(routes);

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
