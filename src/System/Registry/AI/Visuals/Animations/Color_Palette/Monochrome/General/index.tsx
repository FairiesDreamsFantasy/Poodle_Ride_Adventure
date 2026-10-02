export * from '../Grayscale/index.tsx';

export interface MonochromeThresholdConfig {
  thresholdLevel: number; // 0 to 255
  invert: boolean;
  foregroundHex: string;
  backgroundHex: string;
}

export const CLASSIC_1BIT_MONOCHROME: Readonly<MonochromeThresholdConfig> = Object.freeze({
  thresholdLevel: 128,
  invert: false,
  foregroundHex: '#FFFFFF',
  backgroundHex: '#000000',
});

export const AMBER_MONOCHROME: Readonly<MonochromeThresholdConfig> = Object.freeze({
  thresholdLevel: 120,
  invert: false,
  foregroundHex: '#FFB000',
  backgroundHex: '#1A1100',
});

export const GREEN_PHOSPHOR_MONOCHROME: Readonly<MonochromeThresholdConfig> = Object.freeze({
  thresholdLevel: 125,
  invert: false,
  foregroundHex: '#33FF33',
  backgroundHex: '#001A00',
});
