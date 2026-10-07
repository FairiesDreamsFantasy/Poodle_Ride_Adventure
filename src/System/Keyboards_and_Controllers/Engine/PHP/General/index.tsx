/**
 * Scientific Keyboards & Controllers PHP Config Serializer Core Module
 * Controller configuration serialization and input profile loader.
 */



export class ControllerPHPConfigSerializer {

  public serializeProfile(profile: Record<string, string>): string {
    return JSON.stringify(profile);
  }

  public deserializeProfile(raw: string): Record<string, string> {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
        
}

export const ControllerPHPConfigSerializerInstance = new ControllerPHPConfigSerializer();
