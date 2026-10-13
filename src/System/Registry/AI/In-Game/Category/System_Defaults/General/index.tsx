/**
 * Master Registry constants for all gameplay, accessibility, and UI defaults.
 */

export interface SystemDefaultsRegistry {
  accessibility: {
    ttsMode: 'ON' | 'ON_LOCAL' | 'OFF';
    notifications: {
      pettingDescription: boolean;
      collarGraspDescription: boolean;
      leanDescription: boolean;
      describeLoveLogic: boolean;
    };
  };
  audio: {
    masterVolume: number; // 0.0 to 1.0
    baseBarkVolume: number; // baseline gain
    initialBarkSynthesis: 'BOW' | 'Classic';
    slidingDoorVolumeRatio: number; // sliding door to bark gain ratio (1.25)
  };
  ui: {
    theme: 'Regular' | 'Cozy' | 'Comfortable' | 'Quilted';
    initialSelectedPoodle: string; // "Abigay_Rose_Kone"
    hudPlacementAboveCanvas: boolean; // Must remain true (Version 0.9.9.7 constraint)
    nightModeRange: { startHour: number; endHour: number }; // 16 to 3
    copyright: string;
    license: string;
  };
  controls: {
    keyboardLayout: 'Arden Denis' | 'WASD' | 'Arrows';
    emulatedJoystickNumpadEnabled: boolean; // Cedella layout
    smoothRotationSpeedDegSec: number; // 180 deg/sec
  };
}

export const MasterSystemDefaults: SystemDefaultsRegistry = {
  accessibility: {
    ttsMode: 'ON',
    notifications: {
      pettingDescription: true,
      collarGraspDescription: true,
      leanDescription: true,
      describeLoveLogic: true,
    },
  },
  audio: {
    masterVolume: 1.0,
    baseBarkVolume: 0.5125,
    initialBarkSynthesis: 'BOW',
    slidingDoorVolumeRatio: 1.25,
  },
  ui: {
    theme: 'Regular',
    initialSelectedPoodle: 'Abigay_Rose_Kone',
    hudPlacementAboveCanvas: true,
    nightModeRange: { startHour: 16, endHour: 3 },
    copyright: 'Fairies Dreams & Fantasy Arcade Staff',
    license: 'Licensed under CC BY-SA 4.0 & GNU GPLv3',
  },
  controls: {
    keyboardLayout: 'Arden Denis',
    emulatedJoystickNumpadEnabled: true,
    smoothRotationSpeedDegSec: 180,
  },
};
