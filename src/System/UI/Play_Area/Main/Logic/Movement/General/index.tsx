import React from 'react';
import { 
  GameState, DIRECTIONS, MOVE_COOLDOWN, getCSTTime, getLightingMode, 
  GRID_SIZE, FOYER_DESCRIPTIONS, Direction 
} from '../../../../../../AI/In-Game/Logic/GameLogic';
import { 
  formulateAreaMetrics, getEnvironmentalAcoustics, validateCoordinateIntegrity 
} from '../../../../../../AI/In-Game/Category/Arena';
import { SoundManager } from '../../../../../../Sound/SoundManager';
import { DiagnosticManager } from '../../../../../../Diagnostics/DiagnosticManager';


export interface MovementContext {
  gameStateRef: React.MutableRefObject<GameState>;
  audio: SoundManager;
  speak: (text: string, lang?: any) => void;
  announceToScreenReader: (text: string) => void;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  keysPressed: React.MutableRefObject<Set<string>>;
  lastMoveTime: React.MutableRefObject<number>;
  bark: (msg?: string, isCore?: boolean, count?: number, area?: string) => void;
  checkCollision: any;
  checkCourseTransition: any;
  generateObstacles: any;
  generateCoins: any;
  checkObstacleCollision: any;
  checkCoinCollection: any;
  checkAnnouncementFlags: any;
  getWallDescription: any;
  mt: (text: string) => string;
  setPendingState: (state: any) => void;
  setShowAd: (show: boolean) => void;
}

