import { 
  ProceduralTextureDescriptor, 
  POODLE_FLEECE_TEXTURE_SPEC, 
  POLISHED_WOOD_TEXTURE_SPEC, 
  BRICK_STONE_TEXTURE_SPEC 
} from '../../../../../../../../Registry/AI/Visuals/Animations/Color_Palette/Texture_Palette/General/index.tsx';

/**
 * Deterministic pseudo-random hash generator for 2D spatial coordinate seeds
 */
export function spatialHash2D(x: number, y: number, seed: number = 1337): number {
  let h = seed ^ (Math.floor(x) * 374761393 + Math.floor(y) * 668265263);
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295.0; // Normalized [0, 1]
}

/**
 * Computes anisotropic directional fur/grain micro-shading intensity
 */
export function computeAnisotropicTextureIntensity(
  x: number,
  y: number,
  descriptor: ProceduralTextureDescriptor = POODLE_FLEECE_TEXTURE_SPEC
): number {
  // Transform coordinates along the strand orientation angle
  const cos = Math.cos(descriptor.strandAngleRad);
  const sin = Math.sin(descriptor.strandAngleRad);
  const u = (x * cos - y * sin) * (descriptor.strandDensity / 10.0);
  const v = (x * sin + y * cos) * (descriptor.strandDensity / 10.0);

  const baseNoise = spatialHash2D(u, v);
  const highFreqNoise = spatialHash2D(u * 2.0, v * 2.0);

  const blended = baseNoise * 0.7 + highFreqNoise * 0.3;
  return Math.min(1.0, Math.max(0.0, (blended - 0.5) * descriptor.roughness + 0.5));
}

export { POODLE_FLEECE_TEXTURE_SPEC, POLISHED_WOOD_TEXTURE_SPEC, BRICK_STONE_TEXTURE_SPEC };
