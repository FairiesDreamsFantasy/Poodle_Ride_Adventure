import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rabbit as DogIcon, X, Clock, Pause, Play } from 'lucide-react';
import { InterstitialAd } from '../../Registry/UI/Ads';
import { SoundManager } from '../../Sound/SoundManager';
import { manageDoorProximity } from './General/DoorManager';
import { 
  GameState, INITIAL_STATE, DIRECTIONS, MOVE_COOLDOWN, getCSTTime, getLightingMode, 
  GRID_SIZE, FOYER_DESCRIPTIONS, CELLAR_DESCRIPTIONS, 
  RAMP_X_MAX, RAMP_Y_MAX, RAMP_Y_MIN, SW_RECT_X_MAX, SW_RECT_Y_MAX, FRONT_PORCH_DESCRIPTIONS, BACK_PORCH_DESCRIPTIONS,
  RUGGED_PLAY_FIELD_DESCRIPTIONS, MEDITATION_HALL_DESCRIPTIONS, GARDEN_DESCRIPTIONS,
  getWallDescription, isOutdoorArea,
  Direction, GAME_WIDTH, GAME_HEIGHT, TRUE_BLACK, SynthMode
} from '../../AI/In-Game/Logic/GameLogic';
import {
  evaluatePlayAreaActivity,
  executeToyRideChoice,
  executeToyInput,
  executePoodleJump,
  attachGameKeyboardListeners,
  evaluateOrientationAndStrafing
} from '../../AI/In-Game/Category/UI/Play_Area';
import { handleStandardKinematics, handlePreciseKinematics } from '../../AI/In-Game/Drift_Guard';
import { formulateAreaMetrics as formulateArenaMetrics } from '../../AI/In-Game/Category/Arena';
import { getRelativePositionDescription, getAreaPerimeterDescription } from '../../Engine/Scientific_Imports/P/Positions';
import { drawPoodleRiderView, drawPoodle3D } from '../../../Characters/Poodles/Abigay_Rose_Kone';
import { drawAnninneAmeliaRiderView } from '../../../Characters/Poodles/Anninne-Amelia_Rose_Julisus';
import { drawAbigailRiderView } from '../../../Characters/Poodles/Abigail_Marigold_Kenyatta';
import { PoodleSelectionMenu } from '../Animal_Selection';
import { drawDymondRiderView } from '../../../Characters/Poodles/Dymond_Daisy_Qin-Reynolds';
import { drawWorldObjects } from '../../Engine/Science/Graphical_Renderer/W/WorldRenderer';
import { drawStoryBookCourse, drawToyInterface } from '../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/StoryBookRenderer';
import { drawInitialShort400FeetPath } from '../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/Initial_Short_400_Feet_Path/InitialPathRenderer';
import { STORY_BOOK_PAGES } from '../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/StoryBookLogic';
import { drawPoodlePOV } from '../../../Characters/Riders/Fairy-Rider/POV';
import { drawPriscillaRiderView, drawPriscillaPOV } from '../../../Characters/Riders/Priscilla/Animations/PriscillaRiderRenderer';
import { checkCollision } from '../../Engine/Core/C/Collision';
import { checkAnnouncementFlags } from '../../Engine/Core/Announcement';
import { ScreenReader as ScreenReaderComponent } from '../../Registry/Sound/TTS';
import { drawEnvironment, drawWindowViews } from '../../../Arena/Manorsville/Rasta-Manor/Environment';
import FloorFoyerGrid from '../../../System/Engine/Mathematics/Grid/Floor_Foyer_Grid';
import { detectHardwareProfile, applyLegacyConstraints } from '../../HardwareOptimization';
import { TOY_DIMENSIONS } from '../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/Obstacles/Interactive_Obstacles/Ride-On_Pink_Poodle_Rocker/Dimensions/Dimensions';
import { calculateMovement } from '../../../System/Engine/Movement/M/Movement';
import { routeKeyboardEvent } from '../../../System/Engine/Scientific_Imports/K/Keyboard';
import { PlayAreaMenuBar, GameView, HUD, Diagnostics } from '../../Registry/UI/Play_Area';
import { PlayAreaHeader } from './Header';
import { PlayAreaMainContainer } from './Main';
import { PlayAreaFooter } from './Footer';
import { SystemTheme, ThemeProvider } from '../../../System/Theme';
import { getFootage, getMeasurementDescription, getSpeedDescription, convertText } from '../../../System/Engine/Science/Physics/Measurements';
import { FOYER_OBSTACLES, GARDEN_OBSTACLES, Obstacle as LegacyObstacle } from '../../../System/Engine/Core/O/Obstacles';
import { ADVENTURE_COURSE, checkCourseTransition, CourseArea } from '../../Levels/CourseManager';
import { generateObstacles, checkObstacleCollision, getObstacleBeepInterval, Obstacle } from '../../Building_Blocks/Obstacles/ObstacleManager';
import { calculateObstaclePoints, updateScore, INITIAL_LEVEL_MEMORY, saveLevelProgress, LevelMemory } from '../../State';
import { KeyboardCommandsModal } from '../../Modal';
import { BitMode } from '../../../types';
import { InventoryMenu } from '../../Registry/UI/Inventory';
import { generateCoins, checkCoinCollection } from '../../Items/Coins';

import { PoodleLandingPage } from '../Landing_Page';
import { ThanksForPlaying } from './Thanks_4_Playing';
import { FinalScore } from './Final_Score';

// Modular Imports
import { WELCOME_MESSAGE, getDynamicWelcomeMessage } from '../../Engine/Scientific_Imports/W/Welcome';
import { draw2DView } from '../../Engine/Scientific_Imports/D/Drawing';
import { getInputLearnDescription, getWallInteractionDescription } from '../../Engine/Scientific_Imports/I/InputDescriptions';
import { getSystemStatusDescription } from '../../Engine/Scientific_Imports/S/SystemStatus';
import { triggerAmbientSounds } from '../../Engine/Scientific_Imports/A/Ambient';
import { handleGoatSchedule } from '../../Engine/Scientific_Imports/G/Goat';
import { handleShiftMultiTap, handleRegularMultiTap } from '../../Keyboards_and_Controllers/Keyboard';
import { handlePoodleBark, handlePoodlePet, handlePoodleLean, handlePoodleCollar } from './Main/Logic/Interaction/Poodle/PoodleInteractions';
import { GeneralDOM, DOMEngine } from '../../DOM';

