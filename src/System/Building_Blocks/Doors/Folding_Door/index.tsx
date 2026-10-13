import React from 'react';

export interface FoldingDoorConfig {
  id: string;
  width: number;
  height: number;
  leafCount: number;
  material: 'Wood' | 'PVC' | 'Aluminum';
  foldProgress: number;
}

export const defaultFoldingDoor: FoldingDoorConfig = {
  id: 'standard_folding_door',
  width: 8.0,
  height: 7.0,
  leafCount: 4,
  material: 'Wood',
  foldProgress: 0,
};

export default defaultFoldingDoor;
