import React from 'react';
import { BricksTexturePalette } from '@/src/System/Building_Blocks/Bricks/Color_Palette/Texture_Palette';
import { BricksPatternPalette } from '@/src/System/Building_Blocks/Bricks/Color_Palette/Pattern_Palette';

export const BricksColorPalette: React.FC<any> = (props) => {
  return (
    <div id="bricks-color-palette">
      <BricksTexturePalette {...props} />
      <BricksPatternPalette {...props} />
      {props.children}
    </div>
  );
};
