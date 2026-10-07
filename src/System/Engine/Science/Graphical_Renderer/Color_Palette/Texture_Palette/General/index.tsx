import React from 'react';

export interface TextureConfig {
  opacity: number;
  blendMode: GlobalCompositeOperation;
}

export const DEFAULT_TEXTURE_CONFIG: TextureConfig = {
  opacity: 0.15,
  blendMode: 'overlay'
};
