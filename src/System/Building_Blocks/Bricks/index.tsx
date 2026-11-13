import React from 'react';
import { GeneralBricks } from '@/src/System/Building_Blocks/Bricks/General';
import { BricksAnimations } from '@/src/System/Building_Blocks/Bricks/Animations';
import { Bricks2D } from '@/src/System/Building_Blocks/Bricks/2-D';
import { Bricks3D } from '@/src/System/Building_Blocks/Bricks/3-D';
import { BricksPolygons } from '@/src/System/Building_Blocks/Bricks/Polygons';
import { BricksPixelations } from '@/src/System/Building_Blocks/Bricks/Pixelations';
import { BricksGeometry } from '@/src/System/Building_Blocks/Bricks/Geometry';
import { BricksColorPalette } from '@/src/System/Building_Blocks/Bricks/Color_Palette';

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
