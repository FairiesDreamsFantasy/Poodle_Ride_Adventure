import React from 'react';
import { SkylightsTexturePalette } from './Texture_Palette';
import { SkylightsPatternPalette } from './Pattern_Palette';

export const SkylightsColorPalette: React.FC<any> = (props) => {
  return (
    <div id="skylights-color-palette">
      <SkylightsTexturePalette {...props} />
      <SkylightsPatternPalette {...props} />
      {props.children}
    </div>
  );
};
