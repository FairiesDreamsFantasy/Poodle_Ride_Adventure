import React from 'react';
import { DoorsTexturePalette } from './Texture_Palette';
import { DoorsPatternPalette } from './Pattern_Palette';

export const DoorsColorPalette: React.FC<any> = (props) => {
  return (
    <div id="doors-color-palette">
      <DoorsTexturePalette {...props} />
      <DoorsPatternPalette {...props} />
      {props.children}
    </div>
  );
};
