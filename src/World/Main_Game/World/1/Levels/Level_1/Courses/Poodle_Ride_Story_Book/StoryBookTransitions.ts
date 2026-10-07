/**
 * Story Book Course Transition Logic
 */
import { GameState, Direction } from '../../../../../../../../System/Engine/Core/Types';

export const handleStoryBookCourseTransitions = (state: GameState, direction: Direction, nextX: number, nextY: number, currentDims: { width: number, height: number }) => {
  // --- SEGMENT 1 ---
  if (state.area === 'PoodleRideStoryBookCourse1_Seg1') {
    if (nextX <= 1) {
      return {
        nextArea: 'PinkHouseFoyer',
        nextX: 490,
        nextY: 50,
        msg: "You ride back through the North Gate and return to the foyer of the Pink House.",
      };
    }
    if (nextX >= 498) {
      return {
        nextArea: 'PoodleRideStoryBookCourse1_Break1',
        nextX: 5,
        nextY: 25,
        msg: "You complete the first segment and enter a reading break area.",
      };
    }
  }

  // --- BREAK 1 ---
  if (state.area === 'PoodleRideStoryBookCourse1_Break1') {
    if (nextX <= 1) return { nextArea: 'PoodleRideStoryBookCourse1_Seg1', nextX: 495, nextY: 25 };
    if (nextX >= 48) return { nextArea: 'PoodleRideStoryBookCourse1_Seg2', nextX: 5, nextY: 25, msg: "Segment 2 begins!" };
  }

  // --- SEGMENT 2 ---
  if (state.area === 'PoodleRideStoryBookCourse1_Seg2') {
    if (nextX <= 1) return { nextArea: 'PoodleRideStoryBookCourse1_Break1', nextX: 45, nextY: 25 };
    if (nextX >= 498) return { nextArea: 'PoodleRideStoryBookCourse1_Break2', nextX: 5, nextY: 25, msg: "You reach the second reading break." };
  }

  // --- BREAK 2 ---
  if (state.area === 'PoodleRideStoryBookCourse1_Break2') {
    if (nextX <= 1) return { nextArea: 'PoodleRideStoryBookCourse1_Seg2', nextX: 495, nextY: 25 };
    if (nextX >= 48) return { nextArea: 'PoodleRideStoryBookCourse1_Seg3', nextX: 5, nextY: 25, msg: "Segment 3 begins!" };
  }

  // --- SEGMENT 3 ---
  if (state.area === 'PoodleRideStoryBookCourse1_Seg3') {
    if (nextX <= 1) return { nextArea: 'PoodleRideStoryBookCourse1_Break2', nextX: 45, nextY: 25 };
    if (nextX >= 498) return { nextArea: 'PoodleRideStoryBookCourse1_Break3', nextX: 5, nextY: 25, msg: "You reach the final reading break." };
  }

  // --- BREAK 3 ---
  if (state.area === 'PoodleRideStoryBookCourse1_Break3') {
    if (nextX <= 1) return { nextArea: 'PoodleRideStoryBookCourse1_Seg3', nextX: 495, nextY: 25 };
    if (nextX >= 48) return { nextArea: 'PoodleRideStoryBookCourse1_Seg4', nextX: 10, nextY: 25, msg: "The final segment begins!" };
  }

  // --- SEGMENT 4 ---
  if (state.area === 'PoodleRideStoryBookCourse1_Seg4') {
    if (nextX <= 1) return { nextArea: 'PoodleRideStoryBookCourse1_Break3', nextX: 45, nextY: 25 };
    if (nextX >= 995) return { nextArea: 'PoodleRideStoryBookGoalZone', nextX: 25, nextY: 45, msg: "You have reached the Goal Zone!" };
  }

  // --- GOAL ZONE ---
  if (state.area === 'PoodleRideStoryBookGoalZone') {
    if (nextY <= 5) {
       // Star requirement check
       const hasStar = state.score >= 1000;
       if (hasStar) {
          return {
            nextArea: 'WandasWarpHouse',
            nextX: 250,
            nextY: 10,
            msg: "You ride through the portal gate and return to the Warp Hub!",
          };
       } else {
          return { isBlocked: true, msg: "The portal gate is locked. You need a bronze star to pass." };
       }
    }
    if (nextY >= 48) return { nextArea: 'PoodleRideStoryBookCourse1_Seg4', nextX: 990, nextY: 25 };
  }

  if (state.area === 'PoodleRideStoryBookInitialPath') {
    // Transition to Pink House (East End)
    if (nextX >= 398) {
      return {
        nextArea: 'PinkHouseFoyer',
        nextX: 10,
        nextY: 250, 
        msg: "The sliding wooden doors of the Pink House open before you.",
      };
    }

    // Return to Decision Zone (West End)
    if (nextX <= 1) {
      return {
        nextArea: 'PoodleRideStoryBookDecisionZone',
        nextX: 45,
        nextY: 25,
        msg: "You ride back through the gates into the decision zone.",
      };
    }
  }

  if (state.area === 'PoodleRideStoryBookDecisionZone') {
    // East Gate to Initial Path
    if (nextX >= 48) {
      return {
        nextArea: 'PoodleRideStoryBookInitialPath',
        nextX: 5,
        nextY: 25,
        msg: "You ride through the wooden gates onto the initial path to the Pink House.",
      };
    }
  }
  return null;
};
