import zlib from "node:zlib";
import { FastifyInstance, FastifyRequest } from "fastify";
import osrm, { OSRM } from "../osrm";

interface TileRequest extends FastifyRequest {
  Querystring: { region?: string };
  Params: { z: string; x: string; y: string };
}

const tileRoutes = (fastify: FastifyInstance, _: any, done: () => void) => {
  // GET /tile?region=india&z=:z&x=:x&y=:y.mvt
  fastify.get<TileRequest>("/tile", async (request, reply) => {
    try {
      const { z, x, y } = request.params;
      // Retrieve the region from the query parameter 'region', defaulting to 'india' if not provided
      const region = request.query.region || 'india';

      // Fetch the tile from the appropriate OSRM instance based on the 'region'
      const tileBuffer: Buffer = await new Promise<Buffer>((resolve, reject) => {
        const tileOptions: OSRM.Tile = [Number(z), Number(x), Number(y)];

        osrm(region).tile(tileOptions, (err, buffer) => {
          if (err) {
            reject(err);
          } else {
            resolve(buffer);
          }
        });
      });

      // Compress the tile buffer using gzip
      const compressedBuffer = zlib.gzipSync(tileBuffer);

      // Set the appropriate headers for the response
      reply.header("Content-Type", "application/vnd.mapbox-vector-tile");
      reply.header("Content-Encoding", "gzip");
      reply.header(
        "Content-Disposition",
        `attachment; filename=${region}-${z}-${x}-${y}.mvt`
      );

      // Send the compressed tile buffer as the response
      reply.send(compressedBuffer);
    } catch (error) {
      reply.code(500).send({ error: "Internal Server Error" });
    }
  });

  done();
};

export default tileRoutes;