import { MultipleChoiceOverlay } from './Components/MultipleChoiceOverlay';
import { GameFooter } from './Components/GameFooter';
import { handleMovementInput } from '../../InputHandler';
import { InputContext } from '../../InputTypes';
import { ScreenReader } from '../../Sound/TTS/ScreenReader';
import { AudioManager } from '../../Audio/AudioManager';
import { ActionDispatcher } from '../../State/ActionDispatcher';
import { GeminiService } from '../../AI/External';
import { AutomationManager } from '../../Automation/AutomationManager';
import { DiagnosticManager } from '../../Diagnostics/DiagnosticManager';

const audio = new SoundManager();

import { PoodleRideProps, MovementContext, handleMoveForward, handleMoveReverse, bark as poodleBark, pet as poodlePet, lean as poodleLean, collar as poodleCollar } from './Main/General';

export default function PoodleRideAdventure({ isEmbedded = false, onBack, onOpenDownloads }: PoodleRideProps) {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const gameStateRef = useRef<GameState>(gameState);
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const speak = useCallback((text: string, lang: any = 'EN_En-RP', force: boolean = false) => {
    if (gameStateRef.current.isTTSEnabled || force) {
      audio.speak(text, lang || gameStateRef.current.ttsLanguage || 'EN_En-RP');
    }
  }, []);

  const announceToScreenReader = useCallback((text: string, force: boolean = false) => {
    // Visual announcement system removed as per requested audit.
    // Audio-based TTS system handles all necessary announcements.
  }, []);

  const m = useCallback((value: number, type: 'distance' | 'longDistance' | 'smallDistance' | 'height') => {
    return getMeasurementDescription(value, gameStateRef.current.measurementSystem, type);
  }, []);

  const mt = useCallback((text: string) => {
    return convertText(text, gameStateRef.current.measurementSystem);
  }, []);

  const readHUD = useCallback(() => {
    const state = gameStateRef.current;
    const speedInfo = getSpeedDescription(state.speed, state.measurementSystem);
    const msg = `HUD Status: Current Location: ${state.area}. Position: ${m(Math.round(state.gridX), 'distance')} X, ${m(Math.round(state.gridY), 'distance')} Y. Heading: ${DIRECTIONS[Math.round(state.rotation / 45) % 8]}. Movement Mode: ${state.movementMode}. Current Speed: ${speedInfo}.`;
    speak(mt(msg), 'EN_US');
  }, [m, mt, speak]);

  const [showLanding, setShowLanding] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [selectedBitMode, setSelectedBitMode] = useState<BitMode>('64-bit');
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);

  const gameContainerRef = useRef<HTMLElement>(null);
  const [showAd, setShowAd] = useState(false);
  const [isAdBlocked, setIsAdBlocked] = useState(false);
  const [selectedSynth, setSelectedSynth] = useState<SynthMode>('Classic');
  const [pendingState, setPendingState] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const playAreaState = evaluatePlayAreaActivity({
      showLanding,
      isGameOver: gameState.isGameOver,
      isLevelComplete: gameState.isLevelComplete,
      showAd,
      isInventoryOpen: gameState.isInventoryOpen,
      isPoodleSelectionOpen: gameState.isPoodleSelectionOpen,
      isPaused: gameState.isPaused,
      isKeyboardModalOpen,
      isStorybookOpen: gameState.isStorybookOpen,
    });
    const isGameplayActive = !playAreaState.suppressWorldMovement && playAreaState.canRenderWorld;
    
    if (isGameplayActive) {
      const focus = () => {
        // Use the DOM utility for a "scientific" focus trigger
        GeneralDOM.triggerFocusMode('game-canvas');
      };

      const timer1 = setTimeout(focus, 150);
      const timer2 = setTimeout(focus, 600); 
      const timer3 = setTimeout(focus, 1000); // 1-second fallback
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [
    showLanding, 
    gameState.isGameOver, 
    gameState.isLevelComplete, 
    showAd, 
    gameState.isInventoryOpen, 
    gameState.isPoodleSelectionOpen, 
    gameState.isPaused, 
    isKeyboardModalOpen,
    gameState.isStorybookOpen
  ]);

  const isMuted = gameState.isMuted;
  const setIsMuted = (muted: boolean) => {
    setGameState(prev => ({ ...prev, isMuted: muted }));
    audio.setMuted(muted);
  };
  const movementRequestRef = useRef<number>(0);
  const renderRequestRef = useRef<number>(0);
  const ambientIntervalRef = useRef<any>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  const barkIntervalRef = useRef<any>(null);
  const lastMoveTime = useRef<number>(0);
  const lastRotateTime = useRef<number>(0);
  const lastSoundTimeRef = useRef<number>(0);
  const lastFrameTime = useRef<number>(0);
  const lastReactUpdateTime = useRef<number>(0);
  const prevAreaRef = useRef<string | null>(null);
  const lastAnnouncedJoystickAngle = useRef<number | null>(null);
  const lastJoystickRotationTime = useRef<number>(0);
  const lastRenderTime = useRef<number>(0);
  const hardwareProfile = useRef(detectHardwareProfile());
  const lastKeyTime = useRef<{ [key: string]: number }>({});
  const aTapCount = useRef<number>(0);
  const aTapTimeout = useRef<any>(null);
  const aShiftTapCount = useRef<number>(0);
  const aShiftTapTimeout = useRef<any>(null);

  const isNearToy = gameState.area === 'PoodleRideStoryBookDecisionZone' && 
                    gameState.gridX >= TOY_DIMENSIONS.INTERACTION.X_MIN && 
                    gameState.gridX <= TOY_DIMENSIONS.INTERACTION.X_MAX && 
                    gameState.gridY >= TOY_DIMENSIONS.INTERACTION.Y_TRIGGER - 2 && 
                    gameState.gridY <= TOY_DIMENSIONS.INTERACTION.Y_TRIGGER;

  const isNearBook = gameState.area === 'PoodleRideStoryBookDecisionZone' && 
                     gameState.gridX >= 22 && gameState.gridX <= 28 && 
                     gameState.gridY >= 47 && gameState.gridY <= 50;

  useEffect(() => {
    if (isNearToy && !gameState.hasAnnouncedToyPedestal && !gameState.isRidingToy) {
      const msg = mt("You have reached an 8-feet long, and 5-feet wide pedestal. On it sits a ride-on interactive pink poodle puppy rocker.");
      speak(msg, 'EN_US');
      announceToScreenReader(msg);
      setGameState(prev => ({ ...prev, hasAnnouncedToyPedestal: true }));
    }
    
    if (isNearBook && !gameState.isToyReady && !gameState.isRidingToy) {
      const msg = "There is a story book here on a stand. Would you like to read it?";
      speak(msg, 'EN_US');
      announceToScreenReader(`Interaction: ${msg} Press Y or Enter to interact, N to decline.`);
      setGameState(prev => ({ ...prev, isToyReady: true }));
    }
  }, [isNearToy, isNearBook, gameState.isRidingToy, gameState.isToyReady, gameState.hasAnnouncedToyPedestal, speak, announceToScreenReader]);

  useEffect(() => {
    const isCourse = gameState.area === 'PoodleRideStoryBookCourse';
    
    // Auto-switch to Dymond ONLY when entering the actual Course area
    if (isCourse) {
      if (gameState.ridingAnimal !== 'Dymond Daisy Qin-Reynolds') {
        const msg = "As you enter the Story Book Adventure Course, you automatically switch to riding Dymond Daisy Qin-Reynolds! This special poodle is tuned for this course.";
        speak(msg, 'EN_US');
        announceToScreenReader(msg);
        setGameState(prev => ({ 
          ...prev, 
          previousRidingAnimal: prev.ridingAnimal,
          ridingAnimal: 'Dymond Daisy Qin-Reynolds',
          isPoodleAutoSwitched: true
        }));
      }
    } else if (gameState.area === 'WandasWarpHouse' && gameState.ridingAnimal === 'Dymond Daisy Qin-Reynolds') {
      // Revert poodle ONLY when returning to the Warp Hub (consistent with return switch algorithm)
      if (gameState.isPoodleAutoSwitched) {
        const targetPoodle = gameState.previousRidingAnimal || 'Abigay Rose Kone';
        const msg = `You exit the story book area and switch back to riding ${targetPoodle}!`;
        speak(msg, 'EN_US');
        announceToScreenReader(msg);
        setGameState(prev => ({ ...prev, ridingAnimal: targetPoodle, isPoodleAutoSwitched: false }));
      }
    }
  }, [gameState.area, gameState.ridingAnimal, gameState.previousRidingAnimal, gameState.isPoodleAutoSwitched, speak, announceToScreenReader]);

  useEffect(() => {
    if (gameState.isPlaying) {
      // Automatically focus the game canvas on start to enable Focus Mode
      // for screen readers and ensure keyboard events are captured correctly.
      DOMEngine.ensureCanvasAccessibility('game-canvas', 'Poodle Ride Adventure Play Area');
      GeneralDOM.triggerFocusMode('game-canvas');
    }
  }, [gameState.isPlaying]);

  const handleToggleSurroundSound = () => {
    setGameState(prev => {
      const next = !prev.isSurroundSoundEnabled;
      speak(`Surround sound ${next ? 'enabled' : 'disabled'}.`, 'EN_US');
      return { ...prev, isSurroundSoundEnabled: next };
    });
  };

  const handleToyRideChoice = (ride: boolean) => {
    executeToyRideChoice(ride, gameState, setGameState, audio, { speak });
  };

  const handleToyInput = useCallback((key: string) => {
    executeToyInput(key, gameStateRef.current, setGameState, audio, { speak });
  }, [speak]);


  const handleSetSynth = (synth: SynthMode) => {
    setSelectedSynth(synth);
    setGameState(prev => ({ ...prev, synthMode: synth }));
    audio.setSynthMode(synth);
    const msg = `Synthesizer set to ${synth}.`;
    speak(msg, 'EN_US');
    announceToScreenReader(msg);
  };

  const startGame = (isPositioning: boolean = false, viewMode: 'Rider' | 'POV' = 'Rider') => {
    audio.init();
    const foyerMetrics = formulateArenaMetrics('Foyer');
    const foyerDims = { width: foyerMetrics.width, height: foyerMetrics.height };
    const initialObstacles = generateObstacles('Foyer', foyerDims.height);
    setGameState({
      ...INITIAL_STATE,
      isPlaying: true,
      isGameOver: false,
      isPositioningEnabled: isPositioning,
      gridX: foyerDims.width / 2,
      gridY: foyerDims.height,
      direction: 'South',
      hasAnnouncedWelcome: true,
      obstacles: initialObstacles,
      isStarted: true,
      viewMode,
    });
    setShowLanding(false);
    
    const welcomeMsg = getDynamicWelcomeMessage(gameState.characterName || 'Fairy-Rider', gameState.ridingAnimal || 'Abigay Rose Kone');
    speak(welcomeMsg, 'EN_US');
    announceToScreenReader(welcomeMsg);
    audio.playPoodleBark();
  };

  // Obstacle beep logic
  useEffect(() => {
    if (gameState.isPlaying && !isMuted) {
      const interval = setInterval(() => {
        const state = gameStateRef.current;
        const beepInterval = getObstacleBeepInterval(state, state.obstacles);
        if (beepInterval) {
          audio.playAscendingBeep(1); // Play a beep to indicate proximity
        }
      }, 500); // Check every 500ms
      return () => clearInterval(interval);
    }
  }, [gameState.isPlaying, isMuted]);

  // Ambient sound mixing
  useEffect(() => {
    if (gameState.isPlaying && !isMuted) {
      ambientIntervalRef.current = setInterval(() => {
        triggerAmbientSounds(gameStateRef.current, audio);
      }, 3000);
    } else {
      if (ambientIntervalRef.current) clearInterval(ambientIntervalRef.current);
    }
    return () => {
      if (ambientIntervalRef.current) clearInterval(ambientIntervalRef.current);
    };
  }, [gameState.isPlaying, isMuted]);

  // Music management
  useEffect(() => {
    if (gameState.isPlaying && !isMuted) {
      if (gameState.area === 'Soca_Path') {
        audio.startSocaMusic();
      } else {
        audio.stopSocaMusic();
      }
    } else {
      audio.stopSocaMusic();
    }
    return () => audio.stopSocaMusic();
  }, [gameState.isPlaying, gameState.area, isMuted]);

  // Proximity-based Door Management (Resolving Pseudoscience & Resolving Hard-coding)
  useEffect(() => {
    if (!gameState.isPlaying) return;

    const interval = setInterval(() => {
      const state = gameStateRef.current;
      const updates = manageDoorProximity(state, audio);

      if (Object.keys(updates).length > 0) {
        setGameState(prev => ({ ...prev, ...updates }));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [gameState.isPlaying, gameState.area]);

  // --- POODLE CORE FEATURES (Moved to modular library) ---
  const bark = useCallback((msg?: string, isCore?: boolean, count?: number, area?: string) => {
    return poodleBark(gameStateRef, audio, speak, announceToScreenReader, msg, isCore, count, area);
  }, [speak, announceToScreenReader]);
  
  const pet = useCallback(() => {
    return poodlePet(gameStateRef, setGameState, audio, speak);
  }, [speak]);
  
  const lean = useCallback(() => {
    return poodleLean(gameStateRef, setGameState, audio, speak);
  }, [speak]);
  
  const collar = useCallback(() => {
    return poodleCollar(gameStateRef, setGameState, audio, speak);
  }, [speak]);

  const movementCtx: MovementContext = {
    gameStateRef, audio, speak, announceToScreenReader, setGameState, keysPressed, lastMoveTime, bark,
    checkCollision, checkCourseTransition, generateObstacles, generateCoins, checkObstacleCollision, 
    checkCoinCollection, checkAnnouncementFlags, getWallDescription, mt, setPendingState, setShowAd
  };

  const moveForward = useCallback((isTappedOverride?: boolean, strafeDir?: 'Left' | 'Right', moveAngleOverride?: number, isReverseMode?: boolean) => {
    return handleMoveForward(movementCtx, isTappedOverride, strafeDir, moveAngleOverride, isReverseMode);
  }, [movementCtx]);

  const moveReverse = useCallback(() => {
    return handleMoveReverse(movementCtx);
  }, [movementCtx]);

  const rotate = useCallback((delta: number) => {
    if (gameStateRef.current.showDiagnostics) DiagnosticManager.logInteraction('Rotation', delta > 0 ? 'Right' : 'Left');
    const now = Date.now();
    if (now - lastRotateTime.current < 200) return;
    lastRotateTime.current = now;

    const state = gameStateRef.current;
    
    // Disable turning on Adventure Path
    const adventureAreas = ['AdventurePath', 'HedgePath', 'RastafariCave', 'Overpass', 'Suburb', 'OpenTrench', 'Soca_Path'];
    if (adventureAreas.includes(state.area)) {
      bark("Turning is disabled on this path.");
      return;
    }

    const turningMode = state.arrowKeyTurningMode || 'FourDirection';
    let nextDirection: Direction;
    let newRotDegrees = state.rotation;

    if (turningMode === 'FourDirection') {
      const CARDINALS: Direction[] = ['North', 'East', 'South', 'West'];
      const currentDir = state.direction;
      const currentIndex = CARDINALS.indexOf(currentDir);
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + delta + CARDINALS.length) % CARDINALS.length;
        nextDirection = CARDINALS[nextIndex];
      } else {
        if (currentDir === 'Northeast') nextDirection = delta === -1 ? 'North' : 'East';
        else if (currentDir === 'Southeast') nextDirection = delta === -1 ? 'East' : 'South';
        else if (currentDir === 'Southwest') nextDirection = delta === -1 ? 'South' : 'West';
        else nextDirection = delta === -1 ? 'West' : 'North';
      }
      
      // Synchronize rotation degrees for FourDirection
      if (nextDirection === 'North') newRotDegrees = 0;
      else if (nextDirection === 'East') newRotDegrees = 90;
      else if (nextDirection === 'South') newRotDegrees = 180;
      else if (nextDirection === 'West') newRotDegrees = 270;
    } else if (turningMode === 'EightDirection') {
      const currentIndex = DIRECTIONS.indexOf(state.direction);
      const nextIndex = (currentIndex + delta + DIRECTIONS.length) % DIRECTIONS.length;
      nextDirection = DIRECTIONS[nextIndex];
      
      // Synchronize rotation degrees for EightDirection
      if (nextDirection === 'North') newRotDegrees = 0;
      else if (nextDirection === 'Northeast') newRotDegrees = 45;
      else if (nextDirection === 'East') newRotDegrees = 90;
      else if (nextDirection === 'Southeast') newRotDegrees = 135;
      else if (nextDirection === 'South') newRotDegrees = 180;
      else if (nextDirection === 'Southwest') newRotDegrees = 225;
      else if (nextDirection === 'West') newRotDegrees = 270;
      else if (nextDirection === 'Northwest') newRotDegrees = 315;
    } else { // Full360 turning logic
      // In Full360, adjust the rotation angle precisely (e.g., 15-degree steps) without snapping to the 8-directional system
      newRotDegrees = (state.rotation + delta * 15 + 360) % 360;
      
      // Map to the nearest compass direction among the 8 directions for game state compatibility
      const points: { angle: number, label: Direction }[] = [
        { angle: 0, label: 'North' },
        { angle: 45, label: 'Northeast' },
        { angle: 90, label: 'East' },
        { angle: 135, label: 'Southeast' },
        { angle: 180, label: 'South' },
        { angle: 225, label: 'Southwest' },
        { angle: 270, label: 'West' },
        { angle: 315, label: 'Northwest' },
        { angle: 360, label: 'North' }
      ];
      const closest = points.slice().sort((a, b) => {
        const diffA = Math.min(Math.abs(newRotDegrees - a.angle), 360 - Math.abs(newRotDegrees - a.angle));
        const diffB = Math.min(Math.abs(newRotDegrees - b.angle), 360 - Math.abs(newRotDegrees - b.angle));
        return diffA - diffB;
      })[0];
      nextDirection = closest.label;
    }

    const turnDir = delta === -1 ? "left" : "right";
    const msg = state.notifications.truncateTurning 
      ? (turningMode === 'Full360' ? `${nextDirection} ${Math.round(newRotDegrees)}` : nextDirection) 
      : (turningMode === 'Full360' 
         ? `Turning ${turnDir}. Facing ${nextDirection} at ${Math.round(newRotDegrees)} degrees` 
         : `Turning ${turnDir}. Facing ${nextDirection}`);
    
    speak(msg, 'EN_US');
    announceToScreenReader(msg);

    setGameState(prev => ({ 
      ...prev, 
      direction: nextDirection,
      rotation: newRotDegrees
    }));
  }, [announceToScreenReader, bark]);

  const jump = useCallback(() => {
    executePoodleJump({
      gameStateRef,
      keysPressed,
      setGameState,
      audio,
      speak,
      announceToScreenReader,
      checkCollision,
      bark,
      mt
    });
  }, [speak, announceToScreenReader, checkCollision, bark, mt]);

  useEffect(() => {
    return attachGameKeyboardListeners({
      gameStateRef,
      setGameState,
      keysPressed,
      lastKeyTime,
      barkIntervalRef,
      audio,
      speak,
      announceToScreenReader,
      actions: {
        bark,
        pet,
        lean,
        collar,
        jump,
        readHUD,
        setShowGrid,
        handleSetSynth
      },
      aTapCount,
      aTapTimeout,
      aShiftTapCount,
      aShiftTapTimeout,
      isNearToy
    });
  }, [speak, announceToScreenReader, jump, bark, pet, lean, collar, readHUD, handleSetSynth, isNearToy]);

  // Generate coins for the current area if they don't exist
  useEffect(() => {
    const area = gameState.area;
    const areaMetrics = formulateArenaMetrics(area);
    const dims = { width: areaMetrics.width, height: areaMetrics.height };
    
    // Only generate if we don't have coins for this specific area yet
    const hasCoinsForArea = gameState.coins.some(c => c.area === area);
    if (!hasCoinsForArea) {
      const newCoins = generateCoins(area, dims.height);
      if (newCoins.length > 0) {
        setGameState(prev => ({
          ...prev,
          coins: [...prev.coins, ...newCoins]
        }));
      }
    }
  }, [gameState.area]);

  // Lightweight Local Machine Learning for automatic arrow key turning prediction, strafing, and compass orientation
  useEffect(() => {
    evaluateOrientationAndStrafing({
      gameState,
      prevAreaRef,
      setGameState,
      speak,
      announceToScreenReader
    });
  }, [gameState.area, gameState.isPlaying, speak, announceToScreenReader]);

  // Time tracking for Adventure Path
  useEffect(() => {
    let interval: any;
    if (gameState.isPlaying) {
      interval = setInterval(() => {
        const state = gameStateRef.current;
        const isAdventurePathArea = ['AdventurePath', 'HedgePath', 'RastafariCave', 'Overpass', 'Suburb', 'OpenTrench', 'Soca_Path'].includes(state.area);
        if (isAdventurePathArea) {
          setGameState(prev => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState.isPlaying]);

  // Goat sound interval logic
  useEffect(() => {
    if (!gameState.isPlaying) return;
    
    DiagnosticManager.log("Game started. Diagnostic system active.", "info");
    
    const interval = setInterval(() => {
      handleGoatSchedule(gameStateRef.current.area, audio, announceToScreenReader);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameState.isPlaying, announceToScreenReader]);

  // Game Loop for continuous movement
  useEffect(() => {
    if (!gameState.isPlaying) return;

    const loop = (time: number) => {
      const state = gameStateRef.current;
      
      // Diagnostics: Record frame performance
      if (lastFrameTime.current) {
        DiagnosticManager.recordFrame(time - lastFrameTime.current);
      }
      lastFrameTime.current = time;
      
      if (state.isInventoryOpen || state.isPaused) {
        movementRequestRef.current = requestAnimationFrame(loop);
        return;
      }
      
      // State Integrity Check
      if (time % 1000 < 20) { // Check roughly once per second
        const integrity = DiagnosticManager.checkStateIntegrity(state);
        if (!integrity.healthy) {
          integrity.issues.forEach(issue => DiagnosticManager.log(`Integrity Issue: ${issue}`, 'warning'));
        }
      }
      
      if (state.isPositioningEnabled) {
        handlePreciseMovement(time);
      } else {
        handleStandardMovement(time);
      }

      // Coin Collection Check
      const finalState = gameStateRef.current;
      if (finalState.coins && finalState.coins.length > 0) {
        const { collected, updatedCoins, points } = checkCoinCollection(finalState, finalState.coins);
        if (collected) {
          gameStateRef.current = {
            ...gameStateRef.current,
            coins: updatedCoins,
            score: finalState.score + points
          };
          audio.playPointDing(points);
          speak(`Collected coin! Points: ${finalState.score + points}`, 'EN_US');
        }
      }
      
      movementRequestRef.current = requestAnimationFrame(loop);
    };

    const movementCtx = {
      gameStateRef,
      setGameState,
      keysPressed,
      lastFrameTime,
      lastMoveTime,
      lastRotateTime,
      lastJoystickRotationTime,
      lastAnnouncedJoystickAngle,
      lastReactUpdateTime,
      audio,
      systems: {
        screenReader: ScreenReader,
        audio: AudioManager,
        state: ActionDispatcher,
        ai: GeminiService,
        automation: AutomationManager,
        diagnostics: DiagnosticManager
      },
      speak,
      announceToScreenReader,
      bark,
      moveForward,
      moveReverse,
      rotate,
      mt
    };

    const handleStandardMovement = (time: number) => {
      handleStandardKinematics(time, movementCtx);
    };

    const handlePreciseMovement = (time: number) => {
      handlePreciseKinematics(time, movementCtx);
    };

    movementRequestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(movementRequestRef.current);
  }, [gameState.isPlaying, gameState.isPositioningEnabled, moveForward, moveReverse, rotate]);

  // Automation Sequence Handler
  useEffect(() => {
    if (gameState.automationStep === 0) return;

    const currentAreaMetrics = formulateArenaMetrics(gameState.area);
    const currentDims = { width: currentAreaMetrics.width, height: currentAreaMetrics.height };
    const step = gameState.automationStep;
    let timeout: any;

    if (step === 1) {
      // Step 1: Moving North from 1x1 to 1xSW_RECT_Y_MAX
      timeout = setTimeout(() => {
        speak(`Poodle begins moving North from 1x1 towards the turn point at 1x${SW_RECT_Y_MAX}.`, 'EN_US');
        setGameState(prev => ({ 
          ...prev, 
          gridX: 1, 
          gridY: SW_RECT_Y_MAX, 
          direction: 'North',
          automationStep: 2 
        }));
      }, 5000); // Increased duration
    } else if (step === 2) {
      // Step 2: Turning Right (East) at 1xSW_RECT_Y_MAX
      timeout = setTimeout(() => {
        speak(`Turning right at 1x${SW_RECT_Y_MAX}. Now facing East towards the grand tapestry.`, 'EN_US');
        setGameState(prev => ({ 
          ...prev, 
          direction: 'East',
          automationStep: 3 
        }));
      }, 5000); // Increased duration
    } else if (step === 3) {
      // Step 3: Moving East past 8xSW_RECT_Y_MAX
      timeout = setTimeout(() => {
        speak(`Moving East, passing 8x${SW_RECT_Y_MAX}. The grand tapestry is ahead.`, 'EN_US');
        setGameState(prev => ({ 
          ...prev, 
          gridX: 8, 
          gridY: SW_RECT_Y_MAX,
          automationStep: 4 
        }));
      }, 5000); // Increased duration
    } else if (step === 4) {
      // Step 4: Reaching the Grand Tapestry at currentDims.width x SW_RECT_Y_MAX
      timeout = setTimeout(() => {
        speak(`Reached the grand tapestry at ${currentDims.width}x${SW_RECT_Y_MAX}! The performance is complete. Automatically returning to the North door.`, 'EN_US');
        setGameState(prev => ({ 
          ...prev, 
          gridX: currentDims.width / 2, 
          gridY: currentDims.height,
          direction: 'South',
          isAutomated: false, 
          automationStep: 0 
        }));
        keysPressed.current.clear();
      }, 5000); // Increased duration
    }

    return () => clearTimeout(timeout);
  }, [gameState.automationStep, jump, speak]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (time: number) => {
      const hw = hardwareProfile.current;
      const state = gameStateRef.current;
      
      // Hardware-aware throttling
      const fpsLimit = hw.targetFPS;
      const interval = 1000 / fpsLimit;
      if (time - lastRenderTime.current < interval) {
        renderRequestRef.current = requestAnimationFrame(render);
        return;
      }
      lastRenderTime.current = time;

      const cstDate = getCSTTime();
      const currentHour = cstDate.getHours();
      const lighting = getLightingMode(currentHour);
      const isNight = lighting === 'Night';

      applyLegacyConstraints(ctx);

      // Cache exact simulation epoch seconds to protect the browser heap from redundant float object allocations
      const nowSeconds = Date.now() / 1000;

      // Determine native device pixel density (DPR), restricted by mathematically-backed hardware capability caps
      const dpr = Math.min(hw.maxDPR, window.devicePixelRatio || 1);

      // Visual Preference: 2D Mode
      if (state.visualPrefs === '2D') {
        const physicalWidth = Math.round(GAME_WIDTH * dpr);
        const physicalHeight = Math.round(GAME_HEIGHT * dpr);
        if (canvas.width !== physicalWidth || canvas.height !== physicalHeight) {
          canvas.width = physicalWidth;
          canvas.height = physicalHeight;
        }

        ctx.save();
        ctx.scale(dpr, dpr);
        draw2DView(ctx, GAME_WIDTH, GAME_HEIGHT, state);
        ctx.restore();

        renderRequestRef.current = requestAnimationFrame(render);
        return;
      }

      // Pixelation support
      let pixelRatio = state.visualPrefs === 'Auto' ? state.pixelRatio : 
                        (state.visualPrefs === 'Simulated3D' ? 0.5 : 
                        (state.visualPrefs === 'Super3D' ? 1.5 : 
                        (state.visualPrefs === '3DPlus' ? 1.2 : 1)));
      
      // Auto-recalibration for legacy hardware (e.g. iPad)
      if (state.visualPrefs === 'Auto' && hw.isLegacy) {
        pixelRatio = 0.75; // Save ~44% of pixel processing
      }

      // Compute total physical scaling (DPR mapped alongside visual quality multiplier)
      const physicalScale = dpr * pixelRatio;
      const physicalWidth = Math.round(GAME_WIDTH * physicalScale);
      const physicalHeight = Math.round(GAME_HEIGHT * physicalScale);

      // Dynamically size backing store only on changes to protect physical VRAM layout
      if (canvas.width !== physicalWidth || canvas.height !== physicalHeight) {
        canvas.width = physicalWidth;
        canvas.height = physicalHeight;
      }

      ctx.save();

      if (pixelRatio < 1) {
        // Multiplier scaling for low resolution / performance pixelation
        const renderScale = dpr * pixelRatio * pixelRatio;
        ctx.scale(renderScale, renderScale);
        
        // Adjust width/height for scaled context
        const sw = GAME_WIDTH / pixelRatio;
        const sh = GAME_HEIGHT / pixelRatio;
        
        // Ultra Black for night skies
        ctx.fillStyle = isNight ? '#000000' : '#050505';
        ctx.fillRect(0, 0, sw, sh);

        const { area, isLeaning, isGraspingCollar } = state;

        // Draw Environment
        drawEnvironment(ctx, sw, sh, state, nowSeconds);
        drawWorldObjects(ctx, sw, sh, state, nowSeconds);

        // Draw Window Views
        drawWindowViews(ctx, sw, sh, state, nowSeconds, cstDate);

        if (state.viewMode === 'Rider') {
          if (state.visualPrefs === 'Active3D') {
            drawPoodle3D(ctx, sw, sh, nowSeconds, 0); 
          } else {
            // Draw Poodle (Rider's View - 3rd Person)
            if (state.characterName === 'Priscilla' || state.ridingAnimal === 'Olga-Olivia') {
              drawPriscillaRiderView(ctx, sw, sh, isLeaning, isGraspingCollar, nowSeconds, state.isPetting, state.lastPetTime);
            } else if (state.ridingAnimal === 'Anninne-Amelia Rose Julisus') {
              drawAnninneAmeliaRiderView(ctx, sw, sh, isLeaning, isGraspingCollar, nowSeconds, state.isUmbrellaEquipped, state.isUmbrellaOpen, state.isPetting, state.lastPetTime);
            } else if (state.ridingAnimal === 'Abigail Marigold Kenyatta') {
              drawAbigailRiderView(ctx, sw, sh, isLeaning, nowSeconds, state.isPetting, state.lastPetTime);
            } else if (state.isRidingToy) {
              drawToyInterface(ctx, sw, sh, state, nowSeconds);
            } else if (state.ridingAnimal === 'Dymond Daisy Qin-Reynolds') {
              drawDymondRiderView(ctx, sw, sh, state, nowSeconds);
            } else {
              drawPoodleRiderView(ctx, sw, sh, isLeaning, isGraspingCollar, nowSeconds, state.isUmbrellaEquipped, state.isUmbrellaOpen, state.isPetting, state.lastPetTime);
            }
          }
        } else {
          // POV Poodle Rendering (1st Person)
          if (state.characterName === 'Priscilla' || state.ridingAnimal === 'Olga-Olivia') {
            drawPriscillaPOV(ctx, sw, sh, state.isJumping, isLeaning, isGraspingCollar, nowSeconds, state.isPetting, state.lastPetTime);
          } else {
            drawPoodlePOV(ctx, sw, sh, state.isJumping, isLeaning, isGraspingCollar, nowSeconds, state.ridingAnimal, state.isPetting, state.lastPetTime);
          }
        }

      } else {
        // High-Quality / Standard Path
        ctx.scale(physicalScale, physicalScale);

        // Ultra Black for night skies
        ctx.fillStyle = isNight ? '#000000' : '#050505';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        const { area, isLeaning, isGraspingCollar } = state;

        // Draw Environment
        drawEnvironment(ctx, GAME_WIDTH, GAME_HEIGHT, state, nowSeconds);
        drawWorldObjects(ctx, GAME_WIDTH, GAME_HEIGHT, state, nowSeconds);

        // Draw Window Views
        drawWindowViews(ctx, GAME_WIDTH, GAME_HEIGHT, state, nowSeconds, cstDate);

        if (state.viewMode === 'Rider') {
          if (state.visualPrefs === 'Active3D') {
            drawPoodle3D(ctx, GAME_WIDTH, GAME_HEIGHT, nowSeconds, 0); // Front facing for now
          } else {
            // Draw Poodle (Rider's View - 3rd Person)
            if (state.characterName === 'Priscilla' || state.ridingAnimal === 'Olga-Olivia') {
              drawPriscillaRiderView(ctx, GAME_WIDTH, GAME_HEIGHT, isLeaning, isGraspingCollar, nowSeconds, state.isPetting, state.lastPetTime);
            } else if (state.ridingAnimal === 'Anninne-Amelia Rose Julisus') {
              drawAnninneAmeliaRiderView(ctx, GAME_WIDTH, GAME_HEIGHT, isLeaning, isGraspingCollar, nowSeconds, state.isUmbrellaEquipped, state.isUmbrellaOpen, state.isPetting, state.lastPetTime);
            } else if (state.ridingAnimal === 'Abigail Marigold Kenyatta') {
              drawAbigailRiderView(ctx, GAME_WIDTH, GAME_HEIGHT, isLeaning, nowSeconds, state.isPetting, state.lastPetTime);
            } else if (state.isRidingToy) {
              drawToyInterface(ctx, GAME_WIDTH, GAME_HEIGHT, state, nowSeconds);
            } else if (state.ridingAnimal === 'Dymond Daisy Qin-Reynolds') {
              drawDymondRiderView(ctx, GAME_WIDTH, GAME_HEIGHT, state, nowSeconds);
            } else {
              drawPoodleRiderView(ctx, GAME_WIDTH, GAME_HEIGHT, isLeaning, isGraspingCollar, nowSeconds, state.isUmbrellaEquipped, state.isUmbrellaOpen, state.isPetting, state.lastPetTime);
            }
          }
        } else {
          // POV Poodle Rendering (1st Person)
          if (state.characterName === 'Priscilla' || state.ridingAnimal === 'Olga-Olivia') {
            drawPriscillaPOV(ctx, GAME_WIDTH, GAME_HEIGHT, state.isJumping, isLeaning, isGraspingCollar, nowSeconds, state.isPetting, state.lastPetTime);
          } else {
            drawPoodlePOV(ctx, GAME_WIDTH, GAME_HEIGHT, state.isJumping, isLeaning, isGraspingCollar, nowSeconds, state.ridingAnimal, state.isPetting, state.lastPetTime);
          }
        }
        
        // Hybrid Mode: Scanlines
        if (state.visualPrefs === 'Hybrid') {
          ctx.save();
          ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
          for (let i = 0; i < GAME_HEIGHT; i += 4) {
            ctx.fillRect(0, i, GAME_WIDTH, 2);
          }
          ctx.restore();
        }

        // 3D+ Mode: Slight Bloom/Glow (converts display layout coordinate space to soft radiant light bleed)
        if (state.visualPrefs === '3DPlus') {
          ctx.save();
          const bloomGrad = ctx.createRadialGradient(GAME_WIDTH / 2, GAME_HEIGHT / 2, 50, GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH);
          bloomGrad.addColorStop(0, 'rgba(255, 192, 203, 0.05)');
          bloomGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = bloomGrad;
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
          ctx.restore();
        }

        // Super 3D Effects
        if (state.visualPrefs === 'Super3D') {
          ctx.save();
          ctx.globalAlpha = 0.05;
          ctx.fillStyle = '#ffffff';
          for (let i = 0; i < 50; i++) {
            ctx.fillRect(Math.random() * GAME_WIDTH, Math.random() * GAME_HEIGHT, 1, 1);
          }
          ctx.restore();
        }
      }

      // Draw CST Clock if enabled (Always at full res for readability)
      if (state.isCSTEnabled) {
        ctx.save();
        const timeStr = cstDate.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        ctx.fillStyle = '#00ff00';
        ctx.font = 'bold 14px monospace';
        ctx.fillText(`CST: ${timeStr} (Chicago)`, 20, 30);
        ctx.restore();
      }

      // Babylon-Free Label (Canvas Overlay - display during Pause, Positioning, or on Setup/Landing pages)
      if (state.isPaused || !state.isStarted || state.isPositioningEnabled) {
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = '10px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('BABYLON-FREE CRAFTSMANSHIP', GAME_WIDTH - 10, 20);
        ctx.restore();
      }
      
      // Positioning Info
      if (state.isPositioningEnabled) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(10, 10, 250, 60);
        ctx.fillStyle = '#00ff00';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        const currentAreaMetrics = formulateArenaMetrics(state.area);
        const currentDims = { width: currentAreaMetrics.width, height: currentAreaMetrics.height };
        ctx.fillText(`POSITIONING ACTIVE`, 20, 25);
        if (state.useCoordinates) {
          ctx.fillText(`POS: ${getRelativePositionDescription(state.gridX, state.gridY, currentDims.width / 2, currentDims.height)}`, 20, 40);
        }
        if (state.showMeasurements) {
          ctx.fillText(`FEET: ${getFootage(state.gridX)}x${getFootage(state.gridY)}`, 20, 55);
        }
      }

      ctx.restore();

      renderRequestRef.current = requestAnimationFrame(render);
    };

    renderRequestRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(renderRequestRef.current);
  }, [gameState.isStarted, showLanding]);

  const handleUpdateNotifications = (notifs: GameState['notifications']) => {
    setGameState(prev => ({ 
      ...prev, 
      notifications: notifs,
      isVisualDescriptionEnabled: !!(notifs as any).visualDescription
    }));
  };

  const handleUpdateVisualPrefs = (pref: GameState['visualPrefs']) => {
    setGameState(prev => ({ ...prev, visualPrefs: pref }));
    speak(`Visual preference set to ${pref}`, 'EN_US');
  };

  const handleUpdateKeyboardLayout = (layout: GameState['keyboardLayout']) => {
    setGameState(prev => ({ ...prev, keyboardLayout: layout }));
    speak(`Keyboard layout set to ${layout}`, 'EN_US');
  };

  if (showAd) {
    const targetArea = pendingState?.nextArea || pendingState?.area;
    const adLevel = targetArea === 'Soca_Path' ? 'Level0' : 
                    (targetArea?.startsWith('PinkHouse') || targetArea === 'WandaPlatform' || targetArea === 'WandasWarpHouse') ? 'Level1' : 'Default';
    return (
      <InterstitialAd 
        levelTheme={adLevel as any}
        onClose={() => {
          if (pendingState) {
            if (pendingState.type === 'START_GAME') {
              startGame(pendingState.isBeta, pendingState.viewMode);
            } else {
              setGameState(prev => ({ ...prev, ...pendingState, currentAdLevel: pendingState.currentAdLevel || 0 }));
            }
            setPendingState(null);
          }
          setShowAd(false);
          // Immediate scientific focus trigger
          setTimeout(() => GeneralDOM.triggerFocusMode('game-canvas'), 100);
        }} 
      />
    );
  }

  if (gameState.isGameOver) {
    return (
      <FinalScore 
        score={gameState.score} 
        onRestart={() => {
          setGameState(INITIAL_STATE);
          setPendingState({ type: 'START_GAME', isBeta: false });
          setShowAd(true);
        }}
        onHome={() => {
          setShowLanding(true);
          setGameState(INITIAL_STATE);
        }}
      />
    );
  }

  if (showLanding && !isEmbedded) {
    return (
      <>
        <PoodleLandingPage 
          onStart={(selectedViewMode) => {
            setShowLanding(false);
            setPendingState({ type: 'START_GAME', isBeta: false, viewMode: selectedViewMode });
            setShowAd(true);
          }} 
          onBack={onBack} 
          onOpenKeyboardModal={() => setIsKeyboardModalOpen(true)}
          onOpenDownloads={onOpenDownloads}
          isExternalModalOpen={isKeyboardModalOpen}
        />
        <KeyboardCommandsModal 
          isOpen={isKeyboardModalOpen} 
          onClose={() => setIsKeyboardModalOpen(false)} 
        />
      </>
    );
  }

  if (gameState.isLevelComplete) {
    if (gameState.hasNextLevel) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans text-center">
          <div style={{ textAlign: 'center', verticalAlign: 'top', display: 'block', color: 'orange', backgroundColor: '#000000', borderWidth: '0px', padding: '3px', width: '99%', maxWidth: '99%' }}>
            <h1 className="text-5xl font-black uppercase italic mb-6">Great Work!</h1>
            <p className="text-xl mb-4">You passed the staging level, and you are ready to begin your adventure on the next level.</p>
            <p className="text-2xl font-bold mb-4">Score: {gameState.score}</p>
            <p className="text-lg mb-8">This is an example of scoring as you play this game.</p>
            <button 
              onClick={() => {
                setGameState(prev => ({ 
                  ...prev, 
                  isLevelComplete: false, 
                  area: 'Soca_Path',
                  level: 'Floor',
                  gridX: Math.floor(formulateArenaMetrics('Soca_Path').width / 2),
                  gridY: 1,
                  direction: 'North',
                  score: prev.score + 1000
                }));
                speak("Starting next level. You are now on the Soca Path.", 'EN_US');
              }}
              className="px-8 py-3 bg-emerald-600 text-white rounded-full font-bold text-lg hover:bg-emerald-500 transition-all active:scale-95"
            >
              Next Level
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <FinalScore 
          score={gameState.score} 
          onRestart={() => {
            setGameState(INITIAL_STATE);
            setPendingState({ type: 'START_GAME', isBeta: false });
            setShowAd(true);
          }}
          onHome={() => {
            setShowLanding(true);
            setGameState(INITIAL_STATE);
          }}
        />
      );
    }
  }

  return (
    <ThemeProvider>
      <SystemTheme
        headerComponent={
          !isEmbedded && gameState.isHeaderVisible ? (
            <PlayAreaHeader 
              setGameState={setGameState} 
              onGoToLanding={() => {
                setShowLanding(true);
                setGameState(INITIAL_STATE);
              }}
            />
          ) : null
        }
        menuBarComponent={
          <PlayAreaMenuBar
            onGoToLanding={() => { setShowLanding(true); setGameState(INITIAL_STATE); }}
            isHeaderVisible={gameState.isHeaderVisible}
            setGameState={setGameState} 
            gameState={gameState}
            onToggleMute={() => setIsMuted(!isMuted)}
            selectedSynth={selectedSynth}
            onUpdateSynth={handleSetSynth}
            onUpdateNotifications={handleUpdateNotifications}
            onUpdateVisualPrefs={handleUpdateVisualPrefs}
            onUpdateKeyboardLayout={handleUpdateKeyboardLayout}
            onToggleCoordinates={() => setGameState(prev => ({ ...prev, useCoordinates: !prev.useCoordinates }))}
            onToggleDiagnostics={() => setGameState(prev => ({ ...prev, showDiagnostics: !prev.showDiagnostics }))}
            showGrid={showGrid}
            onToggleGrid={() => setShowGrid(!showGrid)}
            onOpenKeyboardModal={() => setIsKeyboardModalOpen(true)}
            onToggleSurroundSound={handleToggleSurroundSound}
          />
        }
        hudComponent={<HUD gameState={gameState} />}
        diagnosticsComponent={<Diagnostics gameState={gameState} />}
        gameViewComponent={
          <div ref={gameContainerRef as any} className="w-full flex flex-col items-center">
            <GameView 
              canvasRef={canvasRef}
              gameState={gameState}
              isEmbedded={isEmbedded}
              showGrid={showGrid}
              setShowGrid={setShowGrid}
              onTogglePause={() => {
                setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
                speak(gameState.isPaused ? "Game Resumed." : "Game Paused.", "EN_US");
              }}
              onToyRideChoice={handleToyRideChoice}
              isNearToy={isNearToy}
              gameWidth={GAME_WIDTH}
              gameHeight={GAME_HEIGHT}
            />
          </div>
        }
        footerComponent={<PlayAreaFooter />}
      />

      <MultipleChoiceOverlay 
        choices={gameState.choices} 
        onSelect={(choice, index) => {
          speak(`Choice ${index + 1}: ${choice} selected.`, 'EN_US');
        }}
      />

      <KeyboardCommandsModal 
        isOpen={isKeyboardModalOpen} 
        onClose={() => setIsKeyboardModalOpen(false)} 
      />

      <InventoryMenu state={gameState} />

      <AnimatePresence>
        {gameState.isPoodleSelectionOpen && (
          <PoodleSelectionMenu 
            state={gameState} 
            setGameState={setGameState} 
            speak={(m) => audio.speak(m, 'EN_US')} 
            audio={audio}
          />
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}
