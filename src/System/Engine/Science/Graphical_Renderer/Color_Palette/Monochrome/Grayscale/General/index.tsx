import React from 'react';

export interface GrayscaleConfig {
  useLuma: boolean;
}

export const DEFAULT_GRAYSCALE_CONFIG: GrayscaleConfig = {
  useLuma: true
};
