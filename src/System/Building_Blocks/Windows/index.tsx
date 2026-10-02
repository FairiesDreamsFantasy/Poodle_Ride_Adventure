import React from 'react';
import { GeneralWindows } from './General';
import { WindowsAnimations } from './Animations';
import { Windows2D } from './2-D';
import { Windows3D } from './3-D';
import { WindowsPolygons } from './Polygons';
import { WindowsPixelations } from './Pixelations';
import { WindowsGeometry } from './Geometry';
import { WindowsColorPalette } from './Color_Palette';

export const Windows: React.FC<any> = (props) => {
  return (
    <GeneralWindows {...props}>
      <WindowsAnimations {...props} />
      <Windows2D {...props} />
      <Windows3D {...props} />
      <WindowsPolygons {...props} />
      <WindowsPixelations {...props} />
      <WindowsGeometry {...props} />
      <WindowsColorPalette {...props} />
    </GeneralWindows>
  );
};
