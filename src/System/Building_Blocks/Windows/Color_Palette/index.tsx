import React from 'react';
import { WindowsTexturePalette } from './Texture_Palette';
import { WindowsPatternPalette } from './Pattern_Palette';

export const WindowsColorPalette: React.FC<any> = (props) => {
  return (
    <div id="windows-color-palette">
      <WindowsTexturePalette {...props} />
      <WindowsPatternPalette {...props} />
      {props.children}
    </div>
  );
};
