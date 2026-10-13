import React from 'react';
import { TilesTexturePalette } from './Texture_Palette';
import { TilesPatternPalette } from './Pattern_Palette';

export const TilesColorPalette: React.FC<any> = (props) => {
  return (
    <div id="tiles-color-palette">
      <TilesTexturePalette {...props} />
      <TilesPatternPalette {...props} />
      {props.children}
    </div>
  );
};
