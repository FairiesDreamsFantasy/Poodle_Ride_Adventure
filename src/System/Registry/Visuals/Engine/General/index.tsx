/**
 * Registry Visuals Engine Core
 * Handles registration and resolution of graphical assets, visual renderers, and visual language engines.
 */

export interface VisualRegistryEntry {
  id: string;
  name: string;
  type: '2D' | '3D' | 'Pixel' | 'Hybrid' | 'Shader' | 'Vector';
  rendererKey: string;
  languageEngine?: string;
  active: boolean;
}

export const REGISTERED_VISUAL_ENGINES: VisualRegistryEntry[] = [
  { id: 'vis-3djs', name: '3-DJS Visual Engine', type: '3D', rendererKey: '3djs-renderer', languageEngine: '3-DJS', active: true },
  { id: 'vis-assembly', name: 'Assembly Visual Engine', type: 'Hybrid', rendererKey: 'asm-renderer', languageEngine: 'Assembly', active: true },
  { id: 'vis-basic', name: 'Basic Visual Engine', type: '2D', rendererKey: 'basic-renderer', languageEngine: 'Basic', active: true },
  { id: 'vis-cotlin', name: 'Cotlin Visual Engine', type: '2D', rendererKey: 'cotlin-renderer', languageEngine: 'Cotlin', active: true },
  { id: 'vis-java', name: 'Java Visual Engine', type: '2D', rendererKey: 'java-renderer', languageEngine: 'Java', active: true },
  { id: 'vis-php', name: 'PHP Visual Engine', type: '2D', rendererKey: 'php-renderer', languageEngine: 'PHP', active: true },
  { id: 'vis-python', name: 'Python Visual Engine', type: '2D', rendererKey: 'python-renderer', languageEngine: 'Python', active: true },
  { id: 'vis-r', name: 'R Visual Engine', type: '2D', rendererKey: 'r-renderer', languageEngine: 'R', active: true },
  { id: 'vis-rust', name: 'Rust Visual Engine', type: 'Hybrid', rendererKey: 'rust-renderer', languageEngine: 'Rust', active: true },
  { id: 'vis-sql', name: 'SQL Visual Engine', type: '2D', rendererKey: 'sql-renderer', languageEngine: 'SQL', active: true },
  { id: 'vis-swift', name: 'Swift Visual Engine', type: '2D', rendererKey: 'swift-renderer', languageEngine: 'Swift', active: true },
  { id: 'vis-xml', name: 'XML Visual Engine', type: 'Vector', rendererKey: 'xml-renderer', languageEngine: 'XML', active: true },
  { id: 'vis-csv', name: 'CSV Visual Engine', type: '2D', rendererKey: 'csv-renderer', languageEngine: 'CSV', active: true },
  { id: 'vis-xl', name: 'XL Visual Engine', type: '2D', rendererKey: 'xl-renderer', languageEngine: 'XL', active: true },
  { id: 'vis-asp', name: 'ASP Visual Engine', type: '2D', rendererKey: 'asp-renderer', languageEngine: 'ASP', active: true },
  { id: 'vis-codec', name: 'Codec Visual Engine', type: 'Hybrid', rendererKey: 'codec-renderer', languageEngine: 'Codec', active: true }
];

export class VisualsRegistryEngineCore {
  private visualEntries: Map<string, VisualRegistryEntry> = new Map();

  constructor() {
    for (const entry of REGISTERED_VISUAL_ENGINES) {
      this.visualEntries.set(entry.id, entry);
    }
  }

  public registerVisual(entry: VisualRegistryEntry): void {
    this.visualEntries.set(entry.id, entry);
  }

  public getVisual(id: string): VisualRegistryEntry | undefined {
    return this.visualEntries.get(id);
  }

  public getAllVisualEngines(): VisualRegistryEntry[] {
    return Array.from(this.visualEntries.values());
  }
}

export const VisualsRegistryEngine = new VisualsRegistryEngineCore();

