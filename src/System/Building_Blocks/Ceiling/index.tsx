export * from './Color_Palette';
export * from './Geometry';
export * from './Animations';
export * from './2-D';
export * from './3-D';
export * from './Polygons';
export * from './Pixelations';
export * from './General';

import { CEILING_PALETTE } from './Color_Palette';

export const CEILING_REGISTRY = {
  palette: CEILING_PALETTE,
  defaultColorId: 'color_alabaster_white',
  defaultPatternId: 'pattern_smooth_plaster',
  defaultTextureId: 'texture_satin_matte'
};
