import { FoyerSkyRamp3DAnimations } from './3-D';
import { FoyerSkyRamp2DAnimations } from './2-D';
import { FoyerSkyRampPolygons } from './Polygons';
import { FoyerSkyRampPixelations } from './Pixelations';
import { FoyerSkyRampGeometry } from './Geometry';
import { FoyerSkyRampColorPalette } from './Color_Palette';

export const FoyerSkyRampAnimations = {
  threeD: FoyerSkyRamp3DAnimations,
  twoD: FoyerSkyRamp2DAnimations,
  polygons: FoyerSkyRampPolygons,
  pixelations: FoyerSkyRampPixelations,
  geometry: FoyerSkyRampGeometry,
  colorPalette: FoyerSkyRampColorPalette,
};

export default FoyerSkyRampAnimations;
