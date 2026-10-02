export interface KeyboardAndControllersRegistryIndexGeneral {
  registeredLayouts: string[];
  features: string[];
  standardization: string;
}

export const KEYBOARD_AND_CONTROLLERS_REGISTRY_GENERAL: KeyboardAndControllersRegistryIndexGeneral = {
  registeredLayouts: ['Cedella', 'Arden Denis', 'Standard', 'Global'],
  features: [
    'Cruise Control (Cedella: ]/[, Arden Denis: i/k)',
    'Independent Arrow Keys',
    'Numeric Keypad Emulated Joystick (Cedella)',
    'Discrete 45-Degree Snapping Rotation (Arden Denis)',
    'Dynamic Cooldown Scaling'
  ],
  standardization: 'STANDARDIZED_2026'
};
