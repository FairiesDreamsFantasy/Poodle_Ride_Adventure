import React from 'react';

export interface PositionConfig {
  precision: number;
  showZ: boolean;
}

export const DEFAULT_POSITION_CONFIG: PositionConfig = {
  precision: 2,
  showZ: false
};