export function handleMoveForward(
  ctx: MovementContext,
  isTappedOverride?: boolean,
  strafeDir?: 'Left' | 'Right',
  moveAngleOverride?: number,
  isReverseMode?: boolean
) {
  const { gameStateRef, audio, speak, announceToScreenReader, setGameState, keysPressed, lastMoveTime, bark, checkCollision, checkCourseTransition, generateObstacles, generateCoins, checkObstacleCollision, checkCoinCollection, checkAnnouncementFlags, getWallDescription, mt, setPendingState, setShowAd } = ctx;
  const state = gameStateRef.current;
  if (state.isJumping || !state.isPlaying) return;

  DiagnosticManager.logInteraction('Movement', isReverseMode ? 'Reverse' : 'Forward');

  const announceEnv = (msg: string) => {
    let finalMsg = msg;
    if (isReverseMode) {
      finalMsg = finalMsg.replace(/reached/g, "backed up to");
      finalMsg = finalMsg.replace(/entered/g, "backed up into");
      finalMsg = finalMsg.replace(/to the (North|South|East|West)/g, "behind you to the $1");
    }
    speak(finalMsg, 'EN_US');
    announceToScreenReader(finalMsg);
  }

  const isShift = keysPressed.current.has('ShiftLeft') || keysPressed.current.has('ShiftRight');
  const isTapped = isTappedOverride ?? false;

  // Sound logic
  if (state.movementMode === 'Walk') {
    audio.playPoodleWalk(state.area, 0, 0, 0, state.ridingAnimal);
  } else if (state.movementMode === 'Slow Walk') {
    audio.playPoodleSlowWalk(state.area, 0, 0, 0, state.ridingAnimal);
  } else if (state.movementMode === 'Very Slow Walk') {
    audio.playPoodleVerySlowWalk(state.area, 0, 0, 0, state.ridingAnimal);
  } else if (state.movementMode === 'Trot' || state.movementMode === 'Canter' || isShift || state.movementMode === 'Gallop') {
    audio.playPoodleGallop(state.area, 0, 0, 0, state.ridingAnimal);
  } else if (isTapped) {
    audio.playPoodleScoot(state.area, 0, 0, 0, state.ridingAnimal);
  } else {
    audio.playPoodleGallop(state.area);
    if (state.isPositioningEnabled && state.area === 'Garden' && state.gridY < 100) {
      audio.playAmbientChimes(0, 0, 1);
    }
  }
  
  let { gridX, gridY, direction, area, doorwayStep, level } = state;
  let nextX = gridX;
  let nextY = gridY;
  
  let stepSize = 4;
  switch (state.movementMode) {
    case 'Very Slow Walk': stepSize = 1; break;
    case 'Slow Walk': stepSize = 2; break;
    case 'Walk': stepSize = 4; break;
    case 'Trot': stepSize = 8; break;
    case 'Canter': stepSize = 12; break;
    case 'Gallop': stepSize = 16; break;
  }

  // SCIENTIFIC MANDATE: Babylonian characters (Olga-Olivia, etc.) MUST NOT use the elegant 16-unit system.
  // They utilize jerky, superficial movement with variable offsets.
  if (state.ridingAnimal === 'Olga-Olivia' || state.ridingAnimal === 'Chloe Joseph Gray-Michaels' || state.ridingAnimal === 'Priscilla') {
    if (stepSize > 8) stepSize = 8; // Cap Babylonian speed
    // Apply jerky movement factor (non-elegant)
    const jerkyFactor = 0.85 + (Math.sin(Date.now() / 100) * 0.15); 
    stepSize *= jerkyFactor;
  }

  if (isShift && stepSize < 16) stepSize *= 1.5;
  else if (isTapped) stepSize = 1;
  
  const finalStepSize = state.isRunningJump ? stepSize * 2 : stepSize;
  const timeSinceLastMove = Math.max(MOVE_COOLDOWN, Math.min(1000, Date.now() - lastMoveTime.current));

  let moveDirection = direction;
  if (moveAngleOverride !== undefined) {
    const norm = ((moveAngleOverride % 360) + 360) % 360;
    if (norm >= 337.5 || norm < 22.5) moveDirection = 'North';
    else if (norm >= 22.5 && norm < 67.5) moveDirection = 'Northeast';
    else if (norm >= 67.5 && norm < 112.5) moveDirection = 'East';
    else if (norm >= 112.5 && norm < 157.5) moveDirection = 'Southeast';
    else if (norm >= 157.5 && norm < 202.5) moveDirection = 'South';
    else if (norm >= 202.5 && norm < 247.5) moveDirection = 'Southwest';
    else if (norm >= 247.5 && norm < 292.5) moveDirection = 'West';
    else if (norm >= 292.5 && norm < 337.5) moveDirection = 'Northwest';
  } else if (strafeDir) {
    const idx = DIRECTIONS.indexOf(direction);
    moveDirection = strafeDir === 'Right' ? DIRECTIONS[(idx + 2) % 8] : DIRECTIONS[(idx + 6) % 8];
  }

  if (state.isPositioningEnabled || moveAngleOverride !== undefined) {
    const travelRotation = moveAngleOverride !== undefined ? moveAngleOverride : state.rotation;
    const angleRad = travelRotation * Math.PI / 180;
    nextX += finalStepSize * Math.sin(angleRad);
    nextY += finalStepSize * Math.cos(angleRad);
  } else {
    switch (moveDirection) {
      case 'North': nextY += finalStepSize; break;
      case 'South': nextY -= finalStepSize; break;
      case 'East': nextX += finalStepSize; break;
      case 'West': nextX -= finalStepSize; break;
      case 'Northeast': 
        nextX += finalStepSize * 0.707; 
        nextY += finalStepSize * 0.707; 
        break;
      case 'Southeast':
        nextX += finalStepSize * 0.707;
        nextY -= finalStepSize * 0.707;
        break;
      case 'Southwest':
        nextX -= finalStepSize * 0.707;
        nextY -= finalStepSize * 0.707;
        break;
      case 'Northwest':
        nextX -= finalStepSize * 0.707;
        nextY += finalStepSize * 0.707;
        break;
    }
  }

  const collision = checkCollision(gridX, gridY, nextX, nextY, level, area, moveDirection, doorwayStep, state);

  // Elevator Logic
  const isInsideElevator = (area === 'LobbyStairwayAndRamps' || area === 'SouthwestMezzanineStairwayAndRamps' || area === 'RastaManor2ndFloor' || area === 'Cellar') &&
                           gridX >= 980 && gridX <= 1000 && gridY >= 980 && gridY <= 1000;
  
  if (isInsideElevator && !state.isJumping) {
    if (moveDirection === 'North' || moveDirection === 'South') {
      const floors: any[] = ['Cellar', 'Floor', 'Mezzanine', 'Level1', 'Level2'];
      const currentIndex = floors.indexOf(state.elevatorCurrentFloor);
      let nextIndex = currentIndex;
      if (moveDirection === 'North' && currentIndex < floors.length - 1) nextIndex++;
      else if (moveDirection === 'South' && currentIndex > 0) nextIndex--;

      if (nextIndex !== currentIndex) {
        const nextFloor = floors[nextIndex];
        audio.playElevatorMovement(1.5);
        setTimeout(() => {
          audio.playElevatorFloorBeep(gridX, gridY);
          const floorName = nextFloor === 'Floor' ? '1st Floor' : nextFloor === 'Level1' ? 'Upper Level 1' : nextFloor === 'Level2' ? 'Upper Level 2' : nextFloor;
          speak(`${floorName}`, 'EN_US');
          announceToScreenReader(`${floorName}`);
          setGameState(prev => ({ 
            ...prev, 
            elevatorCurrentFloor: nextFloor,
            level: (nextFloor === 'Level1' || nextFloor === 'Level2') ? nextFloor : (nextFloor === 'Floor' ? 'Floor' : nextFloor),
            area: nextFloor === 'Cellar' ? 'Cellar' : (nextFloor === 'Floor' ? 'LobbyStairwayAndRamps' : (nextFloor === 'Mezzanine' ? 'SouthwestMezzanineStairwayAndRamps' : prev.area))
          }));
        }, 1500);
        return;
      }
    }
  }

  if (collision.shouldBark) bark(collision.barkMsg, true, collision.barkCount, collision.barkArea);

  const obstacleResult = checkObstacleCollision({ ...state, gridX: nextX, gridY: nextY }, state.obstacles);
  if (obstacleResult.collision && obstacleResult.obstacle) {
    if (!state.isJumping) {
      audio.playBushHit();
      speak(`You hit a ${obstacleResult.obstacle.type}! You need to jump over it.`, 'EN_US');
      return;
    } else {
      audio.playPointEarned();
      setGameState(prev => ({
        ...prev,
        score: prev.score + 10,
        obstaclesJumped: prev.obstaclesJumped + 1,
        obstacles: prev.obstacles.map(o => o.id === obstacleResult.obstacle!.id ? { ...o, isJumped: true } : o)
      }));
      speak(`You jumped over a ${obstacleResult.obstacle.type}! +10 points.`, 'EN_US');
    }
  }

  if (collision.isRampStep) {
    if (state.area === 'Soca_Path') {
      const freq = 660 + Math.cos(collision.nextY / 800) * 220;
      audio.playCustomBeep(freq);
    } else {
      const nextStepCount = state.rampStepCount + 1;
      audio.playRampBeep((nextStepCount % 5) || 5, (collision as any).isDescending);
      if (nextStepCount % 5 === 0) bark("The Poodle Barks Elegantly (5-beep indicator)");
      setGameState(prev => ({ ...prev, rampStepCount: nextStepCount }));
    }
  } else if (collision.nextLevel !== level) {
    setGameState(prev => ({ ...prev, rampStepCount: 0 }));
  }

  const nextState = checkCourseTransition(state);
  if (nextState.isGameOver) {
    speak("FINISH LINE! Thanks for playing!", 'EN_US');
    setGameState(nextState);
    return;
  }

  if (nextState.area !== state.area) {
    const nextArea = nextState.area;
    const nextAreaMetrics = formulateAreaMetrics(nextArea);
    const nextDims = { width: nextAreaMetrics.width, height: nextAreaMetrics.height };
    const updatedState = {
      ...nextState,
      obstacles: generateObstacles(nextArea, nextDims.height),
      coins: generateCoins(nextArea, nextDims.height),
      direction: isReverseMode ? state.direction : nextState.direction
    };
    speak(mt(getWallDescription(state.direction, nextArea, Math.floor(nextState.gridX), Math.floor(nextState.gridY), nextState.level)), 'EN_US');
    setPendingState(updatedState);
    if (updatedState.showInterstitialAd) setShowAd(true);
    else {
      setGameState(updatedState);
      setPendingState(null);
    }
    return;
  }

  if (collision.isBlocked) {
    setGameState(prev => ({ ...prev, speed: 0 }));
    if (collision.wallDesc) {
      speak(mt(collision.wallDesc), 'EN_US');
      audio.playWallHit(area);
    }
    return;
  }

  const nextAreaMetrics = formulateAreaMetrics(collision.nextArea);
  const nextDims = { width: nextAreaMetrics.width, height: nextAreaMetrics.height };
  let announcementUpdates: Partial<GameState> = checkAnnouncementFlags(state, collision.nextArea, collision.nextX, collision.nextY);

  if (collision.msg) {
    announceEnv(mt(collision.msg));
  }

  if (collision.nextArea === 'Garden') {
    if (moveDirection === 'West' && collision.nextX < Math.floor(nextDims.width * 0.2)) audio.playWindInBushes(-1, 0, 0);
    if (moveDirection === 'East' && collision.nextX > Math.floor(nextDims.width * 0.8)) {
      const hour = getCSTTime().getHours();
      if (hour >= 17 || hour < 7) audio.playGoatMunch(1, 0, 0);
    }
    if (moveDirection === 'South' && collision.nextY < Math.floor(nextDims.height * 0.2)) {
      const hour = getCSTTime().getHours();
      if ((hour >= 18 || hour < 6) && Math.random() < 0.05) audio.playSubwayPass(0, 0, 1);
    }
  } else if (collision.nextArea === 'Foyer') {
    if (announcementUpdates.hasAnnouncedStreetSounds && moveDirection === 'North') announceEnv("The street sounds grow louder to the North.");
  }

  if (announcementUpdates.hasAnnouncedSouthwestRectangle) announceEnv(FOYER_DESCRIPTIONS.SOUTHWEST_RECTANGLE);
  if (announcementUpdates.hasAnnouncedSkyRampAscent) announceEnv("You are starting your ascent up the Sky Ramp towards the Mezzanine.");
  if (announcementUpdates.hasAnnouncedSkyRampDescent) announceEnv("You are starting your descent down the Sky Ramp towards the floor foyer.");
  if (announcementUpdates.hasAnnouncedSouthwestStairwayEntry) announceEnv("You have entered the Southwest Stairway and Ramp area of the Lobby.");
  if (announcementUpdates.hasAnnouncedPerimeterWalkway) announceEnv("You have reached the Perimeter Walkway of the Foyer Mezzanine.");
  if (announcementUpdates.hasAnnouncedDishWasherRoom) announceEnv("You have entered the Boiler and Dish Washer Area.");
  if (announcementUpdates.hasAnnouncedWindChimes && (state.area === 'Garden' || state.area === 'MeditationHall')) announceEnv(state.area === 'Garden' ? "The wind chimes from the garden are hanging here, tinkling softly in the breeze." : "The wind chimes from the garden are clearer now.");

  if (collision.nextArea === 'ElevatedPath') {
    const elevatedPathMetrics = formulateAreaMetrics('ElevatedPath');
    const progress = collision.nextY / elevatedPathMetrics.height;
    if (announcementUpdates.hasAnnouncedElevatedPathEntry) bark("The Poodle Barks Elegantly (Entry)", true, 3);
    else if (progress > 0.4 && progress < 0.5 && announcementUpdates.hasAnnouncedElevatedPathHalf1) bark("The Poodle Barks Elegantly (Halfway Approach)", true, 4);
    else if (progress > 0.5 && progress < 0.6 && announcementUpdates.hasAnnouncedElevatedPathHalf2) bark("The Poodle Barks Elegantly (Halfway Passed)", true, 4);
  }

  const coinResult = checkCoinCollection({ ...state, gridX: collision.nextX, gridY: collision.nextY }, state.coins || []);
  if (coinResult.collected) {
    audio.playPointEarned();
    speak(`Collected coin! +${coinResult.points} points.`, 'EN_US');
  }

  const nextArea = collision.nextArea as any;
  const isLevelTransition = collision.isLevelComplete || (collision.nextLevel !== undefined && collision.nextLevel !== state.level && typeof collision.nextLevel === 'number');

  if (isLevelTransition) {
    const updatedState = {
      ...state,
      ...announcementUpdates,
      gridX: collision.nextX,
      gridY: collision.nextY,
      coins: coinResult.updatedCoins,
      score: state.score + coinResult.points,
      area: nextArea,
      direction: isReverseMode ? state.direction : (collision.nextDirection || state.direction),
      level: collision.nextLevel as any,
      doorwayStep: collision.nextDoorwayStep,
      isMiniatureMode: nextArea === 'Sidewalk' || nextArea === 'Street' || nextArea.startsWith('Mini'),
      isLevelComplete: false,
      showInterstitialAd: true,
      currentAdLevel: (state.currentAdLevel % 3) + 1
    };
    setPendingState(updatedState);
    setShowAd(true);
    return;
  }

  setGameState(prev => ({
    ...prev,
    ...announcementUpdates,
    gridX: collision.nextX,
    gridY: collision.nextY,
    speed: prev.targetSpeed > 0 ? prev.targetSpeed : finalStepSize * 10,
    coins: coinResult.updatedCoins,
    score: prev.score + coinResult.points,
    area: nextArea,
    direction: isReverseMode ? prev.direction : (collision.nextDirection || prev.direction),
    level: collision.nextLevel as any,
    doorwayStep: collision.nextDoorwayStep,
    isMiniatureMode: nextArea === 'Sidewalk' || nextArea === 'Street' || nextArea.startsWith('Mini'),
    isLevelComplete: collision.isLevelComplete || false
  }));
}

