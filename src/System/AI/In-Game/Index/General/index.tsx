export * from '../../Engine/index.tsx';
export * from '../../Drift_Guard/index.tsx';
export * from '../../Reverb_Control/index.tsx';
export { checkInternalReverbStatus, getDynamicEchoToggle, getPoodleEchoDelays } from '../../Reverb_Control/index.tsx';
export * from '../../Category/index.tsx';
export * from '../../Algorithms/index.tsx';
export * from '../../Puzzle_Recognition/index.tsx';
export * from '../../Logic/GameLogic.ts';

export const InGameMasterIndexGeneral = {
  version: '1.0.0',
  title: 'Poodle Ride Adventure In-Game AI Master Index',
  subsystems: [
    'Engine',
    'Drift_Guard',
    'Reverb_Control',
    'Category',
    'Algorithms',
    'Puzzle_Recognition',
    'Logic',
  ],
};
