export interface ArdenDenisCruiseControlConfig {
  keyIncrease: string;
  keyDecrease: string;
  stepSize: number;
  maxSpeed: number;
  minSpeed: number;
  description: string;
}

export const ARDEN_DENIS_CRUISE_CONTROL_GENERAL: ArdenDenisCruiseControlConfig = {
  keyIncrease: 'KeyI (i)',
  keyDecrease: 'KeyK (k)',
  stepSize: 5,
  maxSpeed: 100,
  minSpeed: -50,
  description: 'Arden Denis Cruise Control maintains continuous automatic pacing without requiring constant key holding.'
};
