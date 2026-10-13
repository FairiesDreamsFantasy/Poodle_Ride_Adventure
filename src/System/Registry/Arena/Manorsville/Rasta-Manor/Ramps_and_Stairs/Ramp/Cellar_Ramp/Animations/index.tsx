import { CellarRamp3DAnimations } from './3-D';
import { CellarRamp2DAnimations } from './2-D';
import { CellarRampPolygons } from './Polygons';
import { CellarRampPixelations } from './Pixelations';
import { CellarRampGeometry } from './Geometry';
import { CellarRampColorPalette } from './Color_Palette';

export const CellarRampAnimations = {
  threeD: CellarRamp3DAnimations,
  twoD: CellarRamp2DAnimations,
  polygons: CellarRampPolygons,
  pixelations: CellarRampPixelations,
  geometry: CellarRampGeometry,
  colorPalette: CellarRampColorPalette,
};

export default CellarRampAnimations;
