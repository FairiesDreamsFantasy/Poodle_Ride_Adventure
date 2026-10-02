import React from 'react';
import { PixelatedGardenCanvas } from '../Pixelated_Garden';
import { PoodlesAndTeaPartyCanvas } from '../Poodles_and_Tea_Party';

/**
 * System/Theme/Interstitial_Ad_Specific/General/index.tsx
 * Theme switcher for interstitial ad background decorations.
 */

export interface InterstitialThemeProps {
  theme?: 'Level0' | 'Level1' | 'Default';
}

export const InterstitialAdThemeDecoration: React.FC<InterstitialThemeProps> = ({ theme = 'Default' }) => {
  if (theme === 'Level0') {
    return <PixelatedGardenCanvas />;
  }
  if (theme === 'Level1') {
    return <PoodlesAndTeaPartyCanvas />;
  }
  return null;
};
