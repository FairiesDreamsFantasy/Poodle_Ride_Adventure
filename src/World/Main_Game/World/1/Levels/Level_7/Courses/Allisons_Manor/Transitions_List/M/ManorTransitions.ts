import { GameState } from '../../../../../../../../../../System/Engine/Core/Types';

export interface Transition {
  id: string;
  fromArea: string;
  toArea: string;
  triggerX: [number, number];
  triggerY: [number, number];
  targetX: number;
  targetY: number;
  description: string;
}

export const MANOR_TRANSITIONS: Transition[] = [
  {
    id: 'foyer_to_2nd_floor',
    fromArea: 'AllisonsFoyer',
    toArea: 'Allisons2ndFloor',
    triggerX: [0, 100],
    triggerY: [0, 100],
    targetX: 500,
    targetY: 500,
    description: 'Ascending the ramp to the second floor.'
  },
  {
    id: '2nd_to_3rd_floor',
    fromArea: 'Allisons2ndFloor',
    toArea: 'Allisons3rdFloor',
    triggerX: [0, 100],
    triggerY: [0, 100],
    targetX: 500,
    targetY: 500,
    description: 'Ascending the ramp to the third floor.'
  }
];
