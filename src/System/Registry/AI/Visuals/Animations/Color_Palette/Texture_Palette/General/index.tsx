/**
 * Procedural Texture, Fur Density & Bump Gradient Registry
 */

export interface ProceduralTextureDescriptor {
  textureId: string;
  roughness: number;     // [0, 1]
  strandAngleRad: number;// Directional orientation of fur/grain
  strandDensity: number; // Density per unit square
  specularExponent: number;
}

export const POODLE_FLEECE_TEXTURE_SPEC: Readonly<ProceduralTextureDescriptor> = Object.freeze({
  textureId: 'Poodle_Fleece_Micrograin',
  roughness: 0.65,
  strandAngleRad: Math.PI / 6,
  strandDensity: 24.0,
  specularExponent: 32.0,
});

export const POLISHED_WOOD_TEXTURE_SPEC: Readonly<ProceduralTextureDescriptor> = Object.freeze({
  textureId: 'Manor_Polished_Hardwood',
  roughness: 0.15,
  strandAngleRad: 0.0,
  strandDensity: 8.0,
  specularExponent: 128.0,
});

export const BRICK_STONE_TEXTURE_SPEC: Readonly<ProceduralTextureDescriptor> = Object.freeze({
  textureId: 'Cobblestone_Rasta_Path',
  roughness: 0.85,
  strandAngleRad: Math.PI / 2,
  strandDensity: 12.0,
  specularExponent: 16.0,
});
