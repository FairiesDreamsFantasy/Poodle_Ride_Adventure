import React from 'react';
import { GeneralTiles } from './General';
import { TilesAnimations } from './Animations';
import { Tiles2D } from './2-D';
import { Tiles3D } from './3-D';
import { TilesPolygons } from './Polygons';
import { TilesPixelations } from './Pixelations';
import { TilesGeometry } from './Geometry';
import { TilesColorPalette } from './Color_Palette';

export const Tiles: React.FC<any> = (props) => {
  return (
    <GeneralTiles {...props}>
      <TilesAnimations {...props} />
      <Tiles2D {...props} />
      <Tiles3D {...props} />
      <TilesPolygons {...props} />
      <TilesPixelations {...props} />
      <TilesGeometry {...props} />
      <TilesColorPalette {...props} />
    </GeneralTiles>
  );
};

export { };
