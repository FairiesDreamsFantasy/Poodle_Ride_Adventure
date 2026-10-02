/**
 * Pink House Transition Logic
 * [PRESERVED ARTISTIC CRAFT]
 */
import { GameState, Direction } from '../../../../../../../../../System/Engine/Core/Types';
import { isNorthward, isSouthward, isEastward, isWestward } from '../../../../../../../../../System/Engine/Core/Utils/Direction';

export const handlePinkHouseTransitions = (state: GameState, direction: Direction, nextX: number, nextY: number, currentDims: { width: number, height: number }) => {
  const { area } = state;

  // 1. Foyer Transitions
  if (area === 'PinkHouseFoyer') {
    // West Door (Entrance/Exit to course)
    if (isWestward(direction) && nextX <= 5) {
      if (nextY >= 230 && nextY <= 270) {
        return {
          nextArea: 'PoodleRideStoryBookInitialPath',
          nextX: 395,
          nextY: 25,
          msg: "You leave the Pink House and return to the initial path.",
        };
      }
    }
    // East Door (To Hallway/Tea Room)
    if (isEastward(direction) && nextX >= currentDims.width - 5) {
      // Gate to the Story Book Adventure Course (North end of East wall)
      if (nextY >= 10 && nextY <= 90) {
        return {
          nextArea: 'PoodleRideStoryBookCourse1_Seg1',
          nextX: 5,
          nextY: 25,
          msg: "You ride through the ornate North Gate at the East end of the foyer and enter the Story Book Adventure Course!",
        };
      }
      // Door to Tea Room (Center of East wall)
      if (nextY >= 230 && nextY <= 270) {
        return {
          nextArea: 'PinkHouseTeaRoom',
          nextX: 10,
          nextY: 200,
          msg: "You pass through the sliding wooden doors into the Silver Tea Room.",
        };
      }
    }
  }

  // 2. Tea Room Transitions
  if (area === 'PinkHouseTeaRoom') {
    // West Door (Back to Foyer)
    if (isWestward(direction) && nextX <= 5) {
      if (nextY >= 180 && nextY <= 220) {
        return {
          nextArea: 'PinkHouseFoyer',
          nextX: 490,
          nextY: 250,
          msg: "You return to the Foyer.",
        };
      }
    }
    // South Door (To Dining Room)
    // "The Dining room is connected to a tea room with a door at its south end."
    // "positioned at 380 to 390 feet markers from a tea room's west wall."
    if (isSouthward(direction) && nextY <= 5) {
      if (nextX >= 370 && nextX <= 410) {
         return {
           nextArea: 'PinkHouseDiningRoom',
           nextX: 390,
           nextY: 590, // Enter Dining Room from North
           msg: "The door slides west as you enter the Dining Room.",
         };
      }
    }
    // East Door (Backdoor to the Course)
    // "positioned at the center of the east wall (190 to 210 feet markers from the south wall)"
    if (isEastward(direction) && nextX >= currentDims.width - 5) {
       if (nextY >= 180 && nextY <= 220) {
         return {
           nextArea: 'PoodleRideStoryBookCourse1_Seg1',
           nextX: 5,
           nextY: 200,
           msg: "You open the ornate backdoor of the Tea Room and enter the Story Book Course!",
         };
       }
    }
  }

  // 3. Dining Room Transitions
  if (area === 'PinkHouseDiningRoom') {
    // North Door (To Tea Room)
    if (isNorthward(direction) && nextY >= currentDims.height - 5) {
      if (nextX >= 370 && nextX <= 400) {
        return {
          nextArea: 'PinkHouseTeaRoom',
          nextX: 385,
          nextY: 10, // Enter Tea Room from South
          msg: "You return to the Silver Tea Room.",
        };
      }
    }
    // South Door (To Kitchen)
    if (isSouthward(direction) && nextY <= 5) {
      if (nextX >= 5 && nextX <= 40) {
        return {
          nextArea: 'PinkHouseKitchen',
          nextX: 20,
          nextY: 590, // Enter Kitchen from North
          msg: "The steel doors swing open into the Kitchen.",
        };
      }
    }
  }

  // 4. Kitchen Transitions
  if (area === 'PinkHouseKitchen') {
    // North Door (To Dining Room)
    if (isNorthward(direction) && nextY >= currentDims.height - 5) {
      if (nextX >= 5 && nextX <= 40) {
        return {
          nextArea: 'PinkHouseDiningRoom',
          nextX: 20,
          nextY: 10, // Enter Dining Room from South
          msg: "You return to the Dining Room.",
        };
      }
    }
  }

  return null;
};

