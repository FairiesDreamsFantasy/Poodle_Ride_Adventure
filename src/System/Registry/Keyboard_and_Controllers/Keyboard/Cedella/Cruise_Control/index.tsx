export * from './General';

export const CEDELLA_CRUISE_CONTROL = {
  id: 'Cedella_Cruise_Control',
  layout: 'Cedella',
  version: '1.0.0',
  controls: {
    accelerate: 'BracketRight',
    decelerate: 'BracketLeft',
    increment: 5,
    maxSpeed: 100,
    minSpeed: -50,
  },
  status: 'ACTIVE_STANDARDIZED'
};
