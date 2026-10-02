import { CentralGlass2DAnimationsRegistry } from './2-D';
import { CentralGlass3DAnimationsRegistry } from './3-D';
import { CentralGlassPolygonsRegistry } from './Polygons';
import { CentralGlassPixelationsRegistry } from './Pixelations';
import { CentralGlassColorPaletteRegistry } from './Color_Palette';
import { CentralGlassGeometryRegistry } from './Geometry';

/**
 * Central Glass & Brass Barrier Animations Registry
 */
export const CentralGlassAnimationsRegistry = {
  twoD: CentralGlass2DAnimationsRegistry,
  threeD: CentralGlass3DAnimationsRegistry,
  polygons: CentralGlassPolygonsRegistry,
  pixelations: CentralGlassPixelationsRegistry,
  colorPalette: CentralGlassColorPaletteRegistry,
  geometry: CentralGlassGeometryRegistry,
};

export default CentralGlassAnimationsRegistry;
