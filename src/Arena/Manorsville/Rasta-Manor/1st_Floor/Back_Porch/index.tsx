export * from './Wall';

import { BackPorchWallRegistry } from './Wall';

export const BACK_PORCH_CONFIG = {
  name: 'Back Porch',
  description: 'The scenic outdoor relaxation area.',
};

export const BackPorch = {
  ...BACK_PORCH_CONFIG,
  walls: BackPorchWallRegistry
};
