export * from '@/src/System/AI/In-Game/Engine/index.tsx';
export * from '@/src/System/AI/In-Game/Drift_Guard/index.tsx';
export * from '@/src/System/AI/In-Game/Reverb_Control/index.tsx';
export { checkInternalReverbStatus, getDynamicEchoToggle, getPoodleEchoDelays } from '@/src/System/AI/In-Game/Reverb_Control/index.tsx';
export * from '@/src/System/AI/In-Game/Category/index.tsx';
export * from '@/src/System/AI/In-Game/Algorithms/index.tsx';
export * from '@/src/System/AI/In-Game/Puzzle_Recognition/index.tsx';
export * from '@/src/System/AI/In-Game/Logic/GameLogic.ts';

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
