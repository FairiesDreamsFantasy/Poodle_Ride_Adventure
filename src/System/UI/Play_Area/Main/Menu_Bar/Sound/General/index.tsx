import React from 'react';
import { SynthMode } from '../../../../../../../types';

export interface SoundOption {
  id: string;
  label: string;
}

export const SYNTH_MODES: { id: any; label: string }[] = [
  { id: 'Classic', label: 'Classic Engine' },
  { id: 'Advanced Yamaha', label: 'Advanced Yamaha Engine' },
  { id: 'Mix', label: 'Mix Engine' }
];
