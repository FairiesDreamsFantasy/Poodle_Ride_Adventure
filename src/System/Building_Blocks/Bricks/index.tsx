import React from 'react';
import { GeneralBricks } from './General';
import { BricksAnimations } from './Animations';
import { Bricks2D } from './2-D';
import { Bricks3D } from './3-D';
import { BricksPolygons } from './Polygons';
import { BricksPixelations } from './Pixelations';
import { BricksGeometry } from './Geometry';
import { BricksColorPalette } from './Color_Palette';

export const Bricks: React.FC<any> = (props) => {
  return (
    <GeneralBricks {...props}>
      <BricksAnimations {...props} />
      <Bricks2D {...props} />
      <Bricks3D {...props} />
      <BricksPolygons {...props} />
      <BricksPixelations {...props} />
      <BricksGeometry {...props} />
      <BricksColorPalette {...props} />
    </GeneralBricks>
  );
};

export { };
