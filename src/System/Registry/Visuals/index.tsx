/**
 * Visuals Registry
 * Registry for visual components and rendering logic.
 */

import { Visuals } from '../../Visuals';
import * as ColorPaletteRegistry from './Animations/Color_Palette/Monochrome';

export const VisualsRegistry = {
  core: Visuals,
  ColorPalette: ColorPaletteRegistry,
};

export * from './Engine';
export { ColorPaletteRegistry };

