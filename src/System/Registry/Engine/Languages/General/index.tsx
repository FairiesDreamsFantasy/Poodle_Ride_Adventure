/**
 * System Registry Engine Languages Core
 * Aggregates and indexes all supported scientific computer languages,
 * compiler bindings, and DRM-free execution interfaces.
 */

export interface LanguageRegistryEntry {
  id: string;
  name: string;
  family: 'Compiled' | 'Interpreted' | 'Query' | 'Markup' | 'Shader' | 'Intermediate';
  drmFreeCapable: boolean;
  offlineReady: boolean;
  active: boolean;
}

export const SUPPORTED_ENGINE_LANGUAGES: LanguageRegistryEntry[] = [
  { id: 'assembly', name: 'Assembly', family: 'Compiled', drmFreeCapable: true, offlineReady: true, active: true },
  { id: 'webassembly', name: 'WebAssembly', family: 'Compiled', drmFreeCapable: true, offlineReady: true, active: true },
  { id: 'python', name: 'Python', family: 'Interpreted', drmFreeCapable: true, offlineReady: true, active: true },
  { id: 'xml', name: 'XML', family: 'Markup', drmFreeCapable: true, offlineReady: true, active: true },
  { id: 'basic', name: 'Basic', family: 'Interpreted', drmFreeCapable: true, offlineReady: true, active: true },
  { id: 'java', name: 'Java', family: 'Compiled', drmFreeCapable: true, offlineReady: true, active: true },
  { id: 'php', name: 'PHP', family: 'Interpreted', drmFreeCapable: true, offlineReady: true, active: true },
  { id: 'rust', name: 'Rust', family: 'Compiled', drmFreeCapable: true, offlineReady: true, active: true },
  { id: 'sql', name: 'SQL', family: 'Query', drmFreeCapable: true, offlineReady: true, active: true },
  { id: 'swift', name: 'Swift', family: 'Compiled', drmFreeCapable: true, offlineReady: true, active: true },
  { id: 'cotlin', name: 'Cotlin', family: 'Compiled', drmFreeCapable: true, offlineReady: true, active: true },
  { id: '3-djs', name: '3-DJS', family: 'Shader', drmFreeCapable: true, offlineReady: true, active: true },
  { id: 'asp', name: 'ASP', family: 'Intermediate', drmFreeCapable: true, offlineReady: true, active: true },
  { id: 'csv', name: 'CSV', family: 'Markup', drmFreeCapable: true, offlineReady: true, active: true },
  { id: 'codec', name: 'Codec', family: 'Intermediate', drmFreeCapable: true, offlineReady: true, active: true },
  { id: 'r', name: 'R', family: 'Interpreted', drmFreeCapable: true, offlineReady: true, active: true },
  { id: 'xl', name: 'XL', family: 'Intermediate', drmFreeCapable: true, offlineReady: true, active: true }
];

export class LanguageRegistryEngineCore {
  private languages: Map<string, LanguageRegistryEntry> = new Map();

  constructor() {
    for (const lang of SUPPORTED_ENGINE_LANGUAGES) {
      this.languages.set(lang.id, lang);
    }
  }

  public registerLanguage(entry: LanguageRegistryEntry): void {
    this.languages.set(entry.id, entry);
  }

  public getLanguage(id: string): LanguageRegistryEntry | undefined {
    return this.languages.get(id.toLowerCase());
  }

  public getAllLanguages(): LanguageRegistryEntry[] {
    return Array.from(this.languages.values());
  }
}

export const LanguageRegistry = new LanguageRegistryEngineCore();
