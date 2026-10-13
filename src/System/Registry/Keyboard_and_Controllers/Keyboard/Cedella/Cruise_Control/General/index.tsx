export interface CedellaCruiseControlConfig {
  keyIncrease: string;
  keyDecrease: string;
  stepSize: number;
  maxSpeed: number;
  minSpeed: number;
  description: string;
}

export const CEDELLA_CRUISE_CONTROL_GENERAL: CedellaCruiseControlConfig = {
  keyIncrease: 'BracketRight (])',
  keyDecrease: 'BracketLeft ([)',
  stepSize: 5,
  maxSpeed: 100,
  minSpeed: -50,
  description: 'Cedella Cruise Control maintains continuous automatic pacing without requiring constant key holding.'
};
