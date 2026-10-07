import React from 'react';
import { WallsAndBarriersTexturePalette } from './Texture_Palette';
import { WallsAndBarriersPatternPalette } from './Pattern_Palette';

export const WallsAndBarriersColorPalette: React.FC<any> = (props) => {
  return (
    <div id="walls-and-barriers-color-palette">
      <WallsAndBarriersTexturePalette {...props} />
      <WallsAndBarriersPatternPalette {...props} />
      {props.children}
    </div>
  );
};