export function handleMoveReverse(ctx: MovementContext) {
  const { gameStateRef, audio, speak, announceToScreenReader, setGameState, keysPressed, lastMoveTime, bark, checkCollision, checkCourseTransition, generateObstacles, generateCoins, checkObstacleCollision, checkCoinCollection, checkAnnouncementFlags, getWallDescription, mt, setPendingState, setShowAd } = ctx;
  const state = gameStateRef.current;
  if (state.isJumping || !state.isPlaying) return;

  if (state.movementMode === 'Walk') audio.playPoodleWalk(state.area, 0, 0, 0, state.ridingAnimal);
  else if (state.movementMode === 'Slow Walk') audio.playPoodleSlowWalk(state.area, 0, 0, 0, state.ridingAnimal);
  else if (state.movementMode === 'Very Slow Walk') audio.playPoodleVerySlowWalk(state.area, 0, 0, 0, state.ridingAnimal);
  else audio.playPoodleThump(state.area, 0, 0, 0, state.ridingAnimal);

  let { gridX, gridY, direction, area, doorwayStep, level } = state;
  let nextX = gridX;
  let nextY = gridY;
  
  let reverseStep = 4;
  switch (state.movementMode) {
    case 'Very Slow Walk': reverseStep = 1; break;
    case 'Slow Walk': reverseStep = 2; break;
    case 'Walk': reverseStep = 4; break;
    case 'Trot': reverseStep = 6; break;
    case 'Canter': reverseStep = 8; break;
    case 'Gallop': reverseStep = 10; break;
  }

  const REVERSE_DIRECTIONS: { [key: string]: string } = {
    'North': 'South', 'South': 'North', 'East': 'West', 'West': 'East',
    'Northeast': 'Southwest', 'Southwest': 'Northeast', 'Southeast': 'Northwest', 'Northwest': 'Southeast'
  };
  const moveDirection = REVERSE_DIRECTIONS[direction];

  switch (direction) {
    case 'North': nextY -= reverseStep; break;
    case 'South': nextY += reverseStep; break;
    case 'East': nextX -= reverseStep; break;
    case 'West': nextX += reverseStep; break;
    case 'Northeast': nextX -= reverseStep * 0.707; nextY -= reverseStep * 0.707; break;
    case 'Southeast': nextX -= reverseStep * 0.707; nextY += reverseStep * 0.707; break;
    case 'Southwest': nextX += reverseStep * 0.707; nextY += reverseStep * 0.707; break;
    case 'Northwest': nextX += reverseStep * 0.707; nextY -= reverseStep * 0.707; break;
  }

  const collision = checkCollision(gridX, gridY, nextX, nextY, level, area, moveDirection as Direction, doorwayStep, state);
  if (collision.shouldBark) bark(collision.barkMsg, true, collision.barkCount);

  const obstacleResult = checkObstacleCollision({ ...state, gridX: nextX, gridY: nextY }, state.obstacles);
  if (obstacleResult.collision && obstacleResult.obstacle) {
    if (!state.isJumping) {
      audio.playBushHit();
      speak(`You hit a ${obstacleResult.obstacle.type}! You need to jump over it.`, 'EN_US');
      return;
    } else {
      audio.playPointEarned();
      setGameState(prev => ({
        ...prev,
        score: prev.score + 10,
        obstaclesJumped: prev.obstaclesJumped + 1,
        obstacles: prev.obstacles.map(o => o.id === obstacleResult.obstacle!.id ? { ...o, isJumped: true } : o)
      }));
      speak(`You jumped over a ${obstacleResult.obstacle.type}! +10 points.`, 'EN_US');
    }
  }

  const nextState = checkCourseTransition(state);
  if (nextState.isGameOver) {
    speak("FINISH LINE! Thanks for playing!", 'EN_US');
    setGameState(nextState);
    return;
  }

  if (nextState.area !== state.area) {
    const nextArea = nextState.area;
    const nextAreaMetrics = formulateAreaMetrics(nextArea);
    const nextDims = { width: nextAreaMetrics.width, height: nextAreaMetrics.height };
    const updatedState = {
      ...nextState,
      obstacles: generateObstacles(nextArea, nextDims.height),
      coins: generateCoins(nextArea, nextDims.height),
      movementMode: nextState.area === 'PoodleRideStoryBookDecisionZone' ? 'Gallop' as any : nextState.movementMode
    };
    if (updatedState.showInterstitialAd) {
      setPendingState(updatedState);
      setShowAd(true);
    } else {
      setGameState(updatedState);
    }
    speak(mt(getWallDescription(moveDirection as Direction, nextArea, Math.floor(nextState.gridX), Math.floor(nextState.gridY), nextState.level)), 'EN_US');
    return;
  }

  if (collision.isBlocked) {
    setGameState(prev => ({ ...prev, speed: 0 }));
    if (collision.wallDesc) {
      speak(mt(collision.wallDesc), 'EN_US');
      audio.playWallHit(area);
    }
    return;
  }

  if (collision.msg) {
    let revMsg = mt(collision.msg);
    revMsg = revMsg.replace(/reached/g, "backed up to");
    revMsg = revMsg.replace(/entered/g, "backed up into");
    speak(revMsg, 'EN_US');
    announceToScreenReader(revMsg);
  }

  if (collision.isRampStep) {
    if (state.area === 'Soca_Path') {
      const freq = 660 + Math.cos(collision.nextY / 800) * 220;
      audio.playCustomBeep(freq);
    } else {
      const nextStepCount = state.rampStepCount + 1;
      audio.playRampBeep((nextStepCount % 5) || 5, collision.isDescending);
      if (nextStepCount % 5 === 0) bark("The Poodle Barks Elegantly (5-beep indicator)");
      setGameState(prev => ({ ...prev, rampStepCount: nextStepCount }));
    }
  } else if (collision.nextLevel !== level) {
    setGameState(prev => ({ ...prev, rampStepCount: 0 }));
  }

  setGameState(prev => ({
    ...prev,
    ...checkAnnouncementFlags(state, collision.nextArea, collision.nextX, collision.nextY),
    gridX: collision.nextX,
    gridY: collision.nextY,
    speed: prev.targetSpeed !== 0 ? prev.targetSpeed : -10,
    area: collision.nextArea as any,
    direction: prev.direction,
    level: collision.nextLevel as any,
    doorwayStep: collision.nextDoorwayStep,
    isMiniatureMode: collision.nextArea === 'Sidewalk' || collision.nextArea === 'Street' || collision.nextArea.startsWith('Mini'),
    isLevelComplete: collision.isLevelComplete || false
  }));
}
