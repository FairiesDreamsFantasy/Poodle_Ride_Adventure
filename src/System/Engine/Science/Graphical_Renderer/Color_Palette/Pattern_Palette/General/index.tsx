import React from 'react';

export interface PatternType {
  id: 'stripes' | 'grid' | 'dots';
  density: number;
}

export const DEFAULT_PATTERN: PatternType = {
  id: 'grid',
  density: 10
};
