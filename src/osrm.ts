import process from 'node:process';
import OSRM from '@project-osrm/osrm';

const rootDir = process.cwd();

class OSRMSingleton {
  private static instances: Map<string, OSRM> = new Map();
  private static readonly algorithm: OSRM.AlgorithmTypes = process.env.OSRM_ROUTING_ALGORITHM as OSRM.AlgorithmTypes  ?? 'MLD'

  private constructor() {
    // Private constructor to prevent external instantiation
  }

  public static getInstance(region: string = 'india'): OSRM {
    if (!OSRMSingleton.instances.has(region)) {
      OSRMSingleton.instances.set(
        region,
        new OSRM({ path: `${rootDir}/data/${region}/${region}-latest.osrm`, algorithm: OSRMSingleton.algorithm })
      );
    }
    return OSRMSingleton.instances.get(region) as OSRM;
  }
}

export { OSRMSingleton, OSRM };
export default OSRMSingleton.getInstance;
