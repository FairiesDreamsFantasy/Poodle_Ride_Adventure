import React from 'react';

export interface DotMatrixConfig {
  dotSize: number;
  spacing: number;
  colorFilter?: string;
}

export const DEFAULT_DOT_MATRIX_CONFIG: DotMatrixConfig = {
  dotSize: 2,
  spacing: 4,
  colorFilter: undefined
};
