import React from 'react';
import { CoinsTexturePalette } from './Texture_Palette';
import { CoinsPatternPalette } from './Pattern_Palette';

export const CoinsColorPalette: React.FC<any> = (props) => {
  return (
    <div id="coins-color-palette">
      <CoinsTexturePalette {...props} />
      <CoinsPatternPalette {...props} />
      {props.children}
    </div>
  );
};
