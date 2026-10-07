/**
 * Scientific Visuals Engine PHP Texture Atlas Router Core Module
 * Dynamic texture atlas mapping and sprite frame routing.
 */



export class VisualsPHPAtlasRouter {

  private atlas: Map<string, { u: number; v: number; w: number; h: number }> = new Map();

  public registerFrame(name: string, u: number, v: number, w: number, h: number): void {
    this.atlas.set(name, { u, v, w, h });
  }

  public getFrame(name: string) {
    return this.atlas.get(name) || null;
  }
        
}

export const VisualsPHPAtlasRouterInstance = new VisualsPHPAtlasRouter();
