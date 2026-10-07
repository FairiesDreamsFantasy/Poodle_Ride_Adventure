export * from './General';

export const ARDEN_DENIS_CRUISE_CONTROL = {
  id: 'Arden_Denis_Cruise_Control',
  layout: 'Arden Denis',
  version: '1.0.0',
  controls: {
    accelerate: 'KeyI',
    decelerate: 'KeyK',
    increment: 5,
    maxSpeed: 100,
    minSpeed: -50,
  },
  status: 'ACTIVE_STANDARDIZED'
};
