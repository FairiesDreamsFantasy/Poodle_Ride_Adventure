import { MezzanineBarrier2DAnimationsRegistry } from './2-D';
import { MezzanineBarrier3DAnimationsRegistry } from './3-D';
import { MezzanineBarrierPolygonsRegistry } from './Polygons';
import { MezzanineBarrierPixelationsRegistry } from './Pixelations';
import { MezzanineBarrierColorPaletteRegistry } from './Color_Palette';
import { MezzanineBarrierGeometryRegistry } from './Geometry';

/**
 * Mezzanine General Barrier Animations Registry
 */
export const MezzanineBarrierAnimationsRegistry = {
  twoD: MezzanineBarrier2DAnimationsRegistry,
  threeD: MezzanineBarrier3DAnimationsRegistry,
  polygons: MezzanineBarrierPolygonsRegistry,
  pixelations: MezzanineBarrierPixelationsRegistry,
  colorPalette: MezzanineBarrierColorPaletteRegistry,
  geometry: MezzanineBarrierGeometryRegistry,
};

export default MezzanineBarrierAnimationsRegistry;
