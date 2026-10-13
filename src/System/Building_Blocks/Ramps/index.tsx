import React from 'react';
import { GeneralRamps } from './General';
import { RampsAnimations } from './Animations';
import { Ramps2D } from './2-D';
import { Ramps3D } from './3-D';
import { RampsPolygons } from './Polygons';
import { RampsPixelations } from './Pixelations';
import { RampsGeometry } from './Geometry';
import { RampsColorPalette } from './Color_Palette';

export const Ramps: React.FC<any> = (props) => {
  return (
    <GeneralRamps {...props}>
      <RampsAnimations {...props} />
      <Ramps2D {...props} />
      <Ramps3D {...props} />
      <RampsPolygons {...props} />
      <RampsPixelations {...props} />
      <RampsGeometry {...props} />
      <RampsColorPalette {...props} />
    </GeneralRamps>
  );
};
