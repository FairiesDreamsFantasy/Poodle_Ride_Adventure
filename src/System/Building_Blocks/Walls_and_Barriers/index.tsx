import React from 'react';
import { GeneralWallsAndBarriers } from './General';
import { WallsAndBarriersAnimations } from './Animations';
import { WallsAndBarriers2D } from './2-D';
import { WallsAndBarriers3D } from './3-D';
import { WallsAndBarriersPolygons } from './Polygons';
import { WallsAndBarriersPixelations } from './Pixelations';
import { WallsAndBarriersGeometry } from './Geometry';
import { WallsAndBarriersColorPalette } from './Color_Palette';
import { Wall } from './Wall';

export const WallsAndBarriers: React.FC<any> = (props) => {
  return (
    <GeneralWallsAndBarriers {...props}>
      <Wall {...props} />
      <WallsAndBarriersAnimations {...props} />
      <WallsAndBarriers2D {...props} />
      <WallsAndBarriers3D {...props} />
      <WallsAndBarriersPolygons {...props} />
      <WallsAndBarriersPixelations {...props} />
      <WallsAndBarriersGeometry {...props} />
      <WallsAndBarriersColorPalette {...props} />
    </GeneralWallsAndBarriers>
  );
};

export { Wall };
