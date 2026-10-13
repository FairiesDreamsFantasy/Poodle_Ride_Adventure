import React from 'react';
import { RampsTexturePalette } from './Texture_Palette';
import { RampsPatternPalette } from './Pattern_Palette';

export const RampsColorPalette: React.FC<any> = (props) => {
  return (
    <div id="ramps-color-palette">
      <RampsTexturePalette {...props} />
      <RampsPatternPalette {...props} />
      {props.children}
    </div>
  );
};
