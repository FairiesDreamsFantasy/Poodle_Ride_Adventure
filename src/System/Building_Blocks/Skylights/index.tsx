import React from 'react';
import { GeneralSkylights } from './General';
import { SkylightsAnimations } from './Animations';
import { Skylights2D } from './2-D';
import { Skylights3D } from './3-D';
import { SkylightsPolygons } from './Polygons';
import { SkylightsPixelations } from './Pixelations';
import { SkylightsGeometry } from './Geometry';
import { SkylightsColorPalette } from './Color_Palette';

export const Skylights: React.FC<any> = (props) => {
  return (
    <GeneralSkylights {...props}>
      <SkylightsAnimations {...props} />
      <Skylights2D {...props} />
      <Skylights3D {...props} />
      <SkylightsPolygons {...props} />
      <SkylightsPixelations {...props} />
      <SkylightsGeometry {...props} />
      <SkylightsColorPalette {...props} />
    </GeneralSkylights>
  );
};
