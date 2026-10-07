import React from 'react';

export interface FrenchDoorsConfig {
  id: string;
  width: number;
  height: number;
  paneCount: number;
  material: 'Wood_Glass' | 'Aluminum_Glass';
  isOpen: boolean;
}

export const defaultFrenchDoors: FrenchDoorsConfig = {
  id: 'standard_french_doors',
  width: 6.0,
  height: 8.0,
  paneCount: 8,
  material: 'Wood_Glass',
  isOpen: false,
};

export default defaultFrenchDoors;
