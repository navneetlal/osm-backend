import process from 'node:process';
import OSRM from '@project-osrm/osrm';

const rootDir = process.cwd();

class OSRMSingleton {
  private static instances: Map<string, OSRM> = new Map();

  private constructor() {
    // Private constructor to prevent external instantiation
  }

  public static getInstance(region: string = 'india'): OSRM {
    if (!OSRMSingleton.instances.has(region)) {
      OSRMSingleton.instances.set(
        region,
        new OSRM({ path: `${rootDir}/data/${region}/${region}-latest.osrm`, algorithm: 'MLD' })
      );
    }
    return OSRMSingleton.instances.get(region) as OSRM;
  }
}

export { OSRMSingleton, OSRM };
export default OSRMSingleton.getInstance;
