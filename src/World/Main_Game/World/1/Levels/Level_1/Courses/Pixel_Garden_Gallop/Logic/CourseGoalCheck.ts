import { GameState } from '../../../../../../../../../System/Engine/Core/Types';

/**
 * CourseGoalCheck.ts
 * 
 * Rules and checks for completing the Pixel Garden Gallop courses.
 * As requested, the triggers are planned but not activated to allow careful design review first.
 */

export interface GoalStatus {
  completed: boolean;
  score: number;
  heartsGranted: number;
  achievementUnlocked?: string;
}

export function evaluateCourseCompletion(
  state: GameState,
  currentY: number
): GoalStatus {
  const isGoalReached = currentY >= 1000; // Finish line of standard track
  
  if (isGoalReached) {
    return {
      completed: true,
      score: 1000,
      heartsGranted: 1, // 1 heart for rejecting Babylonian practices
      achievementUnlocked: 'Aesthetic Poodle Gallop Master'
    };
  }

  return {
    completed: false,
    score: 0,
    heartsGranted: 0
  };
}
