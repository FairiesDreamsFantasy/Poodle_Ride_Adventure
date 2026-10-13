import React from 'react';

export interface SpeedometerConfig {
  maxSpeed: number;
  unit: 'mph' | 'kph' | 'pps'; // pixels per second
}

export const DEFAULT_SPEEDOMETER_CONFIG: SpeedometerConfig = {
  maxSpeed: 20,
  unit: 'pps'
};
