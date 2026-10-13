/**
 * System Registry Engine Core
 * Dynamic registry lookup, metadata indexing, and zero-spike component registration.
 */

export interface SystemRegistryEntry {
  id: string;
  name: string;
  category: 'Sound' | 'Visuals' | 'Keyboards_and_Controllers' | 'Core';
  active: boolean;
}

export class RegistryEngineCore {
  private registryMap: Map<string, SystemRegistryEntry> = new Map();

  public register(entry: SystemRegistryEntry): void {
    this.registryMap.set(entry.id, entry);
  }

  public get(id: string): SystemRegistryEntry | undefined {
    return this.registryMap.get(id);
  }

  public getAll(): SystemRegistryEntry[] {
    return Array.from(this.registryMap.values());
  }
}

export const RegistryEngine = new RegistryEngineCore();
