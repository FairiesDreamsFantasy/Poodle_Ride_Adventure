import React from 'react';
import { GeneralCoins, generateCoins, checkCoinCollection, renderCoins, Coin } from './General';
import { CoinsAnimations } from './Animations';
import { Coins2D } from './2-D';
import { Coins3D } from './3-D';
import { CoinsPolygons } from './Polygons';
import { CoinsPixelations } from './Pixelations';
import { CoinsGeometry } from './Geometry';
import { CoinsColorPalette } from './Color_Palette';

export const Coins: React.FC<any> = (props) => {
  return (
    <GeneralCoins {...props}>
      <CoinsAnimations {...props} />
      <Coins2D {...props} />
      <Coins3D {...props} />
      <CoinsPolygons {...props} />
      <CoinsPixelations {...props} />
      <CoinsGeometry {...props} />
      <CoinsColorPalette {...props} />
    </GeneralCoins>
  );
};

export { generateCoins, checkCoinCollection, renderCoins };
export type { Coin };
