/**
 * Scientific Keyboards & Controllers SQL MySQL Profile Store Core Module
 * Keybinding profile persistence and custom controller layout relational schema.
 */



export class ControllerMySQLProfileStore {

  private profiles: Map<string, Record<string, string>> = new Map();

  public saveKeybindingProfile(profileId: string, map: Record<string, string>): void {
    this.profiles.set(profileId, map);
  }

  public getKeybindingProfile(profileId: string): Record<string, string> | null {
    return this.profiles.get(profileId) || null;
  }
        
}

export const ControllerMySQLProfileStoreInstance = new ControllerMySQLProfileStore();
