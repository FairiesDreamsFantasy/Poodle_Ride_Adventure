/**
 * Scientific Visuals Engine SQL MySQL Sprite Asset Schema Core Module
 * Relational sprite asset dictionary, texture dimensions, and level sprite mappings.
 */



export class VisualsMySQLSpriteStore {

  private spriteDb: Map<string, Record<string, any>> = new Map();

  public saveSpriteMetadata(id: string, data: Record<string, any>): void {
    this.spriteDb.set(id, data);
  }

  public getSpriteMetadata(id: string) {
    return this.spriteDb.get(id) || null;
  }
        
}

export const VisualsMySQLSpriteStoreInstance = new VisualsMySQLSpriteStore();
