export * from '../Grayscale/index.tsx';
import { calculateLuminance } from '../Grayscale/General/index.tsx';
import { 
  MonochromeThresholdConfig, 
  CLASSIC_1BIT_MONOCHROME, 
  AMBER_MONOCHROME, 
  GREEN_PHOSPHOR_MONOCHROME 
} from '../../../../../../../../Registry/AI/Visuals/Animations/Color_Palette/Monochrome/General/index.tsx';

export interface BinarizedPixelResult {
  isForeground: boolean;
  colorHex: string;
  luminance: number;
}

/**
 * Binarizes an RGB color into a 1-bit monochrome state based on a photometric threshold
 */
export function binarizePixel(
  r: number, 
  g: number, 
  b: number, 
  config: MonochromeThresholdConfig = CLASSIC_1BIT_MONOCHROME
): BinarizedPixelResult {
  const lum = calculateLuminance(r, g, b);
  let isFg = lum >= config.thresholdLevel;
  if (config.invert) isFg = !isFg;

  return {
    isForeground: isFg,
    colorHex: isFg ? config.foregroundHex : config.backgroundHex,
    luminance: lum,
  };
}

export { CLASSIC_1BIT_MONOCHROME, AMBER_MONOCHROME, GREEN_PHOSPHOR_MONOCHROME };
