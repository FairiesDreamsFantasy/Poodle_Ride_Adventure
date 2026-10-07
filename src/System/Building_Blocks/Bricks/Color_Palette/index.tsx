import React from 'react';
import { BricksTexturePalette } from './Texture_Palette';
import { BricksPatternPalette } from './Pattern_Palette';

export const BricksColorPalette: React.FC<any> = (props) => {
  return (
    <div id="bricks-color-palette">
      <BricksTexturePalette {...props} />
      <BricksPatternPalette {...props} />
      {props.children}
    </div>
  );
};
