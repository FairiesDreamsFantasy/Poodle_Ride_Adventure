import { Direction, GameState } from '../../../../System/Engine/Core/Types';
import { TransitionResult } from '../../../../System/Engine/Transitions';
import { ELEVATOR_TRANSITION_GALLOPS } from './ElevatorConstants';

export const handleElevatorTransitions = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  state: GameState
): TransitionResult | null => {
  // If we are in the "Elevator" transition mode (doorwayStep > 0)
  if (doorwayStep > 0 && doorwayStep <= ELEVATOR_TRANSITION_GALLOPS) {
    const isFinished = doorwayStep === ELEVATOR_TRANSITION_GALLOPS;
    
    if (isFinished) {
      return {
        nextArea: 'NarrowDressageGym' as any,
        nextX: 15,
        nextY: 1950,
        nextLevel: 'Sky',
        nextDoorwayStep: 0,
        msg: "The elevator arrives at the Narrow Dressage Gym Mezzanine.",
        isBlocked: false,
        shouldBark: true,
        barkMsg: "The Poodle Barks Elegantly",
        barkCount: 1,
        isRampStep: false,
        isDescending: false
      };
    } else {
      return {
        nextArea: state.area as any,
        nextX: gridX,
        nextY: gridY,
        nextLevel: level,
        nextDoorwayStep: doorwayStep + 1,
        msg: `The elevator is ascending. Gallop ${doorwayStep} of ${ELEVATOR_TRANSITION_GALLOPS}...`,
        isBlocked: false,
        shouldBark: true,
        barkMsg: "The Poodle Barks Elegantly",
        barkCount: 1,
        isRampStep: true,
        isDescending: false
      };
    }
  }

  return null;
};
