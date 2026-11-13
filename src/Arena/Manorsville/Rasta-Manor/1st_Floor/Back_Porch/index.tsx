export * from '@/src/Arena/Manorsville/Rasta-Manor/1st_Floor/Back_Porch/Wall';

import { BackPorchWallRegistry } from '@/src/Arena/Manorsville/Rasta-Manor/1st_Floor/Back_Porch/Wall';

export const BACK_PORCH_CONFIG = {
  name: 'Back Porch',
  description: 'The scenic outdoor relaxation area.',
};

export const BackPorch = {
  ...BACK_PORCH_CONFIG,
  walls: BackPorchWallRegistry
};
