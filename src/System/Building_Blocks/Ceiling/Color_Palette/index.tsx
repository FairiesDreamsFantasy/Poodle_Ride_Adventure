import { CEILING_PATTERNS } from './Pattern_Palette';
import { CEILING_TEXTURES } from './Texture_Palette';

export * from './Pattern_Palette';
export * from './Texture_Palette';

export interface CeilingColor {
  id: string;
  name: string;
  hex: string;
  description: string;
}

export const CEILING_COLORS: CeilingColor[] = [
  {
    id: 'color_alabaster_white',
    name: 'Alabaster Ivory White',
    hex: '#FAFAF7',
    description: 'A traditional warm architectural off-white.'
  },
  {
    id: 'color_royal_pink',
    name: 'Royal Poodle Pink',
    hex: '#FCE4EC',
    description: 'A luxurious soft pastel pink representing primary character spaces.'
  },
  {
    id: 'color_emperor_gold',
    name: 'Rose Gold Celestial',
    hex: '#D4AF37',
    description: 'An elegant imperial gold leaf hue.'
  },
  {
    id: 'color_twilight_slate',
    name: 'Twilight Midnight Slate',
    hex: '#111827',
    description: 'A deep blue-black sky suitable for starry night atmospheres.'
  },
  {
    id: 'color_cream_marigold',
    name: 'Cream Marigold Dust',
    hex: '#FFFDE7',
    description: 'A slender, bright, warm cream reflecting marigold sunlight.'
  }
];

export const CEILING_PALETTE = {
  colors: CEILING_COLORS,
  patterns: CEILING_PATTERNS,
  textures: CEILING_TEXTURES
};
