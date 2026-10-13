export interface CeilingTexture {
  id: string;
  name: string;
  finish: 'satin' | 'matte' | 'gloss' | 'brushed' | 'grain';
  roughness: number; // 0 (perfect mirror) to 1 (pure diffuse)
  bumpScale: number;
  reflectionColor: string;
}

export const CEILING_TEXTURES: CeilingTexture[] = [
  {
    id: 'texture_satin_matte',
    name: 'Satin Plaster Finish',
    finish: 'satin',
    roughness: 0.7,
    bumpScale: 0.1,
    reflectionColor: 'rgba(255, 255, 255, 0.1)'
  },
  {
    id: 'texture_gold_leaf',
    name: 'Polished Gold Leaf Coating',
    finish: 'brushed',
    roughness: 0.2,
    bumpScale: 0.15,
    reflectionColor: 'rgba(255, 215, 0, 0.4)'
  },
  {
    id: 'texture_grain_cedar',
    name: 'Grainy Cedar Wood Plank',
    finish: 'grain',
    roughness: 0.85,
    bumpScale: 0.4,
    reflectionColor: 'rgba(100, 50, 20, 0.05)'
  },
  {
    id: 'texture_gloss_lacquer',
    name: 'Glossy Celestial Lacquer',
    finish: 'gloss',
    roughness: 0.15,
    bumpScale: 0.02,
    reflectionColor: 'rgba(173, 216, 230, 0.3)'
  }
];
