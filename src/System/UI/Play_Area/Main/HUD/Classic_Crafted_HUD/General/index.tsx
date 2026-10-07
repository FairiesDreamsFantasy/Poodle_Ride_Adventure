import React from 'react';

export interface ClassicHUDConfig {
  theme: 'classic' | 'modern';
  showDetails: boolean;
}

export const DEFAULT_CLASSIC_HUD_CONFIG: ClassicHUDConfig = {
  theme: 'classic',
  showDetails: true
};
