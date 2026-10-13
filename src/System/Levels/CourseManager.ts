import { GameState } from '../AI/In-Game/Logic/GameLogic';

export type CourseArea = 
  | 'AdventurePath' 
  | 'HedgePath' 
  | 'RastafariCave' 
  | 'Overpass' 
  | 'Suburb' 
  | 'OpenTrench' 
  | 'FinishLine';

export interface CourseSegment {
  area: CourseArea;
  length: number; // in feet
  description: string;
}

export const ADVENTURE_COURSE: CourseSegment[] = [
  {
    area: 'AdventurePath',
    length: 2640, // 0.5 miles
    description: "Rasta-Manor Path: A 0.5-mile path starting from the Adventure House."
  },
  {
    area: 'HedgePath',
    length: 2640, // 0.5 miles
    description: "Hedge Path: A 0.5-mile hedge path with bushes to jump over."
  },
  {
    area: 'RastafariCave',
    length: 2640, // 0.5 miles
    description: "Rasta-Cave: A 0.5-mile indoor cave."
  },
  {
    area: 'Overpass',
    length: 2640, // 0.5 miles
    description: "Trench Path: A 0.5-mile overpass."
  }
];

export function getCourseProgress(state: GameState) {
  // In Adventure Path mode, gridY is the distance from the start
  return state.gridY;
}

export function checkCourseTransition(state: GameState): GameState {
  const currentArea = state.area as CourseArea;
  const segmentIndex = ADVENTURE_COURSE.findIndex(s => s.area === currentArea);
  
  if (segmentIndex === -1) return state;
  
  const segment = ADVENTURE_COURSE[segmentIndex];
  if (state.gridY >= segment.length) {
    const nextSegment = ADVENTURE_COURSE[segmentIndex + 1];
    if (nextSegment) {
      return {
        ...state,
        area: nextSegment.area as any,
        gridY: 10, // Reset distance for next segment
        rampStepCount: 0,
        isAdventurePathActive: true,
        showInterstitialAd: false, // Remove ads between segments
        currentAdLevel: state.currentAdLevel
      };
    } else {
      // Finished the course, progress to next level
      const currentLevelNum = typeof state.level === 'number' ? state.level : 0;
      const nextLevelNum = currentLevelNum + 1;
      return {
        ...state,
        level: nextLevelNum as any,
        area: 'WandaPlatform' as any, // Default drop-in area for new level
        gridY: 10,
        gridX: 50, // Center on 100x100 platform
        rampStepCount: 0,
        isAdventurePathActive: false,
        showInterstitialAd: true,
        currentAdLevel: (state.currentAdLevel % 3) + 1,
        screenReaderText: `FINISH LINE! You have reached the end of the course and advanced to Level ${nextLevelNum}.`
      };
    }
  }
  
  return state;
}
