import React from 'react';

export interface FontConfig {
  fontFamily: string;
  fontSize: string;
  weight: string;
}

export const DEFAULT_FONT_CONFIG: FontConfig = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '12px',
  weight: 'normal'
};
